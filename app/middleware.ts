// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await NextResponse.next();

  if (
    request.nextUrl.pathname.startsWith("/_next/static") ||
    request.nextUrl.pathname.startsWith("/images")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  } else {
    response.headers.set("Cache-Control", "public, max-age=60, s-maxage=300");
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
