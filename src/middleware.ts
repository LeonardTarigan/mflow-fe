import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublicPath = pathname.startsWith("/auth");

  try {
    if (!token && !isPublicPath) {
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      if (isPublicPath) {
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
      }

      return NextResponse.next();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    if (!isPublicPath) {
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
