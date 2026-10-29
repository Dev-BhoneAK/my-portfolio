import { ImageResponse } from "next/server";

import { findCaseStudy } from "@/app/utils/caseStudies";

// A case study's social card, in the style of the site's own card
// (app/opengraph-image.jsx): the project, its tagline, the pink divider, then
// whose case study it is. The same rules apply: colors are hex values copied
// from .dark in app/globals.css, and the fonts load inside Image().
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  page: "#0a1a2f",
  heading: "#ffffff",
  muted: "#94a3b8",
  accent: "#38bdf8",
  action: "#db2777",
};

// One card per case study. An unknown slug gets none, so its URL is a 404.
export function generateImageMetadata({ params }) {
  const caseStudy = findCaseStudy(params.slug);
  if (!caseStudy) return [];
  return [
    {
      id: "card",
      size,
      contentType,
      alt: `${caseStudy.name} case study by Bhone Aung Kyaw. ${caseStudy.tagline}`,
    },
  ];
}

const loadFont = (url) => fetch(url).then((res) => res.arrayBuffer());

export default async function Image({ params }) {
  const { name, tagline } = findCaseStudy(params.slug);
  const [medium, semiBold] = await Promise.all([
    loadFont(
      new URL("../../../public/fonts/LeagueSpartan-Medium.ttf", import.meta.url),
    ),
    loadFont(
      new URL(
        "../../../public/fonts/LeagueSpartan-SemiBold.ttf",
        import.meta.url,
      ),
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
            fontSize: 30,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: colors.muted,
          }}
        >
          Case study
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 120,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: colors.heading,
          }}
        >
          {name}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 52,
            fontWeight: 500,
            lineHeight: 1,
            color: colors.accent,
          }}
        >
          {tagline}
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
          Bhone Aung Kyaw · Senior Full-stack Engineer
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
