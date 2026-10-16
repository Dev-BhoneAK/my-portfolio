import Script from "next/script";
import { useReportWebVitals } from "next/web-vitals";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import ConsentBanner from "@/app/components/analytics/ConsentBanner";
import {
  applyInternalParam,
  gaId,
  readConsent,
  readCookie,
  reportWebVital,
  saveConsent,
  startGoogleAnalytics,
  startTracking,
  stopGoogleAnalytics,
} from "@/app/utils/analytics";
import { regionCookie } from "@/app/utils/consent";

const ConsentContext = createContext({
  inConsentRegion: false,
  openConsentSettings: () => {},
});

// For the footer's "Cookie settings" button.
export const useConsent = () => useContext(ConsentContext);

// Google Analytics, with consent where the law requires it. Runs only when
// NEXT_PUBLIC_GA_ID is set, and only after mount: the prerendered page can't
// know the visitor's region or earlier choice.
// - Outside the consent region, it starts right away.
// - Inside it, nothing loads or is sent until the visitor accepts in the
//   banner. The choice is remembered, and "Cookie settings" in the footer
//   reopens the banner to change it.
export default function AnalyticsProvider({ children }) {
  const [inConsentRegion, setInConsentRegion] = useState(false);
  // "granted", "denied", or null while the visitor hasn't chosen.
  const [consent, setConsent] = useState(null);
  // Why the banner is open: "first-visit" or "settings". Null when closed.
  const [banner, setBanner] = useState(null);
  // The "Cookie settings" button, which gets focus back after a choice.
  const returnFocus = useRef(null);

  useEffect(() => {
    if (!gaId) return;
    applyInternalParam();
    const needsConsent = readCookie(regionCookie) === "eu";
    const saved = readConsent();
    setInConsentRegion(needsConsent);
    setConsent(needsConsent ? saved : "granted");
    if (needsConsent && !saved) setBanner("first-visit");
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    startGoogleAnalytics();
    return startTracking();
  }, [consent]);

  useReportWebVitals(reportWebVital);

  function choose(choice) {
    saveConsent(choice);
    if (choice === "denied") stopGoogleAnalytics();
    setConsent(choice);
    setBanner(null);
    returnFocus.current?.focus();
    returnFocus.current = null;
  }

  function openConsentSettings(event) {
    returnFocus.current = event.currentTarget;
    setBanner("settings");
  }

  return (
    <ConsentContext.Provider value={{ inConsentRegion, openConsentSettings }}>
      {children}
      {consent === "granted" && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
      )}
      <ConsentBanner
        open={banner !== null}
        takeFocus={banner === "settings"}
        onChoice={choose}
      />
    </ConsentContext.Provider>
  );
}
