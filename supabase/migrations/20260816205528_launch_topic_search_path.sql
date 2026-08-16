-- Fixes `ensure_launch_topic` failing with `function digest(bytea, unknown) does not exist`
-- against hosted Supabase.
--
-- `digest()` ships with pgcrypto, and Supabase installs extensions into the `extensions`
-- schema rather than `public`. The function is SECURITY DEFINER with `search_path = public`,
-- so the bare `digest(...)` call in the release-digest check could never resolve. Local
-- verification never caught it: the seed only runs against a real Supabase project with a
-- signed-in owner, which was the one path never exercised before deployment.
--
-- 202608130001 is applied and therefore immutable, so this recreates the function rather than
-- editing it. The body below is byte-identical to 202608130001 except for the search_path
-- clause — in particular the pinned sha256 is unchanged, so `content-contract.test.ts` still
-- asserts the same digest and the launch content still cannot drift.

create or replace function public.ensure_launch_topic(p_content_text text) returns void language plpgsql security definer set search_path = public, extensions as $$
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
