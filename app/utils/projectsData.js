import BizCopilotHome from "../../public/projects/biz-copilot/home.png";
import BizCopilotOrders from "../../public/projects/biz-copilot/orders.webp";
import BizCopilotProducts from "../../public/projects/biz-copilot/products.webp";
import EurusMindHome from "../../public/projects/eurus-mind/home.png";
import EurusMindTimeline from "../../public/projects/eurus-mind/timeline.png";
import EurusMindInsights from "../../public/projects/eurus-mind/insights.png";
import BloodHelpRequest from "../../public/projects/blood-help/request-form.png";
import BloodHelpSearch from "../../public/projects/blood-help/donor-search.png";
import BloodHelpProfile from "../../public/projects/blood-help/donor-profile.png";
import QuranReader from "../../public/projects/quran-mm/reader.png";
import QuranOfflineAudio from "../../public/projects/quran-mm/offline-audio.png";
import QuranMenu from "../../public/projects/quran-mm/menu.png";
import InfotainmentHome from "../../public/projects/infotainment/home.png";
import InfotainmentNovels from "../../public/projects/infotainment/novels.png";
import InfotainmentVideos from "../../public/projects/infotainment/videos.png";

// Kept in sync with the PROJECTS block of public/BHONE AUNG KYAW - Resume.pdf,
// in the same order.
// - Each project has three raw phone screenshots, portrait 9:19.5 (about
//   1080x2340). The first one is what mobile visitors see first.
// - Captions are short English labels, since several apps have Burmese UIs.
// - demoOnRequest marks login-only apps, which get a "Request a demo" link.
const projectsData = [
  {
    name: "Biz-Copilot",
    kind: "Freelance project for Triumsoft",
    description:
      "A 24/7 sales automation platform that helps businesses capture orders, validate payments, and sync inventory in real time.",
    stack: ["NestJS", "React Native", "PostgreSQL"],
    links: [{ label: "Product site", url: "https://bizcopilot.triumsoft.net/" }],
    demoOnRequest: true,
    screens: [
      {
        src: BizCopilotHome,
        caption: "Sales dashboard",
        alt: "Biz-Copilot home screen for a fashion shop: today’s revenue and orders, the credit balance, and pending orders waiting to be confirmed",
      },
      {
        src: BizCopilotOrders,
        caption: "Orders & payments",
        alt: "Biz-Copilot orders list with status filters, each order showing the customer, the items, the total in MMK and a Paid label",
      },
      {
        src: BizCopilotProducts,
        caption: "Products & stock",
        alt: "Biz-Copilot product catalog with photos, prices in MMK and live stock counts",
      },
    ],
  },
  {
    name: "Eurus Mind",
    kind: "Freelance project for Triumsoft",
    description:
      "A voice-first daily journal for Burmese speakers. Users talk about their day, and AI organizes it into a clear daily record.",
    stack: ["NestJS", "React Native", "PostgreSQL"],
    links: [{ label: "Triumsoft", url: "https://triumsoft.net/" }],
    demoOnRequest: true,
    screens: [
      {
        src: EurusMindHome,
        caption: "Voice-first home",
        alt: "Eurus Mind home screen: today’s mood and spending, a paused voice note to continue, and the week’s journal categories",
      },
      {
        src: EurusMindTimeline,
        caption: "AI-organized day",
        alt: "Eurus Mind timeline: the day’s spoken entries sorted into work, money, ideas and feelings, with times and amounts",
      },
      {
        src: EurusMindInsights,
        caption: "Weekly insights",
        alt: "Eurus Mind insights: a chart of how each day of the week felt and a breakdown of where the money went",
      },
    ],
  },
  {
    name: "Blood Help",
    kind: "Charity project",
    description:
      "A charity platform that quickly connects blood donors with patients in need.",
    stack: ["React", "Vite", "Supabase"],
    links: [{ label: "Live app", url: "https://blood-help-ten.vercel.app/" }],
    screens: [
      {
        src: BloodHelpRequest,
        caption: "Request blood",
        alt: "Blood Help request form in Burmese: blood type B+ selected, a contact number, Yangon General Hospital as the location, and the number of units needed",
      },
      {
        src: BloodHelpSearch,
        caption: "Live donor search",
        alt: "Blood Help live request screen in Burmese: the search widening to 70 km, and matched donors listed with a call button each",
      },
      {
        src: BloodHelpProfile,
        caption: "Donor profile",
        alt: "Blood Help donor profile in Burmese: two donations so far, the last and next eligible donation dates, and a QR code to confirm a donation",
      },
    ],
  },
  {
    name: "Quran MM",
    kind: "Charity project",
    description:
      "An offline-first Quran app with Myanmar translation and offline audio, installable as a PWA.",
    stack: [
      "React",
      "TypeScript (strict)",
      "Vite",
      "React Router",
      "vite-plugin-pwa (service worker)",
      "CSV data",
    ],
    links: [{ label: "Live app", url: "https://quran-mm.vercel.app/" }],
    screens: [
      {
        src: QuranReader,
        caption: "Myanmar translation",
        alt: "Quran MM reader: the first ayah of Surah Al-Kahf in Arabic, with its Myanmar translation and tafsir notes below",
      },
      {
        src: QuranOfflineAudio,
        caption: "Offline audio",
        alt: "Quran MM download dialog: picking surahs to save for offline audio, with the total download size",
      },
      {
        src: QuranMenu,
        caption: "Settings menu",
        alt: "Quran MM side menu: audio downloads, app theme and reading settings, and the translator’s notes",
      },
    ],
  },
  {
    name: "Infotainment Web App",
    kind: "Personal project",
    description:
      "A responsive, mobile-first web app bringing news, novels, and videos into one platform.",
    stack: [
      "React",
      "Material UI",
      "React Router",
      "TanStack Query",
      "json-server (mock REST API)",
    ],
    screens: [
      {
        src: InfotainmentHome,
        caption: "All-in-one home",
        alt: "Infotainment home screen: weather, search, popular categories, popular news and the latest news by category",
      },
      {
        src: InfotainmentNovels,
        caption: "Novel library",
        alt: "Infotainment novels tab: book covers with each title, author, a short blurb, view counts, and buttons to read or add to favorites",
      },
      {
        src: InfotainmentVideos,
        caption: "Video feed",
        alt: "Infotainment videos tab: video cards with thumbnails and play buttons, from a DIY project to a food recipe",
      },
    ],
  },
];

// Anchor id of a project's row.
export const projectId = ({ name }) =>
  `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default projectsData;
