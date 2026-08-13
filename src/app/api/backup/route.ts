import JSZip from "jszip";
import { apiOwner } from "@/lib/auth";
import { buildBackupManifest, topicToMarkdown } from "@/lib/backup";
import { demoStore } from "@/lib/store";

export async function GET() {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const topics = demoStore.topics().filter((topic) => topic.approvedVersion);
  const sources = demoStore.sources();
  const cards = demoStore.cards();
  const manifest = buildBackupManifest(topics, sources, cards);
  const zip = new JSZip();
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));
  zip.file("sources.json", JSON.stringify(sources, null, 2));
  zip.file("anki-drafts.json", JSON.stringify(cards, null, 2));
  zip.file("media/manifest.json", JSON.stringify({ files: [], note: "Private media binaries are included here when configured in Supabase Storage." }, null, 2));
  for (const topic of topics) {
    zip.file(`topics/${topic.slug}.md`, topicToMarkdown(topic));
    zip.file(`topics/${topic.slug}.json`, JSON.stringify(topic, null, 2));
  }
  const archive = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });
  demoStore.audit("backup.exported", "library", owner.email, { topics: topics.length });
  return new Response(archive as BodyInit, { headers: { "Content-Type": "application/zip", "Content-Disposition": `attachment; filename=Pocket-Chief-backup-${new Date().toISOString().slice(0, 10)}.zip`, "Cache-Control": "private, no-store" } });
}
