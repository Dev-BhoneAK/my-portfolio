import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";

import ExternalLink from "@/app/components/common/ExternalLink";
import { roleId } from "@/app/utils/careerData";
import { revealOnScroll } from "@/app/utils/motion";
import { chipClassName } from "@/app/utils/styles";
import Screenshot from "./Screenshot";

const monthFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

// "2019-10" -> "Oct 2019"
function formatMonth(value) {
  const [year, month] = value.split("-");
  return monthFormat.format(new Date(year, month - 1));
}

// Counts both the first and the last month, like LinkedIn: Jan–Jun is 6 mos.
function formatDuration(start, end) {
  const now = new Date();
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end
    ? end.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const months = (endYear - startYear) * 12 + endMonth - startMonth + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;

  return [
    years > 0 && `${years} yr${years > 1 ? "s" : ""}`,
    rest > 0 && `${rest} mo${rest > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(" ");
}

// One timeline entry. Below lg the dates sit above the title; from lg up they
// get their own column and the timeline runs between dates and content.
export default function CareerItem({ role, isLast }) {
  const {
    title,
    company,
    companyUrl,
    employmentType,
    promotedFrom,
    start,
    end,
    highlights,
    stack,
    links = [],
    shots = [],
  } = role;

  // The current role counts up to today, but the page is prerendered at build
  // time. HTML from an earlier month wouldn't match the browser's count, and
  // React would re-render the whole page, so that count waits for mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const duration = end || mounted ? formatDuration(start, end) : null;

  return (
    <motion.li
      id={roleId(role)}
      className="relative grid scroll-mt-12 pb-16 last:pb-0 lg:grid-cols-[11rem_minmax(0,1fr)] lg:pb-20"
      {...revealOnScroll}
    >
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-[5px] top-3 border-l-2 border-dotted border-marker-line lg:-bottom-2 lg:left-[calc(11rem+5px)] lg:top-4"
        ></span>
      )}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1 h-3 w-3 rounded-full lg:left-44 lg:top-2 ${
          end ? "bg-marker" : "bg-action ring-4 ring-action-glow"
        }`}
      ></span>

      <p className="pl-8 text-sm tabular-nums lg:pl-0 lg:pt-1">
        <span className="whitespace-nowrap font-medium text-label">
          <time dateTime={start}>{formatMonth(start)}</time>
          {" – "}
          {end ? <time dateTime={end}>{formatMonth(end)}</time> : "Present"}
        </span>
        {duration && (
          <span className="text-muted before:mx-1.5 before:content-['·'] lg:mt-1 lg:block lg:before:hidden">
            {duration}
          </span>
        )}
      </p>

      <div className="mt-2 pl-8 lg:mt-0 lg:pl-10">
        <h3 className="text-xl font-semibold tracking-tight text-heading">
          {title}
        </h3>
        <p className="mt-1 text-body">
          {companyUrl ? (
            <ExternalLink href={companyUrl} className="hover:text-heading">
              {company}
            </ExternalLink>
          ) : (
            company
          )}
          {employmentType && ` · ${employmentType}`}
        </p>
        {promotedFrom && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 pb-1 pt-1.5 text-xs font-medium leading-none text-success-text ring-1 ring-inset ring-success-ring">
            <FiTrendingUp aria-hidden="true" className="-mt-0.5" />
            Promoted from {promotedFrom}
          </p>
        )}

        <div
          className={`mt-6 ${
            shots.length > 0
              ? "grid gap-10 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
              : ""
          }`}
        >
          <div className="max-w-2xl">
            <ul className="space-y-3 text-body">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-marker-bullet"
                >
                  {highlight}
                </li>
              ))}
            </ul>
            <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li key={tech} className={chipClassName}>
                  {tech}
                </li>
              ))}
            </ul>
            {links.length > 0 && (
              <ul
                aria-label="Project links"
                className="mt-5 flex flex-wrap gap-x-6 gap-y-2"
              >
                {links.map(({ label, url }) => (
                  <li key={url}>
                    <ExternalLink
                      href={url}
                      className="text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      {label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {shots.length > 0 && (
            <div className="grid max-w-lg content-start gap-8 sm:max-w-none sm:grid-cols-2 xl:grid-cols-1">
              {shots.map((shot) => (
                <Screenshot key={shot.name} {...shot} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}
