import BizCopilotHome from "../../public/projects/biz-copilot/home.png";
import BizCopilotOrders from "../../public/projects/biz-copilot/orders.webp";
import BizCopilotProducts from "../../public/projects/biz-copilot/products.webp";
import EurusMindHome from "../../public/projects/eurus-mind/home.png";
import EurusMindTimeline from "../../public/projects/eurus-mind/timeline.png";
import EurusMindInsights from "../../public/projects/eurus-mind/insights.png";
import AwaHome from "../../public/projects/awa/home.png";
import BloodHelpRequest from "../../public/projects/blood-help/06-requester-form-filled.png";
import BloodHelpSearch from "../../public/projects/blood-help/10-two-donors-scrolled.png";
import BloodHelpProfile from "../../public/projects/blood-help/15-donor-profile-screen.png";
import QuranReader from "../../public/projects/quran-mm/reader.png";
import QuranOfflineAudio from "../../public/projects/quran-mm/offline-audio.png";
import QuranMenu from "../../public/projects/quran-mm/menu.png";

// Kept in sync with the PROJECTS block of public/BHONE AUNG KYAW - Resume.pdf,
// but not its order: the resume lists AWA, still in development, last, and
// here it sits third.
// - Each project has three raw phone screenshots, portrait 9:19.5 (about
//   1080x2340). The first one is what mobile visitors see first.
// - A desktop project (device: "desktop") has one raw desktop screenshot
//   instead, 16:10 at 2x (2880x1800), shown in a browser window.
// - Captions are short English labels, since several apps have Burmese UIs.
// - status marks unfinished work, with a pill beside the name.
// - demoOnRequest marks login-only apps, which get a "Request a demo" link.
// - caseStudy is the slug of the project's case study, in
//   app/utils/caseStudies, which its row links to first.
const projectsData = [
    {
        name: "Biz-Copilot",
        kind: "Freelance project",
        description:
            "A 24/7 sales automation platform that helps businesses capture orders, validate payments, and sync inventory in real time.",
        stack: ["NestJS", "React Native", "PostgreSQL"],
        links: [
            { label: "Product site", url: "https://bizcopilot.triumsoft.net/" },
        ],
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
        kind: "Freelance project",
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
        name: "AWA",
        kind: "Personal project",
        status: "In development",
        description:
            "An AI workspace assistant for organizations. Staff ask about their documents and meeting recordings, and every answer comes only from files they’re allowed to open, with its sources.",
        stack: [
            "React",
            "TypeScript",
            "AWS (ECS, S3, SQS, Cognito)",
            "PostgreSQL + pgvector",
            "Gemini",
        ],
        caseStudy: "awa",
        device: "desktop",
        screens: [
            {
                src: AwaHome,
                caption: "Ask about your files",
                alt: "AWA home screen: “What would you like to ask today?” above a question box searching all folders, three suggested questions, and recent chats in the sidebar",
            },
        ],
    },
    {
        name: "Blood Help",
        kind: "Charity project",
        description:
            "A charity platform that quickly connects blood donors with patients in need.",
        stack: ["React", "Vite", "Supabase"],
        caseStudy: "blood-help",
        // No live link: a test request would alert real donors nearby.
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
];

// Anchor id of a project's row.
export const projectId = ({ name }) =>
    `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default projectsData;
