import Shwedagon from "../../public/career/shwedagon/shwedagon.png";
import KitchenDisplay from "../../public/career/kitchen-display/kitchen-display.png";
import Tay from "../../public/career/tay/tay.png";
import FantasyEmptyTeam from "../../public/career/football-master/fm0.png";
import FantasyFullTeam from "../../public/career/football-master/fm1.png";
import FantasyLivescore from "../../public/career/football-master/fm2.png";

// Kept in sync with public/BHONE AUNG KYAW - Resume.pdf. Newest first: the
// experience timeline and the hero's Career path card both render it in this
// order.
// - start / end are "YYYY-MM"; end: null marks the current role.
// - Each shot is one framed screenshot. A shot with several images shows
//   them side by side as phone screens.
const careerData = [
    {
        title: "Full-stack Engineer",
        company: "Freelance",
        start: "2026-04",
        end: null,
        highlights: [
            "Built Biz-Copilot for Triumsoft, a 24/7 sales automation platform that helps businesses capture orders, validate payments, and sync inventory in real time.",
            "Built Eurus Mind for Triumsoft, a voice-first daily journal for Burmese speakers. Users talk about their day, and AI organizes it into a clear daily record.",
        ],
        stack: ["NestJS", "React Native", "PostgreSQL"],
        links: [
            { label: "Biz-Copilot", url: "https://bizcopilot.triumsoft.net/" },
            { label: "Triumsoft", url: "https://triumsoft.net/" },
        ],
    },
    {
        title: "Senior Team Lead",
        promotedFrom: "Senior Software Engineer",
        company: "Myanmar Media Linkage",
        start: "2019-10",
        end: "2026-04",
        highlights: [
            "Led developers across multiple products, working daily with designers, clients, and stakeholders.",
            "Led the development of Tay4U, a video social platform that became the company’s main product and core source of revenue.",
            "Architected, built, tested, and documented the admin dashboard and REST APIs for the nation’s first Fantasy Football League using Node.js.",
            "Designed and architected a payment gateway system for the company’s internal and external products.",
            "Worked with the cloud engineer to migrate projects from the local data center to AWS, reducing the company’s monthly costs.",
            "Contributed to a video transcoding and storage microservice on AWS S3, shared across the company’s video products.",
            "Designed and developed the backend and REST API for an agriculture app in partnership with Myanmar Posts and Telecommunications.",
            "Maintained and added new features to the MPT4U app and LoTaYa, one of the largest web portals in Myanmar, using Laravel and Angular.",
        ],
        stack: ["Node.js", "Laravel", "Angular", "AWS", "REST APIs"],
        links: [
            { label: "MPT4U app", url: "https://mpt.com.mm/en/mpt4u/" },
            {
                label: "MPT × KDDI & Sumitomo",
                url: "https://mpt.com.mm/en/about-home/joint-operation/",
            },
        ],
        shots: [
            {
                name: "Tay4U",
                description: "Video social platform",
                images: [
                    {
                        src: Tay,
                        alt: "Tay4U video feed on a laptop next to its mobile video player",
                    },
                ],
            },
            {
                name: "Fantasy Football League",
                description: "The nation’s first fantasy football app",
                images: [
                    {
                        src: FantasyEmptyTeam,
                        alt: "Fantasy Football League team screen before picking players",
                    },
                    {
                        src: FantasyFullTeam,
                        alt: "Fantasy Football League team screen with a full squad",
                    },
                    {
                        src: FantasyLivescore,
                        alt: "Fantasy Football League live score screen",
                    },
                ],
            },
        ],
    },
    {
        title: "Senior Web Developer",
        company: "Alpha Plus",
        employmentType: "1-year contract",
        start: "2018-07",
        end: "2019-07",
        highlights: [
            "Architected and developed an Inventory Management and Trade Tracking System for warehouses from scratch using PHP.",
            "Designed and developed two static websites for travel and tour agencies.",
        ],
        stack: ["PHP", "HTML", "CSS"],
    },
    {
        title: "Web Developer / Backend Developer",
        company: "Novitee",
        companyUrl: "https://www.novitee.com/",
        start: "2016-01",
        end: "2018-06",
        highlights: [
            "Built the Purchasing and Inventory backend system from scratch for the company’s F&B solution using Laravel.",
            "Developed and shipped a Kitchen Display System with Laravel, Node.js, and Socket.IO for real-time communication between devices.",
            "Designed and developed a Hotel Management System in PHP, including a custom C# printing function for the passport reader.",
        ],
        stack: ["Laravel", "PHP", "Node.js", "Socket.IO", "C#"],
        links: [
            {
                label: "Kitchen Display System",
                url: "https://www.novitee.com/solutions/kitchen-display-system",
            },
            {
                label: "Purchasing & Inventory",
                url: "https://www.novitee.com/solutions/purchasing",
            },
        ],
        shots: [
            {
                name: "Kitchen Display System",
                description: "Real-time orders across kitchen devices",
                images: [
                    {
                        src: KitchenDisplay,
                        alt: "Kitchen Display System order queues on two iPads",
                    },
                ],
            },
        ],
    },
    {
        title: "Web Designer / Junior Programmer",
        company: "SEA Net Technology",
        companyUrl: "https://www.seanetmsc.com/",
        start: "2013-02",
        end: "2015-12",
        highlights: [
            "Designed and developed front-end pages for shwedagonpagoda.com, the official website of Shwedagon Pagoda.",
            "Built the Maha Dhamma Pala e-Library using PHP.",
            "Worked in the team that developed the 2013 SEA Games Equestrian (Endurance) Scoring System for coaches using C#.",
            "Maintained and tested the data storage process for printing Seafarers’ OCR machine-readable identity documents for the Ministry of Transport.",
        ],
        stack: ["HTML", "CSS", "PHP", "C#"],
        links: [
            {
                label: "shwedagonpagoda.com",
                url: "https://shwedagonpagoda.com/contact.php",
            },
            {
                label: "Maha Dhamma Pala e-Library",
                url: "http://mahadhammapala.org/",
            },
        ],
        shots: [
            {
                name: "shwedagonpagoda.com",
                description: "Official website of Shwedagon Pagoda",
                images: [
                    {
                        src: Shwedagon,
                        alt: "Shwedagon Pagoda website: the About page and the interactive floor plan",
                    },
                ],
            },
        ],
    },
];

// Anchor id of a role's timeline entry. The hero's Career path links to it.
export const roleId = ({ company, start }) =>
  `${company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${start.slice(0, 4)}`;

export default careerData;
