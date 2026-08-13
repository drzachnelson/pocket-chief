import { apiOwner } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await apiOwner(); if (response) return response;
  const { id } = await params;
  if (!/^[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/.test(id)) return Response.json({ error: "Invalid media identifier." }, { status: 400 });
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.storage.from("topic-media").createSignedUrl(id, 60);
    if (error) throw error;
    return Response.json({ url: data.signedUrl, expiresIn: 60 }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return Response.json({ error: "Private media is unavailable." }, { status: 404 }); }
}
