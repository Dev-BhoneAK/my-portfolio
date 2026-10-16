"use client";
import { ThemeProvider } from "next-themes";

import AnalyticsProvider from "@/app/components/analytics/AnalyticsProvider";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" storageKey="theme" defaultTheme="dark">
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </ThemeProvider>
  );
}
