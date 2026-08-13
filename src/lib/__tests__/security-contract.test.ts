import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Supabase security contract", () => {
  const baseSql = readFileSync(resolve("supabase/migrations/202608120001_pocket_chief.sql"), "utf8");
  const hardeningSql = readFileSync(resolve("supabase/migrations/202608130001_release_hardening.sql"), "utf8");
  const sql = `${baseSql}\n${hardeningSql}`;

  it("enables owner-scoped RLS on every private content table", () => {
    for (const table of ["taxonomy_nodes", "topics", "sources", "topic_versions", "claim_citations", "media", "bookmarks", "recent_views", "anki_drafts", "audit_events"]) {
      expect(sql).toContain(`alter table public.${table} enable row level security`);
    }
    expect(sql).toContain("owner_id = auth.uid()");
  });

  it("makes storage private and approved versions immutable", () => {
    expect(sql).toContain("values ('topic-media', 'topic-media', false");
    expect(sql).toContain("Approved topic versions are immutable");
    expect(sql).toContain("Every factual claim must be supported before approval");
  });

  it("guards signup and searches only the approved version", () => {
    expect(sql).toContain("pocket_chief_owner_only_signup");
    expect(sql).toContain("current_approved_version_id");
    expect(sql).toContain("search_approved_topics");
    expect(sql).toContain("ensure_launch_topic");
    expect(sql).toContain("'choledocholithiasis'");
  });

  it("creates drafts and restores versions transactionally while proving citation completeness", () => {
    expect(sql).toContain("create_topic_draft");
    expect(sql).toContain("replace_topic_draft");
    expect(sql).toContain("restore_topic_version");
    expect(sql).toContain("jsonb_array_elements(target.content)");
    expect(sql).toContain("topic_block_expected_claims");
    expect(sql).toContain("jsonb_array_elements(coalesce(block->'rows'");
    expect(sql).toContain("string_agg(cell.value, ' — '");
    expect(sql).toContain("cardinality(expected.units)");
    expect(sql).toContain("source_id = any(target.source_ids)");
    expect(sql).toContain("perform public.sync_claim_citations(version_id)");
    expect(sql).toContain("prevent_taxonomy_cycles");
    expect(sql).toContain("max(version_number)");
    expect(sql).toContain("save_anki_draft");
    expect(sql).toContain("on conflict (owner_id, duplicate_hash) do update");
    expect(hardeningSql).toContain("add column if not exists proposed_title");
    expect(hardeningSql).toContain("digest(convert_to(p_content_text");
    expect(hardeningSql).toContain("pg_advisory_xact_lock");
    expect(hardeningSql).toContain("Anki topic does not belong to the owner");
  });

  it("requires every references block's sourceIds to belong to the version's source_ids before approval", () => {
    expect(hardeningSql).toContain("when 'references' then array(");
    expect(hardeningSql).toContain("topic_block_expected_claims(block jsonb, valid_source_ids uuid[]");
    expect(hardeningSql).toContain("topic_block_expected_claims(block.value, target.source_ids)");
  });
});
