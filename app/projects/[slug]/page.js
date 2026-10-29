import CaseStudyPage from "@/app/components/case-study/CaseStudyPage";
import caseStudies, {
  caseStudyPath,
  findCaseStudy,
} from "@/app/utils/caseStudies";

// Every case study is prerendered at build time. Any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

// Link previews are built from these. The card image is opengraph-image.jsx,
// next to this file.
export function generateMetadata({ params }) {
  const { slug, name, summary } = findCaseStudy(params.slug);
  const title = `${name} case study – Bhone Aung Kyaw`;

  return {
    title,
    description: summary,
    openGraph: {
      type: "article",
      url: caseStudyPath(slug),
      siteName: "Bhone Aung Kyaw",
      title,
      description: summary,
    },
  };
}

export default function Page({ params }) {
  return <CaseStudyPage slug={params.slug} />;
}
