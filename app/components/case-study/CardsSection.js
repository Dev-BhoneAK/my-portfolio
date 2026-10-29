import { motion } from "framer-motion";

import { revealOnScroll } from "@/app/utils/motion";
import { chipClassName } from "@/app/utils/styles";
import SectionHeading from "./SectionHeading";

// Literal class names, so Tailwind generates them.
const columnClassNames = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

// A section of cards: the problem's pain points, the features, the
// engineering decisions. Two columns from xs, three or four from lg. A card
// can list the tech behind it.
export default function CardsSection({
  id,
  eyebrow,
  title,
  intro,
  columns = 3,
  cards,
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mb-24 scroll-mt-12 md:mb-36"
    >
      <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} />

      <ul
        className={`mt-10 grid gap-6 xs:grid-cols-2 lg:mt-12 ${columnClassNames[columns]}`}
      >
        {cards.map(({ Icon, ...card }) => (
          <motion.li
            key={card.title}
            className="flex flex-col rounded-2xl border border-line bg-surface p-6"
            {...revealOnScroll}
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-subtle text-accent"
            >
              <Icon />
            </span>
            <h3 className="mt-4 text-lg font-semibold leading-snug text-heading">
              {card.title}
            </h3>
            <p className="mt-2 flex-1 leading-relaxed text-body">{card.text}</p>
            {card.tech && (
              <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-2">
                {card.tech.map((tech) => (
                  <li key={tech} className={chipClassName}>
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
