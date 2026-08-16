import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { dataMode } from "@/lib/data-mode";

const publicPaths = ["/auth/sign-in", "/auth/callback", "/configuration-error", "/icon.svg", "/icon-maskable.svg", "/manifest.webmanifest", "/sw.js"];

const isPublicPath = (pathname: string) => publicPaths.some((path) => pathname.startsWith(path)) || pathname.startsWith("/_next/");

export async function proxy(request: NextRequest) {
  // Share the resolver with getRepository() rather than recomputing the condition: when the two
  // disagree the proxy waves requests through while pages query Supabase with no session.
  const mode = dataMode();
  if (mode === "demo") return NextResponse.next();
  if (mode === "misconfigured") {
    if (request.nextUrl.pathname.startsWith("/api/")) return Response.json({ error: "Pocket Chief is not configured.", code: "CONFIGURATION_REQUIRED" }, { status: 503 });
    if (isPublicPath(request.nextUrl.pathname)) return NextResponse.next();
    const target = request.nextUrl.clone(); target.pathname = "/configuration-error"; target.search = "";
    return NextResponse.redirect(target);
  }
  if (isPublicPath(request.nextUrl.pathname)) return NextResponse.next();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
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
