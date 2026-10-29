import { resumeFiles, resumePath } from "@/app/utils/resume";
import { githubLink, linkedinLink, xLink } from "@/app/utils/socialLinks";

// Google Analytics 4. Set only in Vercel's production environment, so dev
// and preview builds send nothing.
export const gaId = process.env.NEXT_PUBLIC_GA_ID;

// The choice of a visitor in the consent region: "granted" or "denied".
const consentKey = "analytics-consent";

// Marks your own browsers, so a GA4 data filter can drop your visits.
const internalKey = "analytics-internal";

// Storage can be blocked (private windows, strict settings). Then the choice
// isn't remembered, and the banner asks again on the next visit.
function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Nothing to remember it in.
  }
}

export const readConsent = () => readStorage(consentKey);
export const saveConsent = (choice) => writeStorage(consentKey, choice);

export function readCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));
  return cookie?.slice(name.length + 1);
}

// Open the site once with ?internal=1 on each of your browsers (?internal=0
// undoes it). The parameter leaves the address before Google Analytics reads
// it, so it never shows up in reports.
export function applyInternalParam() {
  const url = new URL(window.location.href);
  const value = url.searchParams.get("internal");
  if (value === null) return;
  writeStorage(internalKey, value === "1" ? "1" : null);
  url.searchParams.delete("internal");
  window.history.replaceState(window.history.state, "", url);
}

// Does nothing until Google Analytics has started: in dev, before consent,
// or when an ad blocker stops it.
export function trackEvent(name, params) {
  window.gtag?.("event", name, params);
}

export function startGoogleAnalytics() {
  // Consent given again on the same page, after being withdrawn.
  if (window.gtag) {
    window[`ga-disable-${gaId}`] = false;
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }

  window.dataLayer = window.dataLayer || [];
  // gtag.js reads the arguments object itself, not an array of them.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  // The site shows no ads, so the ad signals are always off.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag(
    "config",
    gaId,
    readStorage(internalKey) === "1" ? { traffic_type: "internal" } : {},
  );
  for (const [name, params] of pendingVitals.splice(0)) {
    trackEvent(name, params);
  }
}

// Consent withdrawn: stop sending and remove Google Analytics' cookies, which
// it sets on the bare domain.
export function stopGoogleAnalytics() {
  if (!window.gtag) return;
  window[`ga-disable-${gaId}`] = true;
  window.gtag("consent", "update", { analytics_storage: "denied" });
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const entry of document.cookie.split("; ")) {
    const name = entry.split("=")[0];
    if (!name.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

// Profile links, by the href the hero and footer give them.
const profiles = {
  [githubLink.href]: "github",
  [linkedinLink.href]: "linkedin",
  [xLink.href]: "x",
};

// The hero's direct links to one language's resume, by their encoded path.
const resumeLanguages = Object.fromEntries(
  Object.entries(resumeFiles).map(([language, file]) => [
    encodeURI(file),
    language,
  ]),
);

// The part of the page an element is in: the hero (the header, which on a
// case study holds its cover), a section's id (work, projects, a case
// study's problem…) or the footer.
function sectionOf(element) {
  const area = element.closest("header, section[id], footer");
  if (!area) return undefined;
  if (area.tagName === "HEADER") return "hero";
  if (area.tagName === "FOOTER") return "footer";
  return area.id;
}

// What a link says: its aria-label, or its text without screen-reader-only
// parts like "(opens in a new tab)". Text from separate elements, like a
// role's title and company, gets a space between. GA4 keeps 100 characters.
function labelOf(link) {
  const label = link.getAttribute("aria-label");
  if (label) return label;
  const parts = [];
  const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const text = walker.currentNode;
    if (!text.parentElement.closest(".sr-only")) parts.push(text.data.trim());
  }
  return parts.filter(Boolean).join(" ").slice(0, 100);
}

// The event for a click on a link, named by what the link does. The href and
// where the link sits (section, and the role or project around it) are enough
// for every link on the page, so components carry no tracking code.
function eventForLink(link) {
  const href = link.getAttribute("href");
  const section = sectionOf(link);
  const entry_id = link.closest("li[id]")?.id;

  if (href.startsWith("mailto:")) return ["email_click", { section, entry_id }];
  if (href === resumePath) return ["resume_download", { section }];
  if (resumeLanguages[link.pathname]) {
    return [
      "resume_download",
      { section, language: resumeLanguages[link.pathname] },
    ];
  }
  if (href.startsWith("#")) {
    return [
      "nav_click",
      { section, target: href.slice(1), link_text: labelOf(link) },
    ];
  }
  if (profiles[href]) {
    return ["social_click", { section, network: profiles[href] }];
  }
  if (link.origin !== window.location.origin) {
    return [
      "outbound_click",
      { section, entry_id, link_text: labelOf(link), link_url: link.href },
    ];
  }
  // Another page of the site: a case study, or back home.
  const caseStudy = link.pathname.match(/^\/projects\/([^/]+)/)?.[1];
  if (caseStudy) {
    return ["case_study_click", { section, entry_id, case_study: caseStudy }];
  }
  return [
    "nav_click",
    {
      section,
      target: link.hash.slice(1) || link.pathname,
      link_text: labelOf(link),
    },
  ];
}

// Views count once per page load, even if consent is withdrawn and given
// again.
const seen = new Set();

function trackOnce(name, params, key) {
  if (seen.has(key)) return;
  seen.add(key);
  trackEvent(name, params);
}

// Link clicks, sections and entries. Returns a function that stops it all.
// - A section counts as seen when its heading, or the footer, is half on
//   screen.
// - A role or project counts when it reaches the band across the middle of
//   the screen, so a tall one still counts while its top is out of view.
export function startTracking() {
  // Capture phase, so a click counts even if a handler stops it.
  const onClick = (event) => {
    const link = event.target.closest?.("a[href]");
    const linkEvent = link && eventForLink(link);
    if (linkEvent) trackEvent(...linkEvent);
  };
  document.addEventListener("click", onClick, true);

  const sectionObserver = new IntersectionObserver(
    (records) => {
      for (const { isIntersecting, target } of records) {
        if (!isIntersecting) continue;
        const section =
          target.tagName === "FOOTER"
            ? "footer"
            : target.id.replace(/-heading$/, "");
        trackOnce("section_view", { section }, `section:${section}`);
      }
    },
    { threshold: 0.5 },
  );
  document
    .querySelectorAll("section[id] h2[id$='-heading'], footer")
    .forEach((element) => sectionObserver.observe(element));

  const entryObserver = new IntersectionObserver(
    (records) => {
      for (const { isIntersecting, target } of records) {
        if (!isIntersecting) continue;
        trackOnce(
          "entry_view",
          { section: sectionOf(target), entry_id: target.id },
          `entry:${target.id}`,
        );
      }
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );
  document
    .querySelectorAll("#work li[id], #projects li[id]")
    .forEach((element) => entryObserver.observe(element));

  return () => {
    document.removeEventListener("click", onClick, true);
    sectionObserver.disconnect();
    entryObserver.disconnect();
  };
}

// Web vitals from real visitors, the way GA4 suggests: the value is the
// change since the last report, with CLS scaled up to a whole number.
// - FCP is there because Chrome reports no LCP for this page: every hero
//   element fades in from opacity 0, which doesn't count as content.
// - FCP comes in before Google Analytics starts, so reports wait in
//   pendingVitals until it does. Without consent they're never sent.
const pendingVitals = [];

export function reportWebVital({ name, id, value, delta, rating }) {
  if (!["FCP", "LCP", "CLS", "INP"].includes(name)) return;
  const params = {
    value: Math.round(name === "CLS" ? delta * 1000 : delta),
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
    metric_rating: rating,
  };
  if (window.gtag) trackEvent(name, params);
  else pendingVitals.push([name, params]);
}
