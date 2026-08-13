import { apiOwner } from "@/lib/auth";
import { getRepository } from "@/lib/repository";
import { taxonomyNodeSchema } from "@/lib/schemas";
import { detectLikelyPHI } from "@/lib/safety";
import { slugify } from "@/lib/text";
import { taxonomyParentIsValid } from "@/lib/taxonomy";

async function save(request: Request, requireId: boolean) {
  const { owner, response } = await apiOwner();
  if (response || !owner) return response!;
  try {
    const body = taxonomyNodeSchema.parse(await request.json());
    if (requireId && !body.id) return Response.json({ error: "Taxonomy node ID is required." }, { status: 422 });
    if (detectLikelyPHI(body.title).blocked) return Response.json({ error: "Remove possible patient identifiers.", code: "PHI_SUSPECTED" }, { status: 422 });
    const repository = await getRepository();
    const taxonomy = await repository.listTaxonomy();
    const existing = body.id ? taxonomy.find((node) => node.id === body.id) : null;
    if (body.id && !existing) return Response.json({ error: "Taxonomy node not found." }, { status: 404 });
    if (!taxonomyParentIsValid(body.id, body.parentId ?? undefined, taxonomy)) return Response.json({ error: "A category cannot be nested under itself or one of its descendants.", code: "TAXONOMY_CYCLE" }, { status: 422 });
    const node = await repository.saveTaxonomyNode({ id: body.id ?? crypto.randomUUID(), title: body.title, slug: existing?.slug ?? slugify(body.title), parentId: body.parentId ?? undefined, order: body.order });
    await repository.audit(existing ? "taxonomy.node.updated" : "taxonomy.node.created", node.id, owner.email);
    return Response.json({ node }, { status: existing ? 200 : 201 });
  } catch { return Response.json({ error: "The taxonomy update is invalid." }, { status: 422 }); }
}

export async function POST(request: Request) { return save(request, false); }
export async function PATCH(request: Request) { return save(request, true); }
