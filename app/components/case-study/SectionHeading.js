import { eyebrowClassName } from "@/app/utils/styles";

// How every case-study section opens, in the type of the home page's
// sections: the eyebrow (the heading, as it is there), the statement, then an
// optional intro.
export default function SectionHeading({ id, eyebrow, title, intro }) {
  return (
    <>
      <h2 id={`${id}-heading`} className={eyebrowClassName}>
        {eyebrow}
      </h2>
      <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-heading [text-wrap:balance] xs:text-4xl">
        {title}
      </p>
      {intro && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body [text-wrap:pretty]">
          {intro}
        </p>
      )}
    </>
  );
}
