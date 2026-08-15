import { apiOwner } from "@/lib/auth";
import { installLibrary } from "@/lib/library-install";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function POST() {
  const { owner, response } = await apiOwner();
  if (response) return response;
  try {
    const repository = await getRepository();
    const report = await installLibrary(repository, owner.email);
    await repository.audit("library.install", "library", owner.email, { installed: report.installed, present: report.present, failed: report.failed });
    return Response.json(report, { status: report.failed > 0 ? 207 : 200, headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "The library could not be installed.", code: "INSTALL_FAILED" }, { status: 500 });
  }
}
