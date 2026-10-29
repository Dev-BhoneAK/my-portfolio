import { motion } from "framer-motion";
import { FiArrowRight, FiLock } from "react-icons/fi";

import EmailLink from "@/app/components/common/EmailLink";
import ExternalLink from "@/app/components/common/ExternalLink";
import StatusPill from "@/app/components/common/StatusPill";
import { caseStudyPath } from "@/app/utils/caseStudies";
import { revealOnScroll } from "@/app/utils/motion";
import { projectId } from "@/app/utils/projectsData";
import { emailAddress } from "@/app/utils/socialLinks";
import { chipClassName, focusRing } from "@/app/utils/styles";
import DesktopScreen from "./DesktopScreen";
import PhoneScreens from "./PhoneScreens";

// From lg up, a reverse row puts its screenshots on the left.
const columns = {
  default: {
    row: "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
    text: "lg:col-start-1",
    screens: "lg:col-start-2",
  },
  reverse: {
    row: "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
    text: "lg:col-start-2",
    screens: "lg:col-start-1",
  },
};

// One project row. Below lg it reads top to bottom: name, screenshots, then
// stack and links. From lg up the text sits beside the screenshots, and the
// 1fr rows above and below it center it against them. A desktop project shows
// its one screenshot in a browser window where the others show phones.
export default function ProjectItem({ project, reverse = false }) {
  const {
    name,
    kind,
    status,
    description,
    stack,
    links = [],
    demoOnRequest,
    caseStudy,
    device,
    screens,
  } = project;
  const demoMailto = `mailto:${emailAddress}?subject=${encodeURIComponent(
    `Demo request: ${name}`,
  )}`;
  const layout = reverse ? columns.reverse : columns.default;

  return (
    <motion.li
      id={projectId(project)}
      className={`grid scroll-mt-12 gap-y-6 ${layout.row} lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-12 lg:gap-y-0 xl:gap-x-16`}
      {...revealOnScroll}
    >
      <div className={`${layout.text} lg:row-start-2`}>
        <p className="text-sm font-medium text-accent">{kind}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-heading">
            {name}
          </h3>
          {status && <StatusPill>{status}</StatusPill>}
        </div>
        <p className="mt-3 max-w-xl leading-relaxed text-body">
          {description}
        </p>
      </div>

      <div className={`${layout.screens} lg:row-span-4 lg:row-start-1`}>
        {device === "desktop" ? (
          <DesktopScreen screen={screens[0]} />
        ) : (
          <PhoneScreens name={name} screens={screens} />
        )}
      </div>

      <div className={`${layout.text} lg:row-start-3 lg:mt-6`}>
        <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li key={tech} className={chipClassName}>
              {tech}
            </li>
          ))}
        </ul>
        {(caseStudy || links.length > 0 || demoOnRequest) && (
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {/* It stays on the site, so → rather than the ↗ of the links. */}
            {caseStudy && (
              <a
                href={caseStudyPath(caseStudy)}
                className={`group inline-flex items-center gap-1 font-semibold text-accent transition-colors hover:text-accent-hover ${focusRing}`}
              >
                Read the case study
                <FiArrowRight
                  aria-hidden="true"
                  className="-mt-0.5 shrink-0 text-[0.9em] transition-transform group-hover:translate-x-0.5"
                />
              </a>
            )}
            {links.map(({ label, url }) => (
              <ExternalLink
                key={url}
                href={url}
                className="font-medium text-accent hover:text-accent-hover"
              >
                {label}
              </ExternalLink>
            ))}
            {demoOnRequest && (
              <p className="flex items-center gap-1.5 text-muted">
                <FiLock aria-hidden="true" className="-mt-0.5 shrink-0" />
                <span>
                  Login required ·{" "}
                  <EmailLink
                    href={demoMailto}
                    className={`font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
                  >
                    Request a demo
                  </EmailLink>
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
}
