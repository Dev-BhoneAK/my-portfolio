import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import PhoneFrame from "@/app/components/common/PhoneFrame";
import { revealOnScroll } from "@/app/utils/motion";
import { chipClassName } from "@/app/utils/styles";
import SectionHeading from "./SectionHeading";

// One flow: its number, title and who it's for, then its screens in order.
// Below xs they scroll sideways like the projects' screenshots. From xs up
// they sit side by side, each at most 13rem wide; from xl, where two flows
// share a row, at most a third of it, so a two-step flow matches its
// neighbour, and both stages grow to the taller one's height.
function Flow({ number, title, role, summary, steps }) {
  return (
    <motion.div className="flex flex-col" {...revealOnScroll}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-semibold tabular-nums text-muted">
          {String(number).padStart(2, "0")}
        </span>
        <h4 className="text-xl font-semibold tracking-tight text-heading">
          {title}
        </h4>
        <span className="rounded-full border border-line bg-subtle px-2.5 pb-1 pt-1.5 text-xs font-medium leading-none text-label">
          {role}
        </span>
      </div>
      <p className="mt-2 max-w-xl leading-relaxed text-body">{summary}</p>

      <ol
        aria-label={`${title} screens`}
        className="mt-5 flex flex-1 snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto rounded-2xl border border-line bg-surface p-4 xs:justify-center xs:overflow-visible xs:p-6 sm:p-8 xl:p-6"
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="w-[62%] shrink-0 snap-start xs:w-auto xs:max-w-[13rem] xs:flex-1 xl:max-w-[calc((100%_-_2rem)/3)]"
          >
            <figure>
              <PhoneFrame
                src={step.src}
                alt={step.alt}
                sizes="(min-width: 1536px) 196px, (min-width: 1280px) 160px, (min-width: 640px) 208px, 56vw"
              />
              <figcaption className="mt-4 flex gap-2.5">
                {/* The list already numbers the steps for screen readers. */}
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-product pt-0.5 text-xs font-semibold text-on-product"
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium leading-snug text-heading">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted">
                    {step.text}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

// How the product works, in its real screens. A row of chips sums up the
// loop, then come chapters of flows, numbered straight through. From xl up
// two flows sit side by side.
export default function FlowsSection({
  id,
  eyebrow,
  title,
  intro,
  loop,
  chapters,
}) {
  // Where each chapter's numbering starts.
  const firstNumbers = chapters.map((_, index) =>
    chapters
      .slice(0, index)
      .reduce((count, chapter) => count + chapter.flows.length, 1),
  );

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mb-24 scroll-mt-12 md:mb-36"
    >
      <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} />

      <ol
        aria-label="At a glance"
        className="mt-8 flex flex-wrap items-center gap-x-1.5 gap-y-2.5"
      >
        {loop.map((step, index) => (
          <li key={step} className="flex items-center gap-1.5">
            <span className={chipClassName}>{step}</span>
            {index < loop.length - 1 && (
              <FiArrowRight aria-hidden="true" className="text-muted" />
            )}
          </li>
        ))}
      </ol>

      {chapters.map((chapter, chapterIndex) => (
        <div key={chapter.title} className="mt-16 lg:mt-20">
          <h3 className="flex items-center gap-4 text-xl font-semibold tracking-tight text-heading xs:text-2xl">
            {chapter.title}
            <span aria-hidden="true" className="h-px flex-1 bg-line"></span>
          </h3>
          <div className="mt-8 grid gap-12 xl:grid-cols-2 xl:gap-6">
            {chapter.flows.map((flow, index) => (
              <Flow
                key={flow.title}
                number={firstNumbers[chapterIndex] + index}
                {...flow}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
