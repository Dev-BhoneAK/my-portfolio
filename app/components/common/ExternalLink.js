import { FiArrowUpRight } from "react-icons/fi";

import { focusRing } from "@/app/utils/styles";

// Opens in a new tab. The arrow shows it, and screen readers are told.
export default function ExternalLink({ href, className, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-1 transition-colors ${focusRing} ${className}`}
    >
      {children}
      <FiArrowUpRight
        aria-hidden="true"
        className="-mt-0.5 shrink-0 text-[0.9em] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
