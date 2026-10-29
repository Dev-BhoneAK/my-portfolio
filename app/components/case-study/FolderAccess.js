import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiFolder, FiLock } from "react-icons/fi";

import { revealOnScroll } from "@/app/utils/motion";
import { eyebrowClassName } from "@/app/utils/styles";
import { useCheckedRadioRef } from "@/app/utils/useCheckedRadioRef";
import SectionHeading from "./SectionHeading";

// AWA's access rule, to try: pick a person at an example organization and the
// folders their questions search light up, each with the group or admin level
// that grants it. Beside it, how access works. The choice is a radio group,
// so arrow keys move through it.
export default function FolderAccess({
  id,
  eyebrow,
  title,
  intro,
  rules,
  people,
  folders,
  initialPerson,
}) {
  const [personId, setPersonId] = useState(initialPerson);
  const person = people.find((candidate) => candidate.id === personId);
  const searched = folders.filter((folder) => person.access[folder.id]);
  const notSearched = folders.length - searched.length;
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
            How access works
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
              <legend className={eyebrowClassName}>Asking as</legend>
              <div className="mt-4 grid gap-2 xs:grid-cols-2">
                {people.map(({ id: optionId, name, initials, role }) => {
                  const checked = optionId === personId;
                  return (
                    <label key={optionId}>
                      <input
                        ref={checked ? checkedRef : undefined}
                        type="radio"
                        name={`${id}-person`}
                        value={optionId}
                        checked={checked}
                        onChange={() => setPersonId(optionId)}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex min-h-[3.75rem] cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus ${
                          checked
                            ? "border-product bg-product-soft text-heading"
                            : "border-line bg-subtle text-label hover:border-line-hover hover:text-heading"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full pt-0.5 text-xs font-bold ${
                            checked
                              ? "bg-product text-on-product"
                              : "border border-line"
                          }`}
                        >
                          {initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold leading-tight">
                            {name}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-muted">
                            {role}
                          </span>
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p
              id={`${id}-folders`}
              className={`mt-7 border-t border-line pt-7 ${eyebrowClassName}`}
            >
              Folders their questions search
            </p>
            <ul aria-labelledby={`${id}-folders`} className="mt-4 space-y-2">
              {folders.map((folder) => {
                const via = person.access[folder.id];
                return (
                  <li
                    key={folder.id}
                    className={`flex items-start gap-3 rounded-xl border px-4 pb-2 pt-2.5 ${
                      via
                        ? "border-transparent bg-product-soft"
                        : "border-dashed border-line-strong text-muted"
                    }`}
                  >
                    <FiFolder
                      aria-hidden="true"
                      className={`mt-0.5 shrink-0 ${via ? "text-product-text" : ""}`}
                    />
                    <span className="min-w-0 flex-1 xs:flex xs:items-baseline xs:justify-between xs:gap-4">
                      <span className="block">
                        <span
                          className={
                            via ? "font-semibold text-heading" : "font-medium"
                          }
                        >
                          {folder.name}
                        </span>
                        <span className="text-sm text-muted">
                          {" "}
                          · {folder.scope}
                        </span>
                      </span>
                      {via ? (
                        <span className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-product-text xs:mt-0 xs:shrink-0">
                          <FiCheck aria-hidden="true" className="-mt-0.5" />
                          via {via}
                        </span>
                      ) : (
                        <span className="mt-0.5 flex items-center gap-1.5 text-sm xs:mt-0 xs:shrink-0">
                          <FiLock aria-hidden="true" className="-mt-0.5" />
                          Not searched
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p aria-live="polite" className="mt-5 text-body">
              {notSearched === 0
                ? `${person.name}’s questions can search all ${folders.length} folders.`
                : `${person.name}’s questions search ${searched.length} of ${folders.length} folders. The other ${notSearched} never reach Gemini.`}
            </p>
          </div>
          <p className="mt-3 text-center text-sm text-muted">
            Pick a person to see what their questions can reach.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
