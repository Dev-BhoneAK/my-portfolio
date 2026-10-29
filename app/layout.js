import "./globals.css";
import { League_Spartan } from "next/font/google";

import Providers from "@/app/components/Providers";
import { siteUrl } from "@/app/utils/site";
const leagueSpartan = League_Spartan({ subsets: ["latin"] });

const description =
  "10+ years building web and mobile products end to end — REST APIs, admin dashboards and front ends — and leading the teams that ship them.";

// Link previews (LinkedIn, X, chat apps) are built from these tags. The card
// image is app/opengraph-image.jsx.
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bhone Aung Kyaw",
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Bhone Aung Kyaw",
    title: "Bhone Aung Kyaw – Senior Full-stack Engineer",
    description,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth motion-reduce:scroll-auto"
      suppressHydrationWarning
    >
      <body
        className={`container mx-auto bg-page text-body ${leagueSpartan.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
