import { motion } from "framer-motion";
import { FiCheck, FiTarget } from "react-icons/fi";

import { revealOnScroll } from "@/app/utils/motion";
import SectionHeading from "./SectionHeading";

// Where an unfinished project stands, in place of an outcome: how success
// will be measured, beside the steps as a timeline in the Experience
// section's style. Steps before current.step are done (a ticked dot), the
// current one gets the pink dot of the current role and its label, and the
// rest are open circles.
export default function RoadmapSection({
  id,
  eyebrow,
  title,
  intro,
  measuresTitle,
  measures,
  steps,
  current,
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mb-24 scroll-mt-12 md:mb-36"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id={id}
            eyebrow={eyebrow}
            title={title}
            intro={intro}
          />

          <h3 className="mt-10 text-lg font-semibold text-heading">
            {measuresTitle}
          </h3>
          <ul className="mt-4 space-y-4">
            {measures.map((measure) => (
              <li key={measure} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-accent"
                >
                  <FiTarget />
                </span>
                <p className="pt-2 leading-snug text-body">{measure}</p>
              </li>
            ))}
          </ul>
        </div>

        <motion.ol aria-label="Roadmap" className="lg:pt-1" {...revealOnScroll}>
          {steps.map((step, index) => {
            const done = index < current.step;
            const now = index === current.step;
            return (
              <li key={step.title} className="relative pb-7 pl-10 last:pb-0">
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1 left-[9px] top-6 w-0.5 ${
                      done ? "bg-marker-line" : "bg-line"
                    }`}
                  ></span>
                )}
                {done && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-marker text-xs text-page"
                  >
                    <FiCheck strokeWidth={3.5} />
                  </span>
                )}
                {now && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-3 w-3 rounded-full bg-action ring-4 ring-action-glow"
                  ></span>
                )}
                {!done && !now && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-3 w-3 rounded-full border-2 border-line-strong bg-page"
                  ></span>
                )}

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <h3 className="font-semibold leading-5 text-heading">
                    {step.title}
                    {done && <span className="sr-only">, done</span>}
                  </h3>
                  {now && (
                    <span className="rounded-full border border-line bg-subtle px-2.5 pb-1 pt-1.5 text-xs font-medium leading-none text-label">
                      {current.label}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
