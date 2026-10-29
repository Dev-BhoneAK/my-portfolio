// Every case study, each at /projects/<slug>, with the text its link preview
// is built from: the page title, the description and the social card. The
// rest of each page has its own file, registered in content.js. It's kept
// apart because the social card renders on the edge and needs none of the
// screenshots or icons.
const caseStudies = [
    {
        slug: "blood-help",
        name: "Blood Help",
        kind: "Charity project",
        tagline: "Nearby blood donors, alerted in minutes",
        summary:
            "When someone needs blood, it alerts nearby donors whose blood type is compatible, puts them in touch by phone, and confirms each donation with a QR code.",
    },
    {
        slug: "awa",
        name: "AWA",
        kind: "Personal project",
        tagline: "Answers from your company’s files, with sources",
        summary:
            "An AI workspace assistant for law firms, banks, and NGOs. Staff ask about their contracts, policies, and meetings, and AWA answers only from the files each person is allowed to open, citing the page, or the moment in a recording.",
    },
];

export const caseStudyPath = (slug) => `/projects/${slug}`;

export const findCaseStudy = (slug) =>
    caseStudies.find((caseStudy) => caseStudy.slug === slug);

export default caseStudies;
