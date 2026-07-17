import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Next.js 16: "middleware" yerine "proxy". Sadece /uss (yönetim paneli) korunur.
// Tanıtım sitesi (/) ve diğer her şey herkese açık kalır — buraya hiç uğramaz.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isLogin = path === "/uss/login";

  // Giriş yapmamışsa panele sokma → login'e at
  if (!user && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/uss/login";
    return NextResponse.redirect(url);
  }

  // Giriş yapmışsa login sayfasında durmasın → panele al
  if (user && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/uss";
    return NextResponse.redirect(url);
  }

  // Panel sayfalarını arama motorlarından gizle (ekstra katman)
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/uss", "/uss/:path*"],
};
