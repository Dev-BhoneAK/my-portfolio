import { ImageResponse } from "next/server";

// The social card that LinkedIn, X and chat apps show when the site is
// shared. Next writes the og:image tags for it. It renders outside the page's
// CSS, so the colors are copied from the .dark block in app/globals.css.
export const runtime = "edge";
export const alt =
  "Bhone Aung Kyaw, Senior Full-stack Engineer: 10+ years, web and mobile, AWS Certified";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  page: "#0a1a2f",
  heading: "#ffffff",
  muted: "#94a3b8",
  accent: "#38bdf8",
  action: "#db2777",
};

const loadFont = (url) => fetch(url).then((res) => res.arrayBuffer());

export default async function Image() {
  // Fetched here, not at the top: Next also imports this file in Node.js to
  // read alt and size for the page's meta tags, and these asset URLs only
  // resolve in the edge runtime. They stay literal so the bundler finds them.
  const [medium, semiBold] = await Promise.all([
    loadFont(
      new URL("../public/fonts/LeagueSpartan-Medium.ttf", import.meta.url),
    ),
    loadFont(
      new URL("../public/fonts/LeagueSpartan-SemiBold.ttf", import.meta.url),
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: colors.page,
          fontFamily: "League Spartan",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: colors.heading,
          }}
        >
          Bhone Aung Kyaw
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 58,
            fontWeight: 500,
            lineHeight: 1,
            color: colors.accent,
          }}
        >
          Senior Full-stack Engineer
        </div>
        <div
          style={{
            marginTop: 44,
            width: 64,
            height: 5,
            borderRadius: 3,
            background: colors.action,
          }}
        />
        <div
          style={{
            marginTop: 44,
            fontSize: 40,
            fontWeight: 500,
            lineHeight: 1,
            color: colors.muted,
          }}
        >
          10+ years · Web & mobile · AWS Certified
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "League Spartan", data: medium, weight: 500 },
        { name: "League Spartan", data: semiBold, weight: 600 },
      ],
    },
  );
}
