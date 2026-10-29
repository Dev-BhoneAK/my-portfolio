import {
    FiArrowDown,
    FiArrowUpRight,
    FiAward,
    FiDownload,
} from "react-icons/fi";
import { SiAmazonaws } from "react-icons/si";

import EmailLink from "@/app/components/common/EmailLink";
import careerData, { roleId } from "@/app/utils/careerData";
import { revealClassName, revealDelay } from "@/app/utils/motion";
import { emailLink, githubLink, linkedinLink } from "@/app/utils/socialLinks";
import { eyebrowClassName, focusRing } from "@/app/utils/styles";

const socialLinks = [githubLink, linkedinLink, emailLink];

// careerData is newest first, so the last role is where the career started.
const firstYear = careerData[careerData.length - 1].start.slice(0, 4);

const facts = [
    { label: "Experience", value: "10+ years", detail: `Since ${firstYear}` },
    { label: "Languages", value: "English, Japanese", detail: "JLPT N4" },
    { label: "Based in", value: "Yangon, Myanmar", detail: "UTC+6:30" },
];

// Same entries as the CERTIFICATIONS block in
// public/BHONE AUNG KYAW - Resume.pdf.
const certifications = [
    {
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        year: "2025",
        verifyUrl:
            "https://www.credly.com/badges/80d1b976-ab96-4569-b7c2-584bcc646c35/public_url",
        Icon: SiAmazonaws,
    },
    {
        name: "Diploma in Software Engineering",
        issuer: "Cambridge ICT",
        year: "2011",
        Icon: FiAward,
    },
];

export default function HeroSection() {
    return (
        <section className="my-auto grid items-center gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_27rem] xl:gap-20">
            <div>
                <p
                    style={revealDelay(0)}
                    className={`${revealClassName} inline-flex items-center gap-2.5 rounded-full border border-line bg-subtle px-4 py-1.5 text-sm text-control`}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                    </span>
                    Open to software projects & engineering roles
                </p>

                <h1
                    style={revealDelay(1)}
                    className={`${revealClassName} mt-6 text-[2.5rem] font-semibold leading-none tracking-tight text-heading 2xs:text-5xl xs:text-6xl xl:text-7xl`}
                >
                    Bhone Aung Kyaw
                </h1>
                <p
                    style={revealDelay(2)}
                    className={`${revealClassName} mt-4 text-2xl font-medium text-accent xs:text-3xl`}
                >
                    Senior Full-stack Engineer
                </p>
                <p
                    style={revealDelay(3)}
                    className={`${revealClassName} mt-5 max-w-xl text-lg leading-relaxed text-body`}
                >
                    I build web and mobile products end to end — REST APIs,
                    admin dashboards and front ends — and have led the teams
                    that ship them.
                </p>

                <div
                    style={revealDelay(4)}
                    className={`${revealClassName} mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center`}
                >
                    <a
                        href="#work"
                        className={`group inline-flex items-center justify-center gap-2 rounded-full bg-action px-7 pb-3 pt-3.5 font-semibold text-on-action shadow-lg shadow-action-glow transition-colors hover:bg-action-hover ${focusRing}`}
                    >
                        View my work
                        <FiArrowDown
                            aria-hidden="true"
                            className="-mt-0.5 transition-transform group-hover:translate-y-0.5"
                        />
                    </a>
                    {/* Downloads keep the PDF's own name: Vercel sends it as the
                        Content-Disposition filename, which overrides download="…". */}
                    <a
                        href="/BHONE%20AUNG%20KYAW%20-%20Resume.pdf"
                        download
                        className={`inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-7 pb-3 pt-3.5 font-semibold text-heading transition-colors hover:border-highlight hover:text-highlight ${focusRing}`}
                    >
                        <FiDownload aria-hidden="true" className="-mt-0.5" />
                        Download resume
                    </a>
                    {/* At lg the column is too narrow, so this row always wraps;
                        the negative margin lines the first icon up with the text. */}
                    <ul className="flex items-center justify-center gap-1 lg:-ml-3 xl:ml-0">
                        {socialLinks.map(({ label, href, Icon }) => {
                            const LinkTag = href.startsWith("mailto:")
                                ? EmailLink
                                : "a";
                            return (
                                <li key={label}>
                                    <LinkTag
                                        href={href}
                                        aria-label={label}
                                        {...(href.startsWith("http") && {
                                            target: "_blank",
                                            rel: "noreferrer",
                                        })}
                                        className={`flex h-11 w-11 items-center justify-center rounded-full text-xl text-muted transition-colors hover:bg-subtle hover:text-highlight ${focusRing}`}
                                    >
                                        <Icon aria-hidden="true" />
                                    </LinkTag>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <dl
                    style={revealDelay(5)}
                    className={`${revealClassName} mt-10 border-t border-line xs:grid xs:grid-cols-3 xs:gap-6 xs:pt-6`}
                >
                    {facts.map(({ label, value, detail }) => (
                        <div
                            key={label}
                            className="flex items-baseline justify-between gap-6 border-b border-line py-3 xs:block xs:border-0 xs:py-0"
                        >
                            <dt className="text-sm text-muted">{label}</dt>
                            <dd className="text-right xs:mt-1.5 xs:text-left">
                                <span className="block font-medium text-heading">
                                    {value}
                                </span>
                                <span className="block text-sm text-muted">
                                    {detail}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>

            <aside
                style={revealDelay(6)}
                aria-label="Career snapshot"
                className={`${revealClassName} grid gap-6 rounded-2xl border border-line bg-surface p-6 shadow-xl shadow-card xs:p-8`}
            >
                {/* Below lg the Experience timeline comes right after the hero,
                    so the role list would only repeat it. */}
                <div className="hidden lg:block">
                    <p id="hero-career" className={eyebrowClassName}>
                        Career path
                    </p>
                    {/* Each role links to its entry in the Experience timeline. */}
                    <ol aria-labelledby="hero-career" className="mt-6">
                        {careerData.map((role, index) => (
                            <li
                                key={roleId(role)}
                                className="relative grid grid-cols-[3.25rem_minmax(0,1fr)] pb-5 last:pb-0"
                            >
                                {index < careerData.length - 1 && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute -bottom-3 left-[calc(3.25rem+4px)] top-3 border-l-2 border-dotted border-marker-line"
                                    ></span>
                                )}
                                <span className="pt-px text-sm tabular-nums text-muted">
                                    {role.start.slice(0, 4)}
                                </span>
                                <div className="relative pl-6">
                                    <span
                                        aria-hidden="true"
                                        className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ${
                                            role.end
                                                ? "bg-marker"
                                                : "bg-action ring-4 ring-action-glow"
                                        }`}
                                    ></span>
                                    <a
                                        href={`#${roleId(role)}`}
                                        className={`group block rounded-sm ${focusRing}`}
                                    >
                                        <span className="block font-medium leading-snug text-heading transition-colors group-hover:text-accent">
                                            {role.title}
                                        </span>
                                        <span className="mt-0.5 block text-sm text-muted">
                                            {role.company}
                                        </span>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="border-line lg:border-t lg:pt-6">
                    <p id="hero-certifications" className={eyebrowClassName}>
                        Certifications
                    </p>
                    {/* Side by side on tablets, where the card is full width. */}
                    <ul
                        aria-labelledby="hero-certifications"
                        className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-1 lg:gap-4"
                    >
                        {certifications.map(
                            ({ name, issuer, year, verifyUrl, Icon }) => (
                                <li key={name} className="flex gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-accent"
                                    >
                                        <Icon />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="font-medium leading-snug text-heading">
                                            {name}
                                        </p>
                                        <p className="mt-0.5 text-sm text-muted">
                                            {issuer} · {year}
                                            {verifyUrl && (
                                                <>
                                                    {" · "}
                                                    <a
                                                        href={verifyUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={`group inline-flex items-center gap-0.5 font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
                                                    >
                                                        Verify
                                                        <span className="sr-only">
                                                            {" "}
                                                            {name} on Credly
                                                            (opens in a new tab)
                                                        </span>
                                                        <FiArrowUpRight
                                                            aria-hidden="true"
                                                            className="-mt-0.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                        />
                                                    </a>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </aside>
        </section>
    );
}
