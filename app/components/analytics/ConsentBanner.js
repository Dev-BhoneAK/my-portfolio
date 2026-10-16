import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import ExternalLink from "@/app/components/common/ExternalLink";
import { revealVariants } from "@/app/utils/motion";
import { focusRing } from "@/app/utils/styles";

// Accept and Decline look the same, so neither is the easy way out.
const buttonClassName = `rounded-full border border-line-strong px-5 pb-2 pt-2.5 text-sm font-semibold text-heading transition-colors hover:border-highlight hover:text-highlight ${focusRing}`;

// Asks visitors in the consent region (EEA, UK, Switzerland) before Google
// Analytics runs. Not a dialog: the page stays usable and focus stays put,
// unless the visitor opened it from the footer's "Cookie settings". It sits
// bottom left, clear of the back-to-top button, with the same entrance.
export default function ConsentBanner({ open, takeFocus, onChoice }) {
  const firstButton = useRef(null);

  useEffect(() => {
    if (open && takeFocus) firstButton.current?.focus();
  }, [open, takeFocus]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Analytics consent"
            className="fixed bottom-4 left-4 right-[4.5rem] z-50 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-body shadow-lg shadow-float xs:bottom-6 xs:left-6 xs:right-auto xs:max-w-sm"
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              y: 16,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            variants={revealVariants}
          >
            <p>
              May this site use Google Analytics cookies to see how visitors
              find and use it?{" "}
              <ExternalLink
                href="https://policies.google.com/technologies/partner-sites"
                className="font-medium text-accent hover:text-accent-hover"
              >
                How Google uses the data
              </ExternalLink>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                ref={firstButton}
                type="button"
                onClick={() => onChoice("denied")}
                className={buttonClassName}
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => onChoice("granted")}
                className={buttonClassName}
              >
                Accept
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
