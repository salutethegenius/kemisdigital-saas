import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Serve the v2 landing page while keeping the URL at /
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/v2";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

