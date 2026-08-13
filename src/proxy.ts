import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/auth/sign-in", "/auth/callback", "/icon.svg", "/icon-maskable.svg", "/manifest.webmanifest", "/sw.js"];

export async function proxy(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_POCKET_CHIEF_DEMO === "true") return NextResponse.next();
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path)) || request.nextUrl.pathname.startsWith("/_next/")) return NextResponse.next();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) => { items.forEach(({ name, value }) => request.cookies.set(name, value)); response = NextResponse.next({ request }); items.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  const owner = process.env.POCKET_CHIEF_OWNER_EMAIL?.toLowerCase();
  if (!user?.email || !owner || user.email.toLowerCase() !== owner) {
    if (user) await supabase.auth.signOut();
    const target = request.nextUrl.clone(); target.pathname = "/auth/sign-in"; target.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(target);
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
