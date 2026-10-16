import { AnimatePresence, MotionConfig, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiArrowUp } from "react-icons/fi";
import { ImHeart } from "react-icons/im";

import { useConsent } from "@/app/components/analytics/AnalyticsProvider";
import EmailLink from "@/app/components/common/EmailLink";
import { revealVariants } from "@/app/utils/motion";
import {
  emailLink,
  githubLink,
  linkedinLink,
  xLink,
} from "@/app/utils/socialLinks";
import { focusRing } from "@/app/utils/styles";

// The site's original footer icons, each with its own move on hover.
const footerLinks = [
  { ...emailLink, hoverMove: "group-hover:scale-125" },
  { ...linkedinLink, hoverMove: "group-hover:-translate-y-1" },
  { ...githubLink, hoverMove: "group-hover:rotate-12" },
  { ...xLink, hoverMove: "group-hover:-rotate-12" },
];

// The icons sit above the sign-off on small screens and beside it from md up.
// While the footer is on screen, a back-to-top button floats in at the bottom
// right. It links to the header's #top, which scrolls smoothly and moves
// keyboard focus up.
export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef);
  const { inConsentRegion, openConsentSettings } = useConsent();

  return (
    <footer
      ref={footerRef}
      className="flex flex-col items-center gap-1 pb-8 text-muted md:flex-row-reverse md:justify-around"
    >
      {/* Each icon gets a 44px tap target; the 20px glyph keeps its look. */}
      <ul className="flex items-center">
        {footerLinks.map(({ label, href, Icon, hoverMove }) => {
          const LinkTag = href.startsWith("mailto:") ? EmailLink : "a";
          return (
            <li key={label}>
              <LinkTag
                href={href}
                aria-label={label}
                {...(href.startsWith("http") && {
                  target: "_blank",
                  rel: "noreferrer",
                })}
                className={`group flex h-11 w-11 items-center justify-center rounded-full text-xl text-action ${focusRing}`}
              >
                <Icon
                  aria-hidden="true"
                  className={`transition-transform ${hoverMove}`}
                />
              </LinkTag>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col items-center gap-1">
        {/* At 17px the line is as long as the icon row above it on small
            screens (about 150px each), so the two read as one block. */}
        <p className="inline-flex items-center gap-1.5 text-[17px] leading-6">
          Made with
          <ImHeart aria-hidden="true" className="-mt-0.5 text-action" />
          <span className="sr-only">love</span>
          by BAK
        </p>
        {/* Only for visitors asked for analytics consent (EEA, UK,
            Switzerland), to change their answer. A line of its own and
            centered: at the end of the line above, the floating back-to-top
            button covered it on phones. */}
        {inConsentRegion && (
          <button
            type="button"
            onClick={openConsentSettings}
            className={`rounded-sm text-sm transition-colors hover:text-heading ${focusRing}`}
          >
            Cookie settings
          </button>
        )}
      </div>

      {/* Same round button as the theme toggle in the nav, with a solid
          background so it stays readable over the page. */}
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {isInView && (
            <motion.a
              href="#top"
              aria-label="Back to top"
              className={`fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-control shadow-lg shadow-float transition-colors hover:border-line-hover hover:text-heading xs:bottom-6 xs:right-6 ${focusRing}`}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: 16,
                transition: { duration: 0.3, ease: "easeIn" },
              }}
              variants={revealVariants}
            >
              <FiArrowUp aria-hidden="true" className="text-lg" />
            </motion.a>
          )}
        </AnimatePresence>
      </MotionConfig>
    </footer>
  );
}
