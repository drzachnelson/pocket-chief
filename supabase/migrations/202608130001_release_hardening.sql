begin;

alter table public.topic_versions
  add column if not exists proposed_title text,
  add column if not exists proposed_slug text,
  add column if not exists proposed_taxonomy_node_id uuid references public.taxonomy_nodes(id) on delete set null,
  add column if not exists proposed_aliases text[],
  add column if not exists proposed_tags text[];

create or replace function public.guard_taxonomy_cycle() returns trigger language plpgsql security invoker set search_path = public as $$
begin
  if new.parent_id is null then return new; end if;
  if new.parent_id = new.id then raise exception 'A taxonomy node cannot be its own parent'; end if;
  if exists (
    with recursive ancestors(id, parent_id) as (
      select node.id, node.parent_id from public.taxonomy_nodes node where node.id = new.parent_id and node.owner_id = new.owner_id
      union
      select node.id, node.parent_id from public.taxonomy_nodes node join ancestors on node.id = ancestors.parent_id where node.owner_id = new.owner_id
    ) select 1 from ancestors where id = new.id
  ) then raise exception 'A taxonomy node cannot be nested under its descendant'; end if;
  return new;
end;
$$;

drop trigger if exists prevent_taxonomy_cycles on public.taxonomy_nodes;
create trigger prevent_taxonomy_cycles before insert or update of parent_id on public.taxonomy_nodes for each row execute function public.guard_taxonomy_cycle();

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
  on conflict (id) do nothing;
  if not exists (select 1 from public.topics where id = p_topic_id and owner_id = auth.uid()) then raise exception 'Topic does not belong to the owner'; end if;

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
    if not exists (select 1 from public.sources where id = supplied_source_id and owner_id = auth.uid()) then raise exception 'Source does not belong to the owner'; end if;
    source_ids := array_append(source_ids, supplied_source_id);
  end loop;

  perform pg_advisory_xact_lock(hashtextextended(p_topic_id::text, 0));
  select coalesce(max(version_number), 0) + 1 into next_version from public.topic_versions where topic_id = p_topic_id;
  if p_version_number <> next_version then p_version_number := next_version; end if;

  insert into public.topic_versions (id, owner_id, topic_id, version_number, status, content, warnings, source_ids, based_on_version, proposed_title, proposed_slug, proposed_taxonomy_node_id, proposed_aliases, proposed_tags)
  values (p_version_id, auth.uid(), p_topic_id, p_version_number, 'draft', p_content, coalesce(p_warnings, '{}'), source_ids, p_based_on_version, p_title, p_slug, p_score_node_id, coalesce(p_aliases, '{}'), coalesce(p_tags, '{}'));
  perform public.sync_claim_citations(p_version_id);
  return p_version_id;
end;
$$;
revoke all on function public.create_topic_draft(uuid,text,text,text[],uuid,text[],jsonb,uuid,integer,jsonb,text[],integer) from public;
grant execute on function public.create_topic_draft(uuid,text,text,text[],uuid,text[],jsonb,uuid,integer,jsonb,text[],integer) to authenticated;
drop function if exists public.topic_block_expected_claims(jsonb);
create or replace function public.topic_block_expected_claims(block jsonb, valid_source_ids uuid[] default null) returns text[] language sql immutable set search_path = public as $$
  select case block->>'type'
    when 'summary' then array[coalesce(block->>'text', '')]
    when 'prose' then array[coalesce(block->>'text', '')]
    when 'warning' then array[coalesce(block->>'text', '')]
    when 'bullets' then array(
      select item.value from jsonb_array_elements_text(coalesce(block->'items', '[]'::jsonb)) with ordinality item(value, position)
      order by item.position
    )
    when 'table' then array(
      select (
        select string_agg(cell.value, ' — ' order by cell.position)
        from jsonb_array_elements_text(row_item.value) with ordinality cell(value, position)
      )
      from jsonb_array_elements(coalesce(block->'rows', '[]'::jsonb)) with ordinality row_item(value, position)
      order by row_item.position
    )
    when 'sequence' then array(
      select concat(step.value->>'title', ': ', step.value->>'detail')
      from jsonb_array_elements(coalesce(block->'steps', '[]'::jsonb)) with ordinality step(value, position)
      order by step.position
    )
    when 'flow' then array(
      select value from (
        select node.value->>'label' as value, node.position as position
        from jsonb_array_elements(coalesce(block->'nodes', '[]'::jsonb)) with ordinality node(value, position)
        union all
        select edge.value->>'label' as value, jsonb_array_length(coalesce(block->'nodes', '[]'::jsonb)) + edge.position as position
        from jsonb_array_elements(coalesce(block->'edges', '[]'::jsonb)) with ordinality edge(value, position)
        where nullif(edge.value->>'label', '') is not null
      ) flow_claims order by position
    )
    when 'image' then array[block->>'alt'] || case when nullif(block->>'caption', '') is null then '{}'::text[] else array[block->>'caption'] end
    when 'references' then array(
      select requested.id
      from jsonb_array_elements_text(coalesce(block->'sourceIds', '[]'::jsonb)) requested(id)
      where valid_source_ids is not null and not (requested.id::uuid = any(valid_source_ids))
    )
    else '{}'::text[]
  end
$$;
revoke all on function public.topic_block_expected_claims(jsonb, uuid[]) from public;

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
  perform public.sync_claim_citations(version_id);

  select count(*) into content_claim_count
  from jsonb_array_elements(target.content) block(value)
  cross join lateral jsonb_array_elements(coalesce(block.value->'claims', '[]'::jsonb)) claim(value);

  select count(*) into incomplete_block_count
  from jsonb_array_elements(target.content) block(value)
  cross join lateral (select public.topic_block_expected_claims(block.value, target.source_ids) as units) expected
  where (
    jsonb_array_length(coalesce(block.value->'claims', '[]'::jsonb)) <> cardinality(expected.units)
    or exists (
      select 1
      from unnest(expected.units) with ordinality unit(claim_text, position)
      left join lateral (
        select claim.value
        from jsonb_array_elements(coalesce(block.value->'claims', '[]'::jsonb)) with ordinality claim(value, position)
        where claim.position = unit.position
      ) claim_item on true
      where claim_item.value is null
        or regexp_replace(btrim(coalesce(claim_item.value->>'text', '')), '\s+', ' ', 'g') <> regexp_replace(btrim(unit.claim_text), '\s+', ' ', 'g')
    )
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
    title = coalesce(target.proposed_title, title),
    slug = coalesce(target.proposed_slug, slug),
    taxonomy_node_id = coalesce(target.proposed_taxonomy_node_id, taxonomy_node_id),
    aliases = coalesce(target.proposed_aliases, aliases),
    personal_tags = coalesce(target.proposed_tags, personal_tags),
    current_approved_version_id = target.id,
    updated_at = now(),
    search_text = concat_ws(' ', coalesce(target.proposed_title, title), array_to_string(coalesce(target.proposed_aliases, aliases), ' '), array_to_string(coalesce(target.proposed_tags, personal_tags), ' '), (select title from public.taxonomy_nodes where id = coalesce(target.proposed_taxonomy_node_id, taxonomy_node_id) and owner_id = auth.uid()), target.content::text)
  where id = target.topic_id and owner_id = auth.uid();
  return target;
end;
$$;
revoke all on function public.approve_topic_version(uuid) from public;
grant execute on function public.approve_topic_version(uuid) to authenticated;

drop function if exists public.ensure_launch_topic(jsonb);
drop function if exists public.ensure_launch_topic(text);

create or replace function public.ensure_launch_topic(p_content_text text) returns void language plpgsql security definer set search_path = public as $$
declare
  biliary_id uuid;
  launch_topic_id uuid := gen_random_uuid();
  launch_source_id uuid := gen_random_uuid();
  launch_version_id uuid := gen_random_uuid();
  launch_content jsonb;
begin
  if auth.uid() is null then raise exception 'Owner authentication required'; end if;
  if not exists (select 1 from public.owner_allowlist where email = lower(coalesce(auth.jwt()->>'email', ''))) then raise exception 'Configured owner required'; end if;
  if encode(digest(convert_to(p_content_text, 'UTF8'), 'sha256'), 'hex') <> '65d331a0bc30f98f43e5578a322afd4a5d02476707896440ed16b58b1c1b8e15' then raise exception 'Launch topic content did not match the reviewed release'; end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text || ':choledocholithiasis-launch', 0));
  if exists (select 1 from public.topics where owner_id = auth.uid() and slug = 'choledocholithiasis') then return; end if;
  launch_content := replace(p_content_text, '00000000-0000-4000-8000-000000000102', launch_source_id::text)::jsonb;
  perform public.ensure_default_taxonomy();
  select id into biliary_id from public.taxonomy_nodes where owner_id = auth.uid() and slug = 'biliary-tract';

  insert into public.sources (id, owner_id, title, kind, citation, details, supplied_at)
  values (
    launch_source_id,
    auth.uid(),
    'User-supplied choledocholithiasis study packet',
    'user_notes',
    'Personal study notes supplied to Pocket Chief, August 12, 2026.',
    'A synthesis the owner identified as referencing SCORE, Fiser, and Sabiston. No edition or page details were supplied.',
    '2026-08-12T00:00:00.000Z'
  );

  insert into public.topics (id, owner_id, taxonomy_node_id, title, slug, aliases, personal_tags)
  values (launch_topic_id, auth.uid(), biliary_id, 'Choledocholithiasis', 'choledocholithiasis', array['CBD stones', 'common bile duct stones', 'duct exploration', 'LTCBDE'], array['biliary', 'common-bile-duct', 'absite', 'score']);

  insert into public.topic_versions (id, owner_id, topic_id, version_number, status, content, warnings, source_ids)
  values (launch_version_id, auth.uid(), launch_topic_id, 1, 'draft', launch_content, '{}', array[launch_source_id]);
  perform public.sync_claim_citations(launch_version_id);
  perform public.approve_topic_version(launch_version_id);
end;
$$;
revoke all on function public.ensure_launch_topic(text) from public;
grant execute on function public.ensure_launch_topic(text) to authenticated;

create or replace function public.save_anki_draft(
  p_id uuid,
  p_topic_id uuid,
  p_cloze_text text,
  p_additional_context text,
  p_source_block_ids text[],
  p_context_image_path text,
  p_tags text[],
  p_duplicate_hash text
) returns public.anki_drafts language plpgsql security definer set search_path = public as $$
declare
  saved public.anki_drafts;
begin
  if auth.uid() is null then raise exception 'Owner authentication required'; end if;
  if not exists (select 1 from public.topics where id = p_topic_id and owner_id = auth.uid()) then raise exception 'Anki topic does not belong to the owner'; end if;
  if exists (
    select 1 from unnest(p_source_block_ids) requested(block_id)
    where not exists (
      select 1 from public.topic_versions version
      cross join lateral jsonb_array_elements(version.content) block(value)
      where version.topic_id = p_topic_id and version.owner_id = auth.uid() and block.value->>'id' = requested.block_id
    )
  ) then raise exception 'Anki source block does not belong to the topic'; end if;
  insert into public.anki_drafts (id, owner_id, topic_id, cloze_text, additional_context, source_block_ids, context_image_path, tags, duplicate_hash)
  values (p_id, auth.uid(), p_topic_id, p_cloze_text, p_additional_context, p_source_block_ids, p_context_image_path, coalesce(p_tags, '{}'), p_duplicate_hash)
  on conflict (owner_id, duplicate_hash) do update set
    topic_id = excluded.topic_id,
    additional_context = excluded.additional_context,
    source_block_ids = excluded.source_block_ids,
    context_image_path = excluded.context_image_path,
    tags = excluded.tags
  returning * into saved;
  return saved;
end;
$$;
revoke all on function public.save_anki_draft(uuid,uuid,text,text,text[],text,text[],text) from public;
grant execute on function public.save_anki_draft(uuid,uuid,text,text,text[],text,text[],text) to authenticated;

create or replace function public.restore_topic_version(p_source_version_id uuid, p_new_version_id uuid) returns uuid language plpgsql security definer set search_path = public as $$
declare
  source_version public.topic_versions;
  next_version integer;
begin
  select * into source_version from public.topic_versions where id = p_source_version_id and owner_id = auth.uid();
  if source_version.id is null then raise exception 'Version not found'; end if;
  perform pg_advisory_xact_lock(hashtextextended(source_version.topic_id::text, 0));
  select coalesce(max(version_number), 0) + 1 into next_version from public.topic_versions where topic_id = source_version.topic_id;
  insert into public.topic_versions (id, owner_id, topic_id, version_number, status, content, warnings, source_ids, based_on_version, proposed_title, proposed_slug, proposed_taxonomy_node_id, proposed_aliases, proposed_tags)
  values (p_new_version_id, auth.uid(), source_version.topic_id, next_version, 'draft', source_version.content, source_version.warnings, source_version.source_ids, source_version.version_number, source_version.proposed_title, source_version.proposed_slug, source_version.proposed_taxonomy_node_id, source_version.proposed_aliases, source_version.proposed_tags);
  perform public.sync_claim_citations(p_new_version_id);
  return p_new_version_id;
end;
$$;
revoke all on function public.restore_topic_version(uuid,uuid) from public;
grant execute on function public.restore_topic_version(uuid,uuid) to authenticated;

commit;
