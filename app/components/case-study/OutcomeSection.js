import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import { revealOnScroll } from "@/app/utils/motion";
import SectionHeading from "./SectionHeading";

// Lists side by side from md: what real use changed (done: true, ticked) and
// what comes next.
export default function OutcomeSection({ id, eyebrow, title, intro, lists }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mb-24 scroll-mt-12 md:mb-36"
    >
      <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} />

      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16 lg:mt-12">
        {lists.map((list) => (
          <motion.div key={list.title} {...revealOnScroll}>
            <h3 className="text-xl font-semibold tracking-tight text-heading">
              {list.title}
            </h3>
            <ul className="mt-5 space-y-5">
              {list.items.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-subtle text-sm ${
                      list.done ? "text-accent" : "text-muted"
                    }`}
                  >
                    {list.done ? <FiCheck /> : <FiArrowRight />}
                  </span>
                  <div>
                    <p className="font-semibold text-heading">{item.title}</p>
                    <p className="mt-1 leading-relaxed text-body">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
