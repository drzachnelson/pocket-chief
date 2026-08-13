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

create or replace function public.ensure_default_taxonomy() returns void language plpgsql security definer set search_path = public as $$
declare
  score_id uuid;
  alimentary_id uuid;
begin
  if auth.uid() is null then raise exception 'Owner authentication required'; end if;
  insert into public.taxonomy_nodes (owner_id, title, slug, sort_order)
  values (auth.uid(), 'SCORE Curriculum', 'score', 0)
  on conflict (owner_id, slug) do update set title = excluded.title
  returning id into score_id;

  insert into public.taxonomy_nodes (owner_id, parent_id, title, slug, sort_order)
  values (auth.uid(), score_id, 'Alimentary Tract', 'alimentary-tract', 1)
  on conflict (owner_id, slug) do update set parent_id = excluded.parent_id, title = excluded.title
  returning id into alimentary_id;

  insert into public.taxonomy_nodes (owner_id, parent_id, title, slug, sort_order)
  values (auth.uid(), alimentary_id, 'Biliary Tract', 'biliary-tract', 2)
  on conflict (owner_id, slug) do update set parent_id = excluded.parent_id, title = excluded.title;
end;
$$;
revoke all on function public.ensure_default_taxonomy() from public;
grant execute on function public.ensure_default_taxonomy() to authenticated;

create or replace function public.sync_claim_citations(p_version_id uuid) returns void language plpgsql security definer set search_path = public as $$
declare
  target public.topic_versions;
begin
  select * into target from public.topic_versions where id = p_version_id and owner_id = auth.uid() and status = 'draft';
  if target.id is null then raise exception 'Draft not found'; end if;
  delete from public.claim_citations where topic_version_id = p_version_id and owner_id = auth.uid();
  insert into public.claim_citations (owner_id, topic_version_id, block_id, claim_id, claim_text, support_status, source_id)
  select
    auth.uid(),
    target.id,
    block.value->>'id',
    claim.value->>'id',
    claim.value->>'text',
    (claim.value->>'status')::public.claim_support_status,
    case when citation.value is null then null else citation.value::uuid end
  from jsonb_array_elements(target.content) block(value)
  cross join lateral jsonb_array_elements(coalesce(block.value->'claims', '[]'::jsonb)) claim(value)
  left join lateral jsonb_array_elements_text(coalesce(claim.value->'citationIds', '[]'::jsonb)) citation(value) on true;
end;
$$;
revoke all on function public.sync_claim_citations(uuid) from public;

create or replace function public.create_topic_draft(
  p_topic_id uuid,
  p_title text,
  p_slug text,
  p_aliases text[],
  p_score_node_id uuid,
  p_tags text[],
  p_sources jsonb,
  p_version_id uuid,
  p_version_number integer,
  p_content jsonb,
  p_warnings text[],
  p_based_on_version integer
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  next_version integer;
  source_record jsonb;
  source_ids uuid[] := '{}';
  supplied_source_id uuid;
begin
  if auth.uid() is null then raise exception 'Owner authentication required'; end if;
  if p_score_node_id is not null and not exists (select 1 from public.taxonomy_nodes where id = p_score_node_id and owner_id = auth.uid()) then
    raise exception 'Invalid SCORE taxonomy node';
  end if;

  insert into public.topics (id, owner_id, taxonomy_node_id, title, slug, aliases, personal_tags)
  values (p_topic_id, auth.uid(), p_score_node_id, p_title, p_slug, coalesce(p_aliases, '{}'), coalesce(p_tags, '{}'))
  on conflict (id) do update set
    taxonomy_node_id = excluded.taxonomy_node_id,
    title = excluded.title,
    slug = excluded.slug,
    aliases = excluded.aliases,
    personal_tags = excluded.personal_tags,
    updated_at = now()
  where public.topics.owner_id = auth.uid();

  for source_record in select value from jsonb_array_elements(p_sources)
  loop
    supplied_source_id := (source_record->>'id')::uuid;
    insert into public.sources (id, owner_id, title, kind, citation, url, details, supplied_at)
    values (
      supplied_source_id,
      auth.uid(),
      source_record->>'title',
      source_record->>'kind',
      coalesce(nullif(source_record->>'citation', ''), source_record->>'title'),
      nullif(source_record->>'url', ''),
      nullif(source_record->>'details', ''),
      coalesce((source_record->>'suppliedAt')::timestamptz, now())
    )
    on conflict (id) do update set title = excluded.title, citation = excluded.citation, url = excluded.url, details = excluded.details
    where public.sources.owner_id = auth.uid();
    source_ids := array_append(source_ids, supplied_source_id);
  end loop;

  perform pg_advisory_xact_lock(hashtextextended(p_topic_id::text, 0));
  select coalesce(max(version_number), 0) + 1 into next_version from public.topic_versions where topic_id = p_topic_id;
  if p_version_number <> next_version then p_version_number := next_version; end if;

  insert into public.topic_versions (id, owner_id, topic_id, version_number, status, content, warnings, source_ids, based_on_version)
  values (p_version_id, auth.uid(), p_topic_id, p_version_number, 'draft', p_content, coalesce(p_warnings, '{}'), source_ids, p_based_on_version);
  perform public.sync_claim_citations(p_version_id);
  return p_version_id;
end;
$$;
revoke all on function public.create_topic_draft(uuid,text,text,text[],uuid,text[],jsonb,uuid,integer,jsonb,text[],integer) from public;
grant execute on function public.create_topic_draft(uuid,text,text,text[],uuid,text[],jsonb,uuid,integer,jsonb,text[],integer) to authenticated;

create or replace function public.replace_topic_draft(p_version_id uuid, p_content jsonb, p_warnings text[], p_source_ids uuid[]) returns uuid language plpgsql security definer set search_path = public as $$
begin
  if exists (
    select 1 from unnest(coalesce(p_source_ids, '{}')) source_id
    where not exists (select 1 from public.sources where id = source_id and owner_id = auth.uid())
  ) then raise exception 'A cited source does not belong to the owner'; end if;

  update public.topic_versions
  set content = p_content, warnings = coalesce(p_warnings, '{}'), source_ids = coalesce(p_source_ids, '{}')
  where id = p_version_id and owner_id = auth.uid() and status = 'draft';
  if not found then raise exception 'Draft not found'; end if;
  perform public.sync_claim_citations(p_version_id);
  return p_version_id;
end;
$$;
revoke all on function public.replace_topic_draft(uuid,jsonb,text[],uuid[]) from public;
grant execute on function public.replace_topic_draft(uuid,jsonb,text[],uuid[]) to authenticated;

create or replace function public.approve_topic_version(version_id uuid) returns public.topic_versions language plpgsql security definer set search_path = public as $$
declare
  target public.topic_versions;
  content_claim_count integer;
  supported_claim_count integer;
  invalid_citation_count integer;
  incomplete_block_count integer;
begin
  select * into target from public.topic_versions where id = version_id and owner_id = auth.uid() for update;
  if target.id is null then raise exception 'Draft not found'; end if;
  if target.status <> 'draft' then raise exception 'Only a draft can be approved'; end if;

  select count(*) into content_claim_count
  from jsonb_array_elements(target.content) block(value)
  cross join lateral jsonb_array_elements(coalesce(block.value->'claims', '[]'::jsonb)) claim(value);

  select count(*) into incomplete_block_count
  from jsonb_array_elements(target.content) block(value)
  where block.value->>'type' not in ('references', 'image')
    and (
      jsonb_array_length(coalesce(block.value->'claims', '[]'::jsonb)) = 0
      or (block.value->>'type' = 'bullets' and jsonb_array_length(coalesce(block.value->'claims', '[]'::jsonb)) < jsonb_array_length(coalesce(block.value->'items', '[]'::jsonb)))
    );

  select count(*) into supported_claim_count from (
    select distinct block_id, claim_id
    from public.claim_citations c
    where c.topic_version_id = version_id
      and c.owner_id = auth.uid()
      and c.support_status = 'cited'
      and c.source_id = any(target.source_ids)
      and exists (select 1 from public.sources s where s.id = c.source_id and s.owner_id = auth.uid())
  ) supported;

  select count(*) into invalid_citation_count
  from public.claim_citations c
  where c.topic_version_id = version_id
    and (c.support_status <> 'cited' or c.source_id is null or not (c.source_id = any(target.source_ids)) or not exists (select 1 from public.sources s where s.id = c.source_id and s.owner_id = auth.uid()));

  if content_claim_count = 0 or incomplete_block_count > 0 or supported_claim_count <> content_claim_count or invalid_citation_count > 0 then
    raise exception 'Every factual claim must be supported before approval';
  end if;
  update public.topic_versions set status = 'approved', reviewed_at = now(), reviewed_by = auth.uid() where id = version_id returning * into target;
  update public.topics set
    current_approved_version_id = target.id,
    updated_at = now(),
    search_text = concat_ws(' ', title, array_to_string(aliases, ' '), array_to_string(personal_tags, ' '), (select title from public.taxonomy_nodes where id = taxonomy_node_id and owner_id = auth.uid()), target.content::text)
  where id = target.topic_id and owner_id = auth.uid();
  return target;
end;
$$;
revoke all on function public.approve_topic_version(uuid) from public;
grant execute on function public.approve_topic_version(uuid) to authenticated;

create or replace function public.restore_topic_version(p_source_version_id uuid, p_new_version_id uuid) returns uuid language plpgsql security definer set search_path = public as $$
declare
  source_version public.topic_versions;
  next_version integer;
begin
  select * into source_version from public.topic_versions where id = p_source_version_id and owner_id = auth.uid();
  if source_version.id is null then raise exception 'Version not found'; end if;
  perform pg_advisory_xact_lock(hashtextextended(source_version.topic_id::text, 0));
  select coalesce(max(version_number), 0) + 1 into next_version from public.topic_versions where topic_id = source_version.topic_id;
  insert into public.topic_versions (id, owner_id, topic_id, version_number, status, content, warnings, source_ids, based_on_version)
  values (p_new_version_id, auth.uid(), source_version.topic_id, next_version, 'draft', source_version.content, source_version.warnings, source_version.source_ids, source_version.version_number);
  perform public.sync_claim_citations(p_new_version_id);
  return p_new_version_id;
end;
$$;
revoke all on function public.restore_topic_version(uuid,uuid) from public;
grant execute on function public.restore_topic_version(uuid,uuid) to authenticated;

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
