import { motion } from "framer-motion";

import BrowserFrame from "@/app/components/common/BrowserFrame";
import ExternalLink from "@/app/components/common/ExternalLink";
import { revealOnScroll } from "@/app/utils/motion";
import SectionHeading from "./SectionHeading";

// One desktop screen: its number and title, then the window across the full
// width, where its text stays readable, with numbered markers on it and the
// matching notes below. Each note's x and y place its marker, in percent of
// the screenshot. Below lg the window is too small to read, so a link opens
// the full-size image.
function Screen({ number, title, summary, src, alt, notes }) {
  return (
    <motion.article {...revealOnScroll}>
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-semibold tabular-nums text-muted">
          {String(number).padStart(2, "0")}
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-heading xs:text-2xl">
          {title}
        </h3>
      </div>
      <p className="mt-2 max-w-xl leading-relaxed text-body">{summary}</p>

      <figure className="mt-5 rounded-2xl border border-line bg-surface p-3 xs:p-6 lg:p-10">
        <BrowserFrame
          src={src}
          alt={alt}
          sizes="(min-width: 1536px) 1264px, (min-width: 1280px) 1040px, (min-width: 1024px) 816px, 100vw"
        >
          {notes.map(({ title: noteTitle, x, y }, index) => (
            <span
              key={noteTitle}
              aria-hidden="true"
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-product pt-0.5 text-[0.625rem] font-bold text-on-product ring-2 ring-on-product xs:h-5 xs:w-5 xs:text-xs sm:h-7 sm:w-7 sm:text-sm sm:ring-[3px]"
            >
              {index + 1}
            </span>
          ))}
        </BrowserFrame>
      </figure>
      <p className="mt-3 text-sm lg:hidden">
        <ExternalLink
          href={src.src}
          className="font-medium text-accent hover:text-accent-hover"
        >
          Open full size
        </ExternalLink>
      </p>

      {/* The list already numbers the notes for screen readers. */}
      <ol className="mt-6 grid gap-x-8 gap-y-5 xs:grid-cols-2 lg:grid-cols-4">
        {notes.map((note, index) => (
          <li key={note.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-product pt-0.5 text-xs font-semibold text-on-product"
            >
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-medium leading-snug text-heading">
                {note.title}
              </span>
              <span className="mt-1 block text-sm leading-snug text-muted">
                {note.text}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </motion.article>
  );
}

// A desktop product's main screens, one after another and numbered, each
// annotated. Phone apps use flows instead, where several screens share a row.
export default function ScreensSection({ id, eyebrow, title, intro, screens }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mb-24 scroll-mt-12 md:mb-36"
    >
      <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} />

      <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-20">
        {screens.map((screen, index) => (
          <Screen key={screen.title} number={index + 1} {...screen} />
        ))}
      </div>
    </section>
  );
}
