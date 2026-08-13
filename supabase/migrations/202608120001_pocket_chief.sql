begin;

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create type public.topic_version_status as enum ('draft', 'approved');
create type public.claim_support_status as enum ('cited', 'needs_support');

create table public.owner_allowlist (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

create or replace function public.guard_owner_signup() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.email is null or not exists (select 1 from public.owner_allowlist where email = lower(new.email)) then
    raise exception 'Pocket Chief signup is restricted to its configured owner';
  end if;
  return new;
end;
$$;

create trigger pocket_chief_owner_only_signup before insert on auth.users for each row execute function public.guard_owner_signup();

create table public.taxonomy_nodes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.taxonomy_nodes(id) on delete cascade,
  title text not null,
  slug text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug)
);

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  taxonomy_node_id uuid references public.taxonomy_nodes(id) on delete set null,
  title text not null,
  slug text not null,
  aliases text[] not null default '{}',
  personal_tags text[] not null default '{}',
  current_approved_version_id uuid,
  search_text text not null default '',
  search_document tsvector generated always as (to_tsvector('english', search_text)) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug)
);

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  kind text not null check (kind in ('user_notes', 'book', 'article', 'website', 'image')),
  citation text not null,
  url text,
  details text,
  supplied_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.topic_versions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  status public.topic_version_status not null default 'draft',
  content jsonb not null check (jsonb_typeof(content) = 'array'),
  warnings text[] not null default '{}',
  source_ids uuid[] not null default '{}',
  based_on_version integer,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique (topic_id, version_number),
  check ((status = 'draft' and reviewed_at is null) or (status = 'approved' and reviewed_at is not null and reviewed_by is not null))
);

alter table public.topics add constraint topics_current_version_fk foreign key (current_approved_version_id) references public.topic_versions(id) on delete set null;

create table public.claim_citations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  topic_version_id uuid not null references public.topic_versions(id) on delete cascade,
  block_id text not null,
  claim_id text not null,
  claim_text text not null,
  support_status public.claim_support_status not null,
  source_id uuid references public.sources(id) on delete restrict,
  locator text,
  created_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null,
  mime_type text not null,
  alt_text text not null,
  source_id uuid references public.sources(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (owner_id, storage_path)
);

create table public.bookmarks (
  owner_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (owner_id, topic_id)
);

create table public.recent_views (
  owner_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (owner_id, topic_id)
);

create table public.anki_drafts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  cloze_text text not null,
  additional_context text not null default '',
  source_block_ids text[] not null,
  context_image_path text,
  tags text[] not null default '{}',
  duplicate_hash text not null,
  created_at timestamptz not null default now(),
  exported_at timestamptz,
  unique (owner_id, duplicate_hash)
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index topics_search_document_idx on public.topics using gin (search_document);
create index topics_search_text_trgm_idx on public.topics using gin (search_text gin_trgm_ops);
create index topic_versions_topic_status_idx on public.topic_versions (topic_id, status, version_number desc);
create index claim_citations_version_idx on public.claim_citations (topic_version_id);
create index recent_views_owner_time_idx on public.recent_views (owner_id, viewed_at desc);
create index audit_owner_time_idx on public.audit_events (owner_id, created_at desc);

create or replace function public.guard_approved_version_mutation() returns trigger language plpgsql security invoker as $$
begin
  if old.status = 'approved' then raise exception 'Approved topic versions are immutable'; end if;
  return new;
end;
$$;

create trigger immutable_approved_versions before update or delete on public.topic_versions for each row execute function public.guard_approved_version_mutation();

create or replace function public.approve_topic_version(version_id uuid) returns public.topic_versions language plpgsql security definer set search_path = public as $$
declare
  target public.topic_versions;
  unsupported integer;
begin
  select * into target from public.topic_versions where id = version_id and owner_id = auth.uid() for update;
  if target.id is null then raise exception 'Draft not found'; end if;
  if target.status <> 'draft' then raise exception 'Only a draft can be approved'; end if;
  select count(*) into unsupported from public.claim_citations where topic_version_id = version_id and (support_status <> 'cited' or source_id is null);
  if unsupported > 0 or cardinality(target.warnings) > 0 then raise exception 'Every factual claim must be supported before approval'; end if;
  update public.topic_versions set status = 'approved', reviewed_at = now(), reviewed_by = auth.uid() where id = version_id returning * into target;
  update public.topics set current_approved_version_id = target.id, updated_at = now(), search_text = concat_ws(' ', title, array_to_string(aliases, ' '), array_to_string(personal_tags, ' '), target.content::text) where id = target.topic_id and owner_id = auth.uid();
  return target;
end;
$$;
revoke all on function public.approve_topic_version(uuid) from public;
grant execute on function public.approve_topic_version(uuid) to authenticated;

create or replace function public.search_approved_topics(query_text text, result_limit integer default 30)
returns table (topic_id uuid, slug text, title text, aliases text[], personal_tags text[], rank real, approved_version integer)
language sql stable security invoker set search_path = public as $$
  with needle as (select websearch_to_tsquery('english', query_text) as tsq)
  select
    t.id,
    t.slug,
    t.title,
    t.aliases,
    t.personal_tags,
    (ts_rank_cd(t.search_document, needle.tsq) * 1.8 + greatest(similarity(t.title, query_text), similarity(t.search_text, query_text)))::real as rank,
    v.version_number
  from public.topics t
  join public.topic_versions v on v.id = t.current_approved_version_id and v.status = 'approved'
  cross join needle
  where t.owner_id = auth.uid()
    and (t.search_document @@ needle.tsq or t.search_text % query_text or t.title % query_text)
  order by rank desc, t.title asc
  limit greatest(1, least(result_limit, 100));
$$;
grant execute on function public.search_approved_topics(text, integer) to authenticated;

alter table public.owner_allowlist enable row level security;
alter table public.taxonomy_nodes enable row level security;
alter table public.topics enable row level security;
alter table public.sources enable row level security;
alter table public.topic_versions enable row level security;
alter table public.claim_citations enable row level security;
alter table public.media enable row level security;
alter table public.bookmarks enable row level security;
alter table public.recent_views enable row level security;
alter table public.anki_drafts enable row level security;
alter table public.audit_events enable row level security;

create policy "owner reads own taxonomy" on public.taxonomy_nodes for select using (owner_id = auth.uid());
create policy "owner writes own taxonomy" on public.taxonomy_nodes for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner reads own topics" on public.topics for select using (owner_id = auth.uid());
create policy "owner writes own topics" on public.topics for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner reads own sources" on public.sources for select using (owner_id = auth.uid());
create policy "owner writes own sources" on public.sources for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner reads own versions" on public.topic_versions for select using (owner_id = auth.uid());
create policy "owner creates and edits drafts" on public.topic_versions for all using (owner_id = auth.uid() and status = 'draft') with check (owner_id = auth.uid() and status = 'draft');
create policy "owner reads own citations" on public.claim_citations for select using (owner_id = auth.uid());
create policy "owner writes draft citations" on public.claim_citations for all using (owner_id = auth.uid() and exists (select 1 from public.topic_versions v where v.id = topic_version_id and v.status = 'draft')) with check (owner_id = auth.uid());
create policy "owner controls own media metadata" on public.media for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner controls own bookmarks" on public.bookmarks for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner controls own recent views" on public.recent_views for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner controls own anki drafts" on public.anki_drafts for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner reads own audit" on public.audit_events for select using (owner_id = auth.uid());
create policy "owner inserts own audit" on public.audit_events for insert with check (owner_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('topic-media', 'topic-media', false, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/heic'])
on conflict (id) do update set public = false;

create policy "owner reads private topic media" on storage.objects for select to authenticated using (bucket_id = 'topic-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "owner uploads private topic media" on storage.objects for insert to authenticated with check (bucket_id = 'topic-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "owner updates private topic media" on storage.objects for update to authenticated using (bucket_id = 'topic-media' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = 'topic-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "owner deletes private topic media" on storage.objects for delete to authenticated using (bucket_id = 'topic-media' and (storage.foldername(name))[1] = auth.uid()::text);

commit;
