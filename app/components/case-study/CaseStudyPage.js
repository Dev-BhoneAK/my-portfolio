"use client";
import { MotionConfig } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

import Footer from "@/app/components/Footer";
import Nav from "@/app/components/header/Nav";
import { findCaseStudy } from "@/app/utils/caseStudies";
import caseStudyContent from "@/app/utils/caseStudies/content";
import { projectId } from "@/app/utils/projectsData";
import { focusRing } from "@/app/utils/styles";
import BloodCompatibility from "./BloodCompatibility";
import CardsSection from "./CardsSection";
import Cover from "./Cover";
import FlowsSection from "./FlowsSection";
import FolderAccess from "./FolderAccess";
import OutcomeSection from "./OutcomeSection";
import RoadmapSection from "./RoadmapSection";
import ScreensSection from "./ScreensSection";
import StackSection from "./StackSection";

// The component for each section type a case study's data can use.
const sectionComponents = {
  cards: CardsSection,
  flows: FlowsSection,
  screens: ScreensSection,
  stack: StackSection,
  outcome: OutcomeSection,
  roadmap: RoadmapSection,
  bloodCompatibility: BloodCompatibility,
  folderAccess: FolderAccess,
};

// A case study at /projects/<slug>, prerendered like the home page and with
// its nav and footer. The wrapper's class sets the product's color. Both ways
// back go to the project's row on the home page; they're plain links, so the
// page loads fresh and the browser scrolls to the row.
export default function CaseStudyPage({ slug }) {
  const caseStudy = { ...findCaseStudy(slug), ...caseStudyContent[slug] };
  const backHref = `/#${projectId(caseStudy)}`;

  return (
    <div className={`case-study ${caseStudy.className}`}>
      <header id="top" className="relative isolate pt-8 lg:pt-12">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10"></div>
        <Nav homeHref="/" />
        <Cover caseStudy={caseStudy} backHref={backHref} />
      </header>

      <MotionConfig reducedMotion="user">
        <main>
          {caseStudy.sections.map(({ type, ...section }) => {
            const Section = sectionComponents[type];
            return <Section key={section.id} {...section} />;
          })}

          <nav
            aria-label="Case study"
            className="mb-16 border-t border-line pt-8 md:mb-24"
          >
            <a
              href={backHref}
              className={`group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 pb-3 pt-3.5 font-semibold text-heading transition-colors hover:border-highlight hover:text-highlight ${focusRing}`}
            >
              <FiArrowLeft
                aria-hidden="true"
                className="-mt-0.5 transition-transform group-hover:-translate-x-0.5"
              />
              All projects
            </a>
          </nav>
        </main>
      </MotionConfig>

      <Footer />
    </div>
  );
}
