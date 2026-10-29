import { motion } from "framer-motion";
import { Fragment } from "react";

import { revealOnScroll } from "@/app/utils/motion";
import { chipClassName, eyebrowClassName } from "@/app/utils/styles";
import SectionHeading from "./SectionHeading";

function Arrow({ up = false }) {
  return (
    <svg
      viewBox="0 0 12 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-16 w-3 shrink-0 text-line-strong ${up ? "rotate-180" : ""}`}
    >
      <path d="M6 2v58M1.5 55.5 6 60l4.5-4.5" />
    </svg>
  );
}

// What passes between two parts of the diagram: down, and back up when
// something also flows back. The labels sit outside the arrows.
function Connector({ down, up }) {
  if (!up) {
    return (
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 text-xs text-muted">
        <span></span>
        <Arrow />
        <span>{down}</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 text-xs text-muted">
      <div className="flex items-center justify-end gap-2.5 pr-5">
        {down}
        <Arrow />
      </div>
      <div className="flex items-center gap-2.5 pl-5">
        <Arrow up />
        {up}
      </div>
    </div>
  );
}

// Between two parts of a lane: down in a column, turned to point right when
// the lane runs across from lg up.
function LaneArrow() {
  return (
    <span className="flex h-7 shrink-0 items-center justify-center text-line-strong lg:h-auto lg:w-8">
      <svg
        viewBox="0 0 12 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-3 lg:-rotate-90"
      >
        <path d="M6 2v19M1.5 16.5 6 21l4.5-4.5" />
      </svg>
    </span>
  );
}

// Each path through the system as a lane of parts: side by side columns from
// xs, rows across the figure from lg. A part every lane goes through (shared:
// true) gets the accent border, so the lanes visibly meet there.
function Lanes({ lanes }) {
  return (
    <div
      aria-hidden="true"
      className="mt-6 grid gap-10 xs:grid-cols-2 lg:grid-cols-1 lg:gap-8"
    >
      {lanes.map((lane) => (
        <div key={lane.title}>
          <p className="text-sm font-semibold text-heading">
            {lane.title}
            <span className="font-normal text-muted"> · {lane.detail}</span>
          </p>
          <div className="mt-3 flex flex-col lg:flex-row">
            {lane.nodes.map((node, index) => (
              <Fragment key={node.title}>
                {index > 0 && <LaneArrow />}
                <div
                  className={`rounded-xl border bg-subtle px-3 pb-3 pt-3.5 text-center text-sm leading-snug text-body lg:min-w-0 lg:flex-1 ${
                    node.shared ? "border-accent" : "border-line"
                  }`}
                >
                  <span className="block font-semibold text-heading">
                    {node.title}
                  </span>
                  {node.detail}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// The architecture as a column of parts with what flows between them, and
// the stack as groups of chips. Screen readers get the diagram as one
// sentence. An architecture with lanes needs the width, so its figure spans
// the section and the chips follow below.
export default function StackSection({
  id,
  eyebrow,
  title,
  intro,
  architecture,
  groups,
}) {
  const { description, nodes, links, lanes } = architecture;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mb-24 scroll-mt-12 md:mb-36"
    >
      <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} />

      <div
        className={`mt-10 grid items-start gap-10 lg:mt-12 ${
          lanes ? "" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
        }`}
      >
        <motion.figure
          className="rounded-2xl border border-line bg-surface p-6 xs:p-8"
          {...revealOnScroll}
        >
          <figcaption className={`text-center ${eyebrowClassName}`}>
            Architecture
          </figcaption>
          <p className="sr-only">{description}</p>
          {lanes ? (
            <Lanes lanes={lanes} />
          ) : (
            <div aria-hidden="true" className="mx-auto mt-6 max-w-xs">
              {nodes.map((node, index) => (
                <Fragment key={node.title}>
                  {index > 0 && <Connector {...links[index - 1]} />}
                  <div className="rounded-xl border border-line bg-subtle px-4 pb-3 pt-3.5 text-center text-sm leading-snug text-body">
                    <span className="block font-semibold text-heading">
                      {node.title}
                    </span>
                    {node.detail}
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </motion.figure>

        <motion.dl className="divide-y divide-line" {...revealOnScroll}>
          {groups.map(({ label, items }) => (
            <div
              key={label}
              className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="text-sm text-muted sm:pt-2">{label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className={chipClassName}>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
