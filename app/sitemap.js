import caseStudies, { caseStudyPath } from "@/app/utils/caseStudies";
import { siteUrl } from "@/app/utils/site";

// The home page and every case study, for search engines. robots.txt points
// here.
export default function sitemap() {
  return [
    { url: siteUrl },
    ...caseStudies.map(({ slug }) => ({
      url: `${siteUrl}${caseStudyPath(slug)}`,
    })),
  ];
}
