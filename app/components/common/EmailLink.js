import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";

// The tooltip keeps at least the page's side gutter from the screen edges.
const edgeGap = 16;

// A mailto link that also copies its address and says so in a tooltip.
// mailto does nothing for visitors without a mail app set up (webmail users,
// mostly), so the copy makes sure every click still gives them the address.
export default function EmailLink({ href, className, children, ...props }) {
  const [copied, setCopied] = useState(false);
  const [nudge, setNudge] = useState(0);
  const hideTimer = useRef();
  const tooltip = useRef(null);
  const address = href.replace(/^mailto:/, "").split("?")[0];

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  // Centered over the link, the tooltip can run off a phone screen: the
  // footer's email icon sits left of center, and a demo link can end its
  // row. Before it paints, it's moved sideways just enough to stay inside.
  useLayoutEffect(() => {
    if (!copied) return;
    const { left, right } = tooltip.current.getBoundingClientRect();
    const maxRight = document.documentElement.clientWidth - edgeGap;
    setNudge((current) => {
      const overLeft = edgeGap - (left - current);
      const overRight = right - current - maxRight;
      return overLeft > 0 ? overLeft : overRight > 0 ? -overRight : 0;
    });
  }, [copied]);

  // The default action still runs, so a mail app opens where there is one.
  // If the browser blocks the clipboard, the click is just a mailto link.
  function copyAddress() {
    navigator.clipboard?.writeText(address).then(
      () => {
        setCopied(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setCopied(false), 2500);
      },
      () => {},
    );
  }

  return (
    <span className="relative inline-flex">
      <a href={href} onClick={copyAddress} className={className} {...props}>
        {children}
      </a>
      <span role="status" className="sr-only">
        {copied && `Copied ${address} to the clipboard`}
      </span>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {copied && (
            <motion.span
              ref={tooltip}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3 pb-1.5 pt-2 text-sm font-medium leading-none text-heading shadow-lg shadow-float"
              style={{ x: "-50%", marginLeft: nudge }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <FiCheck className="-mt-0.5 shrink-0 text-success-text" />
              Copied {address}
            </motion.span>
          )}
        </AnimatePresence>
      </MotionConfig>
    </span>
  );
}
