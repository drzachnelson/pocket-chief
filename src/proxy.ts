import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/auth/sign-in", "/auth/callback", "/configuration-error", "/icon.svg", "/icon-maskable.svg", "/manifest.webmanifest", "/sw.js"];

export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const configured = Boolean(supabaseUrl && supabaseAnonKey && process.env.POCKET_CHIEF_OWNER_EMAIL);
  const localDemo = process.env.NODE_ENV !== "production" && process.env.POCKET_CHIEF_DEMO === "true";
  if (localDemo) return NextResponse.next();
  if (!configured) {
    if (request.nextUrl.pathname.startsWith("/api/")) return Response.json({ error: "Pocket Chief is not configured.", code: "CONFIGURATION_REQUIRED" }, { status: 503 });
    if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path)) || request.nextUrl.pathname.startsWith("/_next/")) return NextResponse.next();
    const target = request.nextUrl.clone(); target.pathname = "/configuration-error"; target.search = "";
    return NextResponse.redirect(target);
  }
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path)) || request.nextUrl.pathname.startsWith("/_next/")) return NextResponse.next();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
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
