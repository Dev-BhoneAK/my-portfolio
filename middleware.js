import { NextResponse } from "next/server";

import { consentCountries, regionCookie } from "@/app/utils/consent";

// Tells the page whether the visitor must consent before Google Analytics
// runs. The page is prerendered, so the country, from Vercel's
// x-vercel-ip-country header, reaches it in a cookie. Without the header, as
// in local builds, the visitor counts as outside the consent region.
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

export const config = { matcher: "/" };
