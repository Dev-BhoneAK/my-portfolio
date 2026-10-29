import { NextResponse } from "next/server";

import { consentCountries, regionCookie } from "@/app/utils/consent";
import { resumeFiles, resumeLanguage, resumePath } from "@/app/utils/resume";

// Tells the page whether the visitor must consent before Google Analytics
// runs. The pages are prerendered, so the country, from Vercel's
// x-vercel-ip-country header, reaches them in a cookie. Without the header,
// as in local builds, the visitor counts as outside the consent region.
// - It runs on every page, case studies too: a visitor who lands straight
//   on one must be asked as well.
// - It also picks the resume's language. NextResponse.redirect is a 307,
//   which browsers don't cache, so one visit doesn't fix the language.
export function middleware(request) {
  const country = request.headers.get("x-vercel-ip-country");

  if (request.nextUrl.pathname === resumePath) {
    const language = resumeLanguage(
      request.headers.get("accept-language"),
      country,
    );
    return NextResponse.redirect(new URL(resumeFiles[language], request.url));
  }

  const response = NextResponse.next();
  response.cookies.set(
    regionCookie,
    consentCountries.includes(country) ? "eu" : "other",
    { path: "/", sameSite: "lax" },
  );
  return response;
}

// Next reads the matcher at build time, so it can't use resumePath.
export const config = {
  matcher: ["/", "/projects/:path*", "/download/resume"],
};
