# bhoneak.dev

Source for my portfolio, live at [www.bhoneak.dev](https://www.bhoneak.dev).

It's one page with a short intro, my experience, a few projects I've built and a downloadable resume, in light and dark themes.

- **Framework:** Next.js 13 (App Router), React 18, plain JavaScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Theming:** next-themes (dark by default)
- **Analytics:** Google Analytics 4
- **Hosting:** Vercel

## Running locally

You'll need Node.js 20 or newer.

```bash
git clone https://github.com/Dev-BhoneAK/portfolio-next-tailwind.git
cd portfolio-next-tailwind
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000). There's nothing to configure: analytics stays off unless `NEXT_PUBLIC_GA_ID` is set.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint with the next/core-web-vitals rules
```

There's no test suite. Run `npm run build` before pushing, because some failures only show up in a production build. The link-preview image is one of them.

## Project structure

```
app/
├── page.js                the page: Header, Main and Footer
├── layout.js              font, metadata and providers
├── globals.css            theme colors
├── opengraph-image.jsx    link-preview image
├── components/
│   ├── header/            nav and hero
│   ├── main/              experience timeline and projects
│   ├── analytics/         Google Analytics and the consent banner
│   └── common/            email and external links
└── utils/                 content data, shared styles, analytics helpers
public/                    resume PDF, screenshots, fonts for the preview image
middleware.js              sets the consent-region cookie
next.config.js             redirects
tailwind.config.js         breakpoints, color tokens, keyframes
```

## Updating content

Most changes are to data, not components.

| To change | Edit |
| --- | --- |
| Experience | `app/utils/careerData.js` |
| Projects | `app/utils/projectsData.js`, screenshots in `public/projects/<project>/` |
| Certifications | `certifications` in `app/components/header/HeroSection.js` |
| Email and social links | `app/utils/socialLinks.js` |
| Resume | `public/BHONE AUNG KYAW - Resume.pdf` |
| Page title and description | `metadata` in `app/layout.js` |
| Link-preview card | `app/opengraph-image.jsx` |

A few things to keep in mind:

- The experience and project lists mirror the resume PDF, in the same order. Recruiters compare the two, so when one changes, change the other.
- Dates are `"YYYY-MM"`. A role with `end: null` is the current one: it shows "Present", and its duration counts up to today.
- Import images statically (`import shot from "../../public/..."`) instead of using string paths, so `next/image` knows their size and can show a blur placeholder.
- Each project gets three portrait phone screenshots, about 1080×2340. Use raw captures without a frame; the bezel is drawn in CSS. Give each one a short English caption, since several of the apps are in Burmese.
- A downloaded resume is saved under the PDF's own file name. Vercel sends that name in `Content-Disposition`, and browsers prefer it to the link's `download` attribute. To change it, rename the file, then update the link in `HeroSection.js` and the redirect in `next.config.js`.

## How it's put together

Every color is a CSS variable in `app/globals.css`. `:root` holds the light theme, `.dark` overrides it, and `tailwind.config.js` maps the variables to semantic classes like `bg-page`, `text-heading` and `text-accent`. Tailwind's default palette is replaced, not extended, so `text-slate-500` or `bg-white` simply don't exist. That's deliberate, so nothing can bypass the themes. To restyle a theme, change its values in `globals.css`. A new color needs a token in both theme blocks and an entry in the config. Opacity modifiers like `bg-accent/50` don't work on variables, so add a token instead.

The breakpoints are custom too: `2xs` 420px, `xs` 640, `sm` 768, `md` 896, `lg` 1024, `xl` 1280, `2xl` 1536. Only `lg` and up match Tailwind's defaults. Components switch layout with these classes inside one DOM tree, so there are no separate mobile and desktop versions to keep in sync.

The page is prerendered. `app/page.js` is a client component that `next build` renders to static HTML, which the browser then hydrates. The two renders have to match, so anything that depends on the browser or on today's date waits until mount. Right now that's the theme toggle and the current role's duration.

The hero animates in CSS, with keyframes from `tailwind.config.js`, so it plays on first paint instead of waiting for JavaScript. The sections below fade in with Framer Motion as they scroll into view. Both respect the reduced-motion setting.

The link-preview image (`app/opengraph-image.jsx`) is a 1200×630 card rendered on the edge runtime. It can't see the page's CSS, so its colors are hex values copied from the dark theme, and it loads League Spartan from the TTFs in `public/fonts/`. Fetch those fonts inside `Image()`, never at module level. Next also imports the file in Node.js to read its `alt` and `size`, the font URLs don't resolve there, and `next build` fails. `next dev` won't show the problem.

## Analytics

Google Analytics 4 loads only when `NEXT_PUBLIC_GA_ID` is set. It's set only in Vercel's Production environment, so local and preview builds send nothing.

- Visitors from the EEA, the UK and Switzerland see a consent banner, and gtag.js doesn't load until they accept. `middleware.js` reads the region from Vercel's `x-vercel-ip-country` header and passes it to the page in a `consent-region` cookie. Those visitors can change their choice later under "Cookie settings" in the footer. Local requests have no country header, so to see the banner, send `x-vercel-ip-country: DE` yourself.
- One click listener on the document, in `app/utils/analytics.js`, tracks every link. The event name comes from the href (email, resume download, in-page link, social profile or outbound link), and the parameters say where on the page the link sits. Components contain no tracking code, so a new link is tracked automatically. Section views, theme changes and Web Vitals are sent as well.
- To keep my own visits out of the reports, I open the site once in each browser with `?internal=1` (`?internal=0` undoes it). Those visits are tagged `traffic_type: internal`, and a GA4 data filter drops them.

## Deployment

The site runs on Vercel as a standard Next.js project. Set `NEXT_PUBLIC_GA_ID` in the Production environment only. The consent check depends on Vercel's country header: on another host, visitors from the EU would get analytics without the banner, so that part would need replacing.

`next.config.js` has three redirects:

- `/resume` is the link printed on my CV. It sends visitors to `/?utm_source=cv&utm_medium=resume`, so they show up in GA as CV traffic instead of Direct.
- `/resume/<company>` does the same and adds `utm_campaign=<company>`, for a CV sent to one company.
- `/Resume.pdf`, the resume's old file name, points to the current file.
