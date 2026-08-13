import JSZip from "jszip";
import { apiOwner } from "@/lib/auth";
import { buildBackupManifest, topicToMarkdown } from "@/lib/backup";
import { getRepository } from "@/lib/repository";

export async function GET() {
  const { owner, response } = await apiOwner(); if (response || !owner) return response!;
  const repository = await getRepository();
  const topics = (await repository.listTopics()).filter((topic) => topic.approvedVersion);
  const sources = await repository.listSources();
  const cards = await repository.listCards();
  const media = await repository.listMedia();
  const manifest = buildBackupManifest(topics, sources, cards);
  const zip = new JSZip();
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));
  zip.file("sources.json", JSON.stringify(sources, null, 2));
  zip.file("anki-drafts.json", JSON.stringify(cards, null, 2));
  zip.file("media/manifest.json", JSON.stringify({ files: media.map((file) => ({ id: file.id, path: file.storagePath, mimeType: file.mimeType })) }, null, 2));
  for (const file of media) zip.file(`media/${file.storagePath.split("/").at(-1) ?? file.id}`, file.bytes);
  for (const topic of topics) {
    zip.file(`topics/${topic.slug}.md`, topicToMarkdown(topic));
    zip.file(`topics/${topic.slug}.json`, JSON.stringify(topic, null, 2));
  }
  const archive = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });
  await repository.audit("backup.exported", "library", owner.email, { topics: topics.length });
  return new Response(archive as BodyInit, { headers: { "Content-Type": "application/zip", "Content-Disposition": `attachment; filename=Pocket-Chief-backup-${new Date().toISOString().slice(0, 10)}.zip`, "Cache-Control": "private, no-store" } });
}
