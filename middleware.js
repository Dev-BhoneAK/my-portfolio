import { NextResponse } from "next/server";

import { consentCountries, regionCookie } from "@/app/utils/consent";

// Tells the page whether the visitor must consent before Google Analytics
// runs. The pages are prerendered, so the country, from Vercel's
// x-vercel-ip-country header, reaches them in a cookie. Without the header,
// as in local builds, the visitor counts as outside the consent region.
// It runs on case studies too: a visitor who lands straight on one must be
// asked as well.
export function middleware(request) {
  const country = request.headers.get("x-vercel-ip-country");
  const response = NextResponse.next();
  response.cookies.set(
    regionCookie,
    consentCountries.includes(country) ? "eu" : "other",
    { path: "/", sameSite: "lax" },
  );
  return response;
}

export const config = { matcher: ["/", "/projects/:path*"] };
