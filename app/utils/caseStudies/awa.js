import {
    FiAlertTriangle,
    FiCpu,
    FiFileText,
    FiFilter,
    FiFolder,
    FiGitBranch,
    FiHelpCircle,
    FiLock,
    FiMapPin,
    FiMic,
    FiRefreshCw,
    FiSearch,
    FiShield,
    FiUploadCloud,
    FiUsers,
} from "react-icons/fi";

import Answer from "../../../public/projects/awa/answer.png";
import Home from "../../../public/projects/awa/home.png";
import Upload from "../../../public/projects/awa/upload.png";

const answer = {
    src: Answer,
    alt: "AWA answering “When is the phase 2 deadline for the Riverside Tower project?”: 15 March 2027, with a possible two-week slip raised at a site meeting. Two sources: page 12 of the contract, and 14:32 in the meeting recording.",
};

// The AWA case study, at /projects/awa. The name, tagline and summary are in
// index.js.
// - AWA is in development: the requirements, architecture and database schema
//   are done, and no app code is written yet. The screenshots are from its UI
//   design: raw 2880x1800 desktop captures (Upload is 2880x2080) in
//   public/projects/awa, in the app's dark theme.
// - sections render in this order; each type has its component in
//   CaseStudyPage.
const awa = {
    // Sets AWA's periwinkle, from globals.css.
    className: "case-awa",
    device: "desktop",
    status: {
        label: "In development",
        note: "Requirements, architecture and UI design done. Next: phase 1 of 7.",
    },
    coverScreen: answer,
    facts: [
        {
            label: "Role",
            value: "Design, architecture & development",
            detail: "Solo project",
        },
        {
            label: "Release",
            value: "Free pilot",
            detail: "Planned, for a few organizations",
        },
        {
            label: "Platform",
            value: "Web app, desktop first",
            detail: "Hosted in Singapore",
        },
        {
            label: "Stack",
            value: "React, TypeScript, AWS",
            detail: "PostgreSQL + pgvector, Gemini",
        },
    ],
    sections: [
        {
            type: "cards",
            id: "problem",
            eyebrow: "The problem",
            title: "Company knowledge is buried in files",
            intro: "Law firms, banks, and NGOs keep what they know in documents and recordings spread across people, branches, and drives. Finding the right one usually means asking a colleague.",
            columns: 4,
            cards: [
                {
                    Icon: FiFolder,
                    title: "Scattered files",
                    text: "Contracts, policies, and meeting notes live in different drives, branches, and inboxes.",
                },
                {
                    Icon: FiUsers,
                    title: "New staff ask around",
                    text: "Without a way to search, people depend on colleagues to find documents and answers.",
                },
                {
                    Icon: FiAlertTriangle,
                    title: "Wrong answers are costly",
                    text: "AI tools can answer confidently and still be wrong. For a lawyer or a bank, an answer with no source to check is a risk.",
                },
                {
                    Icon: FiLock,
                    title: "AI ignores permissions",
                    text: "Generic AI tools don’t know who in an organization may see which file.",
                },
            ],
        },
        {
            type: "cards",
            id: "solution",
            eyebrow: "The solution",
            title: "Ask once, and check where the answer came from",
            intro: "An organization uploads its files once. Staff then ask in plain words, and every answer comes only from files they can open, with a source for every claim.",
            cards: [
                {
                    Icon: FiFileText,
                    title: "Answers with sources",
                    text: "Each claim names the file and page, or the moment in a recording, so anyone can check it.",
                },
                {
                    Icon: FiShield,
                    title: "Only files you can open",
                    text: "Search stays inside the folders each person can access, before the AI reads a word.",
                },
                {
                    Icon: FiSearch,
                    title: "Exact codes and names",
                    text: "Search matches exact words as well as meaning, so a contract number like CN-2026-014 finds its file.",
                },
                {
                    Icon: FiMic,
                    title: "Documents and recordings",
                    text: "PDFs (scanned too), Word, Excel, PowerPoint, and text, plus audio up to two hours, transcribed with timestamps.",
                },
                {
                    Icon: FiGitBranch,
                    title: "Built for branches",
                    text: "Folders belong to the whole organization or to one branch, with three admin levels to manage them.",
                },
                {
                    Icon: FiHelpCircle,
                    title: "No guessing",
                    text: "When nothing relevant is found, AWA replies “Not found in your documents” instead of making an answer up.",
                },
            ],
        },
        {
            type: "folderAccess",
            id: "access",
            eyebrow: "Access",
            title: "Each person’s search sees only their folders",
            intro: "Every folder belongs to the whole organization (Global) or to one branch (Local), and groups get View or Edit access to it. Pick a person to see which folders AWA searches when they ask.",
            rules: [
                {
                    Icon: FiFolder,
                    title: "Global or Local",
                    text: "Set when a folder is made, so a branch file can’t land in Global by mistake.",
                },
                {
                    Icon: FiUsers,
                    title: "View or Edit, by group",
                    text: "View lets people open files and ask. Edit also lets them upload and delete.",
                },
                {
                    Icon: FiShield,
                    title: "Checked on every question",
                    text: "Access comes from the database each time, so a change applies to the very next question.",
                },
            ],
            // An example law firm with branches in Yangon and Tokyo, like the one
            // in the screenshots. Each person's access maps a folder to the group
            // or admin level that opens it.
            folders: [
                { id: "policies", name: "Firm Policies", scope: "Global" },
                { id: "board", name: "Board Minutes", scope: "Global" },
                { id: "riverside", name: "Riverside Tower", scope: "Yangon" },
                { id: "yangon-hr", name: "Yangon HR", scope: "Yangon" },
                { id: "tokyo", name: "Tokyo Expenses", scope: "Tokyo" },
            ],
            people: [
                {
                    id: "thiri",
                    name: "Thiri Aung",
                    initials: "TA",
                    role: "Global Admin",
                    access: {
                        policies: "Global Admin",
                        board: "Global Admin",
                        riverside: "Global Admin",
                        "yangon-hr": "Global Admin",
                        tokyo: "Global Admin",
                    },
                },
                {
                    id: "khin",
                    name: "Daw Khin",
                    initials: "DK",
                    role: "Partner, Yangon and Tokyo",
                    access: {
                        policies: "Everyone",
                        board: "Partners",
                        "yangon-hr": "Everyone in Yangon",
                        tokyo: "Everyone in Tokyo",
                    },
                },
                {
                    id: "hnin",
                    name: "Ma Hnin",
                    initials: "MH",
                    role: "Yangon, Riverside Tower",
                    access: {
                        policies: "Everyone",
                        riverside: "Riverside Tower",
                        "yangon-hr": "Everyone in Yangon",
                    },
                },
                {
                    id: "kenji",
                    name: "Kenji Sato",
                    initials: "KS",
                    role: "Member, Tokyo",
                    access: {
                        policies: "Everyone",
                        tokyo: "Everyone in Tokyo",
                    },
                },
            ],
            // Searches some folders and not others, so both states show.
            initialPerson: "hnin",
        },
        {
            type: "screens",
            id: "product",
            eyebrow: "The product",
            title: "Three screens do most of the work",
            intro: "Members mostly ask; editors also upload. Every label is in plain words for non-technical staff, with no “policies” or “IAM”. These screens are from the UI design, in the app’s dark theme.",
            screens: [
                {
                    title: "Ask",
                    summary:
                        "Start from any screen, and ask the way you’d ask a colleague.",
                    src: Home,
                    alt: "AWA home screen: “What would you like to ask today?” above a question box searching all folders, three suggested questions, and recent chats in the sidebar.",
                    notes: [
                        {
                            x: 56.25,
                            y: 46.16,
                            title: "Plain questions",
                            text: "No keywords or search rules to learn. Just type what you need.",
                        },
                        {
                            x: 46.5,
                            y: 54.4,
                            title: "Choose the scope",
                            text: "Search every folder you can open, or just one.",
                        },
                        {
                            x: 86.1,
                            y: 65.36,
                            title: "Ideas to start",
                            text: "Suggested questions show new staff what to ask.",
                        },
                        {
                            x: 89.75,
                            y: 4.24,
                            title: "Upload from anywhere",
                            text: "The Upload button sits at the top right of every screen.",
                        },
                    ],
                },
                {
                    title: "Answer with sources",
                    summary: "Every claim points to the file it came from.",
                    ...answer,
                    notes: [
                        {
                            x: 60.75,
                            y: 23.44,
                            title: "A marker on each claim",
                            text: "Numbers in the answer match the sources below it.",
                        },
                        {
                            x: 59,
                            y: 44.48,
                            title: "File and page",
                            text: "Opening a source checks access again, then opens a link that expires in 5 minutes.",
                        },
                        {
                            x: 84.75,
                            y: 44.48,
                            title: "Recordings too",
                            text: "Audio sources point to the moment, like 14:32 in a site meeting.",
                        },
                        {
                            x: 47.5,
                            y: 93.68,
                            title: "Follow-ups keep the scope",
                            text: "The next question stays in the Riverside Tower folder.",
                        },
                    ],
                },
                {
                    title: "Upload",
                    summary:
                        "Upload once, then follow each file until it’s ready to ask about.",
                    src: Upload,
                    alt: "AWA upload screen: the Riverside Tower folder in the Yangon branch, a notice that Google Gemini processes the files, 412 MB of 1 GB used, and five uploads: ready, transcribing audio, checking for viruses, a duplicate warning, and a password-protected file.",
                    notes: [
                        {
                            x: 87.75,
                            y: 12.95,
                            title: "Who will see it",
                            text: "The folder picker says in plain words who can see the files.",
                        },
                        {
                            x: 87.75,
                            y: 21.88,
                            title: "Consent up front",
                            text: "A notice says Google Gemini processes the files before anything uploads.",
                        },
                        {
                            x: 87.75,
                            y: 49.31,
                            title: "Storage in view",
                            text: "Each organization has 1 GB during the pilot, shown before it runs out.",
                        },
                        {
                            x: 87.75,
                            y: 71.33,
                            title: "Every file’s status",
                            text: "Virus check, transcription, duplicates, and errors, each with a next step.",
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
            intro: "I wrote the requirements, designed the AWS architecture, and tested the database schema before writing any app code. Six decisions shape how AWA works.",
            cards: [
                {
                    Icon: FiFilter,
                    title: "Permission-safe search",
                    text: "Each question searches only chunks from folders the person can open: by meaning with pgvector, and by exact codes like a contract number. Gemini sees nothing else.",
                    tech: ["pgvector", "Hybrid search"],
                },
                {
                    Icon: FiLock,
                    title: "Organizations sealed apart",
                    text: "Row-level security on every table returns nothing until a request sets its organization, and composite keys rule out links between organizations.",
                    tech: ["Row-level security", "PostgreSQL 16"],
                },
                {
                    Icon: FiUploadCloud,
                    title: "Uploads that skip the server",
                    text: "Browsers upload straight to S3 with short-lived, size-capped links. GuardDuty scans every file before a worker takes it from the queue.",
                    tech: ["S3", "GuardDuty", "SQS"],
                },
                {
                    Icon: FiCpu,
                    title: "Gemini only where it’s needed",
                    text: "Text is extracted locally first. Gemini reads only pages that can’t be extracted cleanly, like scans, and transcribes audio in 10-minute pieces.",
                    tech: ["Gemini on Vertex AI", "ffmpeg"],
                },
                {
                    Icon: FiRefreshCw,
                    title: "No half-processed files",
                    text: "Chunks are saved in one transaction, so search never sees half a file. A repeated message does nothing, and a file that fails 5 times goes to a dead-letter queue and raises an alarm.",
                    tech: ["SQS dead-letter queue", "CloudWatch alarms"],
                },
                {
                    Icon: FiMapPin,
                    title: "Data stays in Singapore",
                    text: "All of AWS runs in ap-southeast-1 and Gemini in Google’s Singapore region, with zero data retention requested.",
                    tech: ["AWS ap-southeast-1", "Vertex AI"],
                },
            ],
        },
        {
            type: "stack",
            id: "stack",
            eyebrow: "Tech stack",
            title: "Two paths that meet in one database",
            intro: "Uploads are processed in the background. Questions are answered live, streamed as Gemini writes. Everything runs on AWS in Singapore.",
            architecture: {
                description:
                    "Uploads go from the browser straight to S3, are scanned by GuardDuty, and reach a worker on ECS Fargate through SQS. The worker uses Gemini to read and transcribe each file and saves chunks to PostgreSQL with pgvector. Questions go to an API on ECS Fargate, which searches only the folders the person can open in the same database, then Gemini writes the answer, streamed back with its sources.",
                lanes: [
                    {
                        title: "Upload",
                        detail: "in the background",
                        nodes: [
                            { title: "You upload", detail: "From the browser" },
                            {
                                title: "S3",
                                detail: "Direct upload, size-capped link",
                            },
                            {
                                title: "GuardDuty",
                                detail: "Malware scan on every file",
                            },
                            {
                                title: "SQS → worker",
                                detail: "On Fargate; Gemini reads and transcribes",
                            },
                            {
                                title: "PostgreSQL + pgvector",
                                detail: "Chunks saved with folder IDs",
                                shared: true,
                            },
                        ],
                    },
                    {
                        title: "Question",
                        detail: "answered live",
                        nodes: [
                            { title: "You ask", detail: "From any screen" },
                            {
                                title: "API",
                                detail: "On Fargate; Cognito session, Redis limits",
                            },
                            {
                                title: "PostgreSQL + pgvector",
                                detail: "Searches allowed folders only",
                                shared: true,
                            },
                            {
                                title: "Gemini",
                                detail: "Writes from the best chunks",
                            },
                            {
                                title: "Answer",
                                detail: "Streamed back, with sources",
                            },
                        ],
                    },
                ],
            },
            groups: [
                {
                    label: "Frontend",
                    items: [
                        "React",
                        "Vite",
                        "TypeScript",
                        "shadcn/ui",
                        "TanStack Query",
                        "react-i18next",
                    ],
                },
                {
                    label: "Backend",
                    items: [
                        "TypeScript API",
                        "ECS Fargate",
                        "Cognito",
                        "Redis (Valkey)",
                    ],
                },
                {
                    label: "Data",
                    items: [
                        "PostgreSQL 16",
                        "pgvector",
                        "Row-level security",
                        "S3",
                    ],
                },
                {
                    label: "Processing",
                    items: ["EventBridge", "SQS", "GuardDuty", "ffmpeg"],
                },
                {
                    label: "AI",
                    items: ["Gemini on Vertex AI", "gemini-embedding-001"],
                },
                {
                    label: "Delivery",
                    items: ["AWS CDK", "GitHub Actions", "CloudWatch", "X-Ray"],
                },
            ],
        },
    ],
};

export default awa;
