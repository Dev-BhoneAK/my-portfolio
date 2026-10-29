import { FiArrowLeft, FiGithub } from "react-icons/fi";

import BrowserFrame from "@/app/components/common/BrowserFrame";
import ExternalLink from "@/app/components/common/ExternalLink";
import PhoneFrame from "@/app/components/common/PhoneFrame";
import StatusPill from "@/app/components/common/StatusPill";
import { revealClassName, revealDelay } from "@/app/utils/motion";
import { eyebrowClassName, focusRing } from "@/app/utils/styles";

// The middle phone stands in front and higher; the other two tuck behind it.
const phonePlacements = [
  "relative -mr-[6%] w-[31%]",
  "relative z-10 mb-[8%] w-[37%]",
  "relative -ml-[6%] w-[31%]",
];

// The cover's first link is a button, like the hero's "Download resume"; a
// second one is a text link beside it.
const buttonLinkClassName =
  "justify-center rounded-full border border-line-strong px-7 pb-3 pt-3.5 font-semibold text-heading hover:border-highlight hover:text-highlight";
const textLinkClassName =
  "justify-center font-medium text-accent hover:text-accent-hover";

// A case study's first screen: what it is, its status or numbers and its
// links, then the product, then a row of facts like the hero's. A phone app
// shows three phones beside the text. A desktop app (device: "desktop") needs
// the width, so its window spans the page below the text, which splits into
// two columns from lg. Like the hero, it animates in CSS so it plays on first
// paint.
export default function Cover({ caseStudy, backHref }) {
  const {
    name,
    kind,
    tagline,
    summary,
    status,
    stats = [],
    liveUrl,
    sourceUrl,
    device,
    coverScreen,
    coverScreens,
    facts,
  } = caseStudy;

  const heading = (
    <>
      <a
        href={backHref}
        style={revealDelay(0)}
        className={`${revealClassName} group inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors hover:text-heading ${focusRing}`}
      >
        <FiArrowLeft
          aria-hidden="true"
          className="-mt-0.5 transition-transform group-hover:-translate-x-0.5"
        />
        All projects
      </a>
      <p
        style={revealDelay(1)}
        className={`${revealClassName} mt-8 ${eyebrowClassName}`}
      >
        Case study · {kind}
      </p>
      <h1
        style={revealDelay(2)}
        className={`${revealClassName} mt-4 text-[2.5rem] font-semibold leading-none tracking-tight text-heading 2xs:text-5xl xs:text-6xl xl:text-7xl`}
      >
        {name}
      </h1>
      <p
        style={revealDelay(3)}
        className={`${revealClassName} mt-4 text-2xl font-medium text-accent [text-wrap:balance] xs:text-3xl`}
      >
        {tagline}
      </p>
    </>
  );

  const details = (
    <>
      <p
        style={revealDelay(4)}
        className={`${revealClassName} max-w-xl text-lg leading-relaxed text-body [text-wrap:pretty]`}
      >
        {summary}
      </p>

      {status && (
        <div
          style={revealDelay(5)}
          className={`${revealClassName} mt-6 flex flex-wrap items-center gap-x-4 gap-y-3`}
        >
          <StatusPill>{status.label}</StatusPill>
          <p className="text-sm text-muted">{status.note}</p>
        </div>
      )}

      {stats.length > 0 && (
        <dl
          style={revealDelay(5)}
          className={`${revealClassName} mt-8 flex flex-wrap gap-x-12 gap-y-6`}
        >
          {stats.map(({ value, label }) => (
            // The number reads first; the term stays first in the markup.
            <div key={label} className="flex flex-col-reverse">
              <dt className="mt-2 text-muted">{label}</dt>
              <dd className="text-4xl font-semibold leading-none tracking-tight tabular-nums text-heading xs:text-5xl">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {(liveUrl || sourceUrl) && (
        <div
          style={revealDelay(6)}
          className={`${revealClassName} mt-9 flex flex-col gap-4 xs:flex-row xs:flex-wrap xs:items-center xs:gap-x-7`}
        >
          {liveUrl && (
            <ExternalLink href={liveUrl} className={buttonLinkClassName}>
              Open the live app
            </ExternalLink>
          )}
          {sourceUrl && (
            <ExternalLink
              href={sourceUrl}
              className={liveUrl ? textLinkClassName : buttonLinkClassName}
            >
              <FiGithub aria-hidden="true" className="-mt-0.5 mr-1" />
              View the source
            </ExternalLink>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      {device === "desktop" ? (
        <div className="py-12">
          <div className="grid lg:grid-cols-2 lg:items-end lg:gap-16 xl:gap-20">
            <div>{heading}</div>
            <div className="mt-5 lg:mt-0">{details}</div>
          </div>
          <div
            style={revealDelay(7)}
            className={`${revealClassName} product-stage mt-12 rounded-2xl border border-line p-3 xs:p-6 lg:p-10`}
          >
            <BrowserFrame
              src={coverScreen.src}
              alt={coverScreen.alt}
              priority
              sizes="(min-width: 1536px) 1264px, (min-width: 1280px) 1040px, (min-width: 1024px) 816px, 100vw"
            />
          </div>
        </div>
      ) : (
        <div className="grid items-center gap-12 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-20">
          <div>
            {heading}
            <div className="mt-5">{details}</div>
          </div>

          <div
            style={revealDelay(7)}
            className={`${revealClassName} product-stage flex items-end justify-center overflow-hidden rounded-2xl border border-line px-3 pb-6 pt-8 xs:px-8 xs:pb-10 xs:pt-14`}
          >
            {coverScreens.map(({ src, alt }, index) => (
              <div key={alt} className={phonePlacements[index]}>
                <PhoneFrame
                  src={src}
                  alt={alt}
                  priority
                  sizes="(min-width: 1536px) 250px, (min-width: 1024px) 205px, (min-width: 768px) 275px, 37vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <dl
        style={revealDelay(8)}
        className={`${revealClassName} mb-24 border-t border-line xs:grid xs:grid-cols-2 xs:gap-6 xs:pt-6 md:mb-36 lg:grid-cols-4`}
      >
        {facts.map(({ label, value, detail }) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-6 border-b border-line py-3 xs:block xs:border-0 xs:py-0"
          >
            <dt className="shrink-0 text-sm text-muted">{label}</dt>
            <dd className="text-right xs:mt-1.5 xs:text-left">
              <span className="block font-medium text-heading">{value}</span>
              <span className="block text-sm text-muted">{detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
