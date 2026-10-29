import {
    FiAward,
    FiBell,
    FiBellOff,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiMaximize,
    FiShare2,
    FiShield,
    FiSmartphone,
    FiTarget,
    FiUnlock,
    FiUserCheck,
    FiUsers,
    FiZap,
} from "react-icons/fi";

import PhoneEntry from "../../../public/projects/blood-help/01-phone-entry.png";
import OtpVerification from "../../../public/projects/blood-help/02-otp-verification.png";
import IntentChoice from "../../../public/projects/blood-help/03-intent-choice.png";
import DonorSetup from "../../../public/projects/blood-help/04-donor-setup-filled.png";
import DonorThankYou from "../../../public/projects/blood-help/05-donor-thankyou.png";
import RequestForm from "../../../public/projects/blood-help/06-requester-form-filled.png";
import LocationDialog from "../../../public/projects/blood-help/07-requester-location-dialog.png";
import NoDonorsYet from "../../../public/projects/blood-help/08-no-donors.png";
import DonorsPending from "../../../public/projects/blood-help/09-30km-three-donors-pending.png";
import DonorStatuses from "../../../public/projects/blood-help/10-two-donors-scrolled.png";
import OutcomeSheet from "../../../public/projects/blood-help/11-outcome-sheet-mg-bhone-cancel-copy.png";
import ResolveSheet from "../../../public/projects/blood-help/12-resolve-sheet.png";
import CameraPermission from "../../../public/projects/blood-help/13-requester-camera-permission-dialog.png";
import QrScanner from "../../../public/projects/blood-help/14-requester-qr-scanner.png";
import DonorProfile from "../../../public/projects/blood-help/15-donor-profile-screen.png";
import DonorCongrats from "../../../public/projects/blood-help/16-donor-congrats.png";
import Leaderboard from "../../../public/projects/blood-help/17-leaderboard.png";

const leaderboard = {
    src: Leaderboard,
    alt: "Leaderboard in Burmese: 13 donations so far, with Aye Myint, Zaw Htike and Bhone as the top donors",
};
const requestForm = {
    src: RequestForm,
    alt: "Request form in Burmese: blood type B+, a contact number, Yangon General Hospital as the location, one unit and the urgency",
};
const donorStatuses = {
    src: DonorStatuses,
    alt: "Donor list in Burmese with the search widened to 70 km: Mg Bhone marked as confirmed, Zaw Htike as unreachable",
};

// The Blood Help case study, at /projects/blood-help. The name, tagline and
// summary are in index.js.
// - The screenshots are raw phone captures in public/projects/blood-help,
//   like the projects'. The app is in Burmese, so every screen gets an
//   English title.
// - sections render in this order; each type has its component in
//   CaseStudyPage.
const bloodHelp = {
    // Sets Blood Help's red, from globals.css.
    className: "case-blood-help",
    stats: [
        { value: "500+", label: "registered donors" },
        { value: "200+", label: "requests fulfilled" },
    ],
    // No live link: a test request would alert real donors nearby.
    sourceUrl: "https://github.com/heinthaw-dev/blood-help",
    coverScreens: [requestForm, donorStatuses, leaderboard],
    facts: [
        {
            label: "Role",
            value: "Design, architecture & development",
            detail: "Solo project",
        },
        { label: "Timeline", value: "June 2026", detail: "Free, no ads" },
        {
            label: "Platform",
            value: "Mobile web app (PWA)",
            detail: "Burmese and English",
        },
        {
            label: "Stack",
            value: "React, TypeScript, Supabase",
            detail: "PostGIS, Firebase push",
        },
    ],
    sections: [
        {
            type: "cards",
            id: "problem",
            eyebrow: "The problem",
            title: "When a patient needs blood, the family has to find it",
            intro: "Hospitals in Myanmar often run short of blood, so families search for donors themselves. They call everyone they know and post in Facebook groups, and the search can take hours while the patient waits.",
            columns: 4,
            cards: [
                {
                    Icon: FiClock,
                    title: "Hours lost",
                    text: "Phone calls, group chats and word of mouth, while the patient waits.",
                },
                {
                    Icon: FiUsers,
                    title: "Wrong blood types",
                    text: "No one can tell who nearby is compatible, so many calls go to people who can’t donate.",
                },
                {
                    Icon: FiBellOff,
                    title: "Donors hear too late",
                    text: "A willing donor may be 2 km away and never see the post in time.",
                },
                {
                    Icon: FiUnlock,
                    title: "Numbers in public",
                    text: "Phone numbers get copied across public groups, a real privacy and safety risk.",
                },
            ],
        },
        {
            type: "cards",
            id: "solution",
            eyebrow: "The solution",
            title: "One request reaches the right donors in minutes",
            intro: "The requester enters the blood type, units and hospital once. Blood Help finds donors nearby who can actually give, alerts them right away, and keeps everyone’s details private until they choose to connect.",
            cards: [
                {
                    Icon: FiBell,
                    title: "Real-time alerts",
                    text: "Compatible donors nearby get a push notification and an in-app alert as soon as a request goes up.",
                },
                {
                    Icon: FiTarget,
                    title: "Smart search",
                    text: "Donors are ranked by distance, and the search widens on its own when no one is close.",
                },
                {
                    Icon: FiAward,
                    title: "Donor appreciation",
                    text: "Every confirmed donation goes on the donor’s record, and a leaderboard thanks the people who keep showing up.",
                },
                {
                    Icon: FiShield,
                    title: "Private by default",
                    text: "Locations are rounded to about 1 km, and a donor’s number is shared only if they allow it.",
                },
                {
                    Icon: FiUsers,
                    title: "One account, two roles",
                    text: "The same account can ask for blood today and donate next month. There are no separate donor and patient accounts.",
                },
                {
                    Icon: FiSmartphone,
                    title: "Burmese first, no app store",
                    text: "Every screen is in Burmese and English, and the app installs straight from the browser.",
                },
            ],
        },
        {
            type: "bloodCompatibility",
            id: "matching",
            eyebrow: "Matching",
            title: "Only donors who can give get the alert",
            intro: "Blood compatibility only works one way: O− can go to anyone, while AB+ can only go to AB+. Blood Help checks it before sending anything, so donors never get a request they can’t answer.",
            rules: [
                {
                    Icon: FiUserCheck,
                    title: "18 to 65 years old",
                    text: "The minimum age is checked at sign-up.",
                },
                {
                    Icon: FiCalendar,
                    title: "Once every 4 months",
                    text: "Each profile shows the next date a donor can give.",
                },
            ],
        },
        {
            type: "flows",
            id: "how-it-works",
            eyebrow: "How it works",
            title: "From a request to a confirmed donation",
            intro: "Everyone signs in the same way, then chooses to ask for blood or to donate. These are the app’s real screens, in Burmese, with English captions.",
            loop: [
                "Post a request",
                "Compatible donors alerted",
                "Donor calls back",
                "Blood donated",
                "QR code confirms it",
                "Donor thanked",
            ],
            chapters: [
                {
                    title: "Getting started",
                    flows: [
                        {
                            title: "Sign in",
                            role: "Everyone",
                            summary:
                                "A phone number and a one-time code. No password, no email.",
                            steps: [
                                {
                                    src: PhoneEntry,
                                    alt: "Sign-in screen in Burmese: a +95 country code and a phone number field, with a button to send the code",
                                    title: "Enter your phone number",
                                    text: "+95 is filled in for Myanmar.",
                                },
                                {
                                    src: OtpVerification,
                                    alt: "Code screen in Burmese: six digits filled in, links to change the number or resend the code, and a confirm button",
                                    title: "Type the 6-digit code",
                                    text: "It confirms the number is yours.",
                                },
                                {
                                    src: IntentChoice,
                                    alt: "Choice screen in Burmese: I need blood, or I want to donate",
                                    title: "Choose what you came for",
                                    text: "I need blood, or I want to donate.",
                                },
                            ],
                        },
                        {
                            title: "Become a donor",
                            role: "Donor",
                            summary:
                                "Set up once, then get alerted when someone nearby needs your blood type.",
                            steps: [
                                {
                                    src: DonorSetup,
                                    alt: "Donor profile form in Burmese: name, blood type O+ selected, a contact number, and a switch to allow direct calls",
                                    title: "Fill in the donor profile",
                                    text: "Name, blood type, and whether requesters may call directly.",
                                },
                                {
                                    src: DonorThankYou,
                                    alt: "Thank-you screen in Burmese for a new A+ donor, confirming that alerts are on",
                                    title: "Turn on alerts",
                                    text: "Asked on the thank-you screen, then confirmed.",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "Finding blood",
                    flows: [
                        {
                            title: "Ask for blood",
                            role: "Requester",
                            summary:
                                "One short form, then the search starts on its own.",
                            steps: [
                                {
                                    ...requestForm,
                                    title: "Post a request",
                                    text: "Blood type, phone, hospital, units and urgency.",
                                },
                                {
                                    src: LocationDialog,
                                    alt: "Dialog in Burmese explaining why the app needs the location, with continue and not now buttons",
                                    title: "Share your location",
                                    text: "Explained first, then asked once.",
                                },
                                {
                                    src: NoDonorsYet,
                                    alt: "Live request screen in Burmese: searching within 20 km, three donors reached, and a note that responders will appear here",
                                    title: "Watch the search",
                                    text: "Compatible donors nearby are alerted first.",
                                },
                            ],
                        },
                        {
                            title: "Reach donors",
                            role: "Requester",
                            summary:
                                "Call donors straight from the list and note how each call went.",
                            steps: [
                                {
                                    src: DonorsPending,
                                    alt: "Donor list in Burmese with the search widened to 30 km: each donor’s blood type, distance, phone number and a call button",
                                    title: "Call a donor",
                                    text: "As the search widens, more donors appear.",
                                },
                                {
                                    src: OutcomeSheet,
                                    alt: "Sheet in Burmese for recording a call with Mg Bhone: confirmed and coming, couldn’t reach, or can no longer donate",
                                    title: "Record the outcome",
                                    text: "Coming, couldn’t reach, or can’t donate.",
                                },
                                {
                                    ...donorStatuses,
                                    title: "Keep track",
                                    text: "Each donor’s status stays on the list.",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "Closing the loop",
                    flows: [
                        {
                            title: "Confirm the donation",
                            role: "Requester",
                            summary:
                                "Once the blood arrives, close the request and confirm who gave it.",
                            steps: [
                                {
                                    src: ResolveSheet,
                                    alt: "Sheet in Burmese asking where the blood came from: a donor in this app, or somewhere else",
                                    title: "Say where it came from",
                                    text: "A donor in the app, or somewhere else.",
                                },
                                {
                                    src: CameraPermission,
                                    alt: "Dialog in Burmese explaining that the app needs the camera to scan a QR code, with continue and not now buttons",
                                    title: "Allow the camera",
                                    text: "Explained first, like the location.",
                                },
                                {
                                    src: QrScanner,
                                    alt: "QR scanner in Burmese, with a field for the donor’s 5-character code instead",
                                    title: "Scan the donor’s QR code",
                                    text: "Or type their 5-character code.",
                                },
                            ],
                        },
                        {
                            title: "Thank the donor",
                            role: "Donor",
                            summary:
                                "A donation counts only when the requester confirms it in person.",
                            steps: [
                                {
                                    src: DonorProfile,
                                    alt: "Donor profile in Burmese: two donations, the last and next eligible dates, and the donor’s QR code with the code W5TJW",
                                    title: "Show your QR code",
                                    text: "Every donor has one in their profile.",
                                },
                                {
                                    src: DonorCongrats,
                                    alt: "Thank-you screen in Burmese after a confirmed donation, noting it is the donor’s first",
                                    title: "Get thanked",
                                    text: "The donation goes on their record.",
                                },
                                {
                                    ...leaderboard,
                                    title: "Climb the leaderboard",
                                    text: "Ranked by confirmed donations.",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "cards",
            id: "engineering",
            eyebrow: "Engineering",
            title: "The decisions behind it",
            intro: "I designed the data model, the matching and the privacy rules together with the screens. Six decisions shaped how it works.",
            cards: [
                {
                    Icon: FiShare2,
                    title: "One compatibility map",
                    text: "A single directional ABO/Rh table decides which donors see which request. An O− donor sees every request; an AB+ donor sees only AB+.",
                    tech: ["TypeScript", "PostgreSQL"],
                },
                {
                    Icon: FiMapPin,
                    title: "Distance matching in the database",
                    text: "PostGIS ranks donors by distance inside Postgres functions, and widens the search up to 70 km when no one is near.",
                    tech: ["PostGIS", "SQL functions"],
                },
                {
                    Icon: FiShield,
                    title: "Private by design",
                    text: "Locations are rounded to a 1 km grid before they’re stored, nothing tracks in the background, and row-level security limits what each user can read.",
                    tech: ["Row Level Security", "Geolocation API"],
                },
                {
                    Icon: FiZap,
                    title: "Live, without refreshing",
                    text: "Supabase Realtime fills the requester’s donor list as people respond, and Firebase Cloud Messaging reaches donors even when the app is closed.",
                    tech: ["Supabase Realtime", "FCM", "Service worker"],
                },
                {
                    Icon: FiMaximize,
                    title: "Only real donations count",
                    text: "A donation is recorded only when the requester scans the donor’s QR code in person, or types the 5-character code.",
                    tech: ["QR codes", "Camera scanning"],
                },
                {
                    Icon: FiClock,
                    title: "Requests close themselves",
                    text: "A scheduled job expires requests after 24 hours and tells the donors who answered, so no one travels for a closed request.",
                    tech: ["pg_cron", "Edge Functions"],
                },
            ],
        },
        {
            type: "stack",
            id: "stack",
            eyebrow: "Tech stack",
            title: "A small stack with no servers to run",
            architecture: {
                description:
                    "The web app sends requests to Supabase and gets live updates back. Supabase sends push alerts to donors’ phones through Firebase Cloud Messaging.",
                nodes: [
                    {
                        title: "Blood Help web app",
                        detail: "React and TypeScript, installable as a PWA",
                    },
                    {
                        title: "Supabase",
                        detail: "Postgres and PostGIS, row-level security, Realtime, Edge Functions",
                    },
                    {
                        title: "Firebase Cloud Messaging",
                        detail: "Push alerts to donors’ phones",
                    },
                ],
                // Between each node and the next one down.
                links: [
                    { down: "requests", up: "live updates" },
                    { down: "push alerts" },
                ],
            },
            groups: [
                {
                    label: "Frontend",
                    items: ["React 19", "TypeScript", "Vite", "Tailwind CSS"],
                },
                {
                    label: "Backend",
                    items: [
                        "Supabase",
                        "PostgreSQL",
                        "PostGIS",
                        "Row Level Security",
                    ],
                },
                {
                    label: "Realtime and jobs",
                    items: ["Supabase Realtime", "Edge Functions", "pg_cron"],
                },
                {
                    label: "Notifications",
                    items: ["Firebase Cloud Messaging", "Service worker"],
                },
                {
                    label: "On the phone",
                    items: ["Geolocation", "Camera QR scanning"],
                },
                { label: "Delivery", items: ["PWA", "Vercel"] },
            ],
        },
    ],
};

export default bloodHelp;
