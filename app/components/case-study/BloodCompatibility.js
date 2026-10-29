import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

import { revealOnScroll } from "@/app/utils/motion";
import { eyebrowClassName } from "@/app/utils/styles";
import { useCheckedRadioRef } from "@/app/utils/useCheckedRadioRef";
import SectionHeading from "./SectionHeading";

// From the universal donor to the universal recipient.
const bloodTypes = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

// Who can give to whom: a donor's type, then the request types it can go to.
// The same directional map as the app's own (src/blood.ts in its repo).
const givesTo = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

// "O-" -> "O−", with a real minus sign.
const formatType = (type) => type.replace("-", "−");

// Blood Help's matching, to try: pick the blood type a request needs and the
// donor types that get the alert light up. Beside it, who can donate at all.
// The choice is a radio group, so arrow keys move through it.
export default function BloodCompatibility({
  id,
  eyebrow,
  title,
  intro,
  rules,
}) {
  const [needed, setNeeded] = useState("B+");
  const donors = bloodTypes.filter((donor) => givesTo[donor].includes(needed));
  const checkedRef = useCheckedRadioRef();

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
            Who can donate
          </h3>
          <ul className="mt-4 space-y-4">
            {rules.map(({ Icon, ...rule }) => (
              <li key={rule.title} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-accent"
                >
                  <Icon />
                </span>
                <div>
                  <p className="font-medium text-heading">{rule.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{rule.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <motion.div {...revealOnScroll}>
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-xl shadow-card xs:p-8">
            <fieldset>
              <legend className={eyebrowClassName}>
                Patient’s blood type
              </legend>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {bloodTypes.map((type) => {
                  const checked = type === needed;
                  return (
                    <label key={type}>
                      <input
                        ref={checked ? checkedRef : undefined}
                        type="radio"
                        name="blood-type-needed"
                        value={type}
                        checked={checked}
                        onChange={() => setNeeded(type)}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex h-11 cursor-pointer items-center justify-center rounded-full border pt-1 font-semibold transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus ${
                          checked
                            ? "border-product bg-product text-on-product"
                            : "border-line bg-subtle text-label hover:border-line-hover hover:text-heading"
                        }`}
                      >
                        {formatType(type)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p
              id={`${id}-alerted`}
              className={`mt-7 border-t border-line pt-7 ${eyebrowClassName}`}
            >
              Donors who get the alert
            </p>
            <ul
              aria-labelledby={`${id}-alerted`}
              className="mt-4 grid grid-cols-4 gap-2"
            >
              {bloodTypes.map((donor) =>
                donors.includes(donor) ? (
                  <li
                    key={donor}
                    className="flex h-10 items-center justify-center gap-1 rounded-full bg-product-soft pt-1 font-semibold text-product-text"
                  >
                    <FiCheck aria-hidden="true" className="-mt-1 shrink-0" />
                    {formatType(donor)}
                    <span className="sr-only">, gets the alert</span>
                  </li>
                ) : (
                  <li
                    key={donor}
                    className="flex h-10 items-center justify-center rounded-full border border-dashed border-line-strong pt-1 font-medium text-muted"
                  >
                    {formatType(donor)}
                    <span className="sr-only">, no alert</span>
                  </li>
                ),
              )}
            </ul>
            <p aria-live="polite" className="mt-5 text-body">
              {donors.length} of 8 donor blood types can give to{" "}
              {formatType(needed)}.
            </p>
          </div>
          <p className="mt-3 text-center text-sm text-muted">
            Pick a blood type to see who gets the alert.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
