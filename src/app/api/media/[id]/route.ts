import { apiOwner } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await apiOwner(); if (response) return response;
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return Response.json({ error: "Invalid media identifier." }, { status: 400 });
  try {
    const supabase = await createSupabaseServerClient();
    const media = await supabase.from("media").select("storage_path").eq("id", id).maybeSingle();
    if (media.error || !media.data) throw media.error ?? new Error("Media not found.");
    const { data, error } = await supabase.storage.from("topic-media").createSignedUrl(media.data.storage_path, 60);
    if (error) throw error;
    return NextResponse.redirect(data.signedUrl, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return Response.json({ error: "Private media is unavailable." }, { status: 404 }); }
}
