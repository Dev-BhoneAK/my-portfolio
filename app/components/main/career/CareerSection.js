import { MotionConfig } from "framer-motion";

import careerData, { roleId } from "@/app/utils/careerData";
import { eyebrowClassName } from "@/app/utils/styles";
import CareerItem from "./CareerItem";

// The hero's "View my work" button scrolls to #work.
export default function CareerSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="work"
        aria-labelledby="work-heading"
        className="mb-24 scroll-mt-12 md:mb-36"
      >
        <h2 id="work-heading" className={eyebrowClassName}>
          Experience
        </h2>
        <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-heading xs:text-4xl">
          From web designer to senior team lead
        </p>

        <ol className="mt-12 lg:mt-16">
          {careerData.map((role, index) => (
            <CareerItem
              key={roleId(role)}
              role={role}
              isLast={index === careerData.length - 1}
            />
          ))}
        </ol>
      </section>
    </MotionConfig>
  );
}
