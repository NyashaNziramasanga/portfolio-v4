# AGENTS.md

## Project Overview

Portfolio v4 — a personal portfolio website for Nyasha Nziramasanga (Senior Software Engineer). Fixed left sidebar for navigation with a scrollable right content area. Dark-themed, single-page layout with SEO meta tags, Open Graph/Twitter cards, and a web app manifest.

**Design reference:** [Figma](https://www.figma.com/design/T7b8Kk55LVc6Oa7bUzMxWc/Portfolio-v4?node-id=3140-94)
**Live site:** [nyashanziramasanga.com](https://nyashanziramasanga.com/)

## Tech Stack

- **Framework:** React 18 + TypeScript (strict mode)
- **Bundler:** Vite 5
- **Package Manager:** Bun (1.2.22)
- **Styling:** Tailwind CSS 3 with tailwindcss-animate, class-variance-authority (CVA), tailwind-merge, clsx
- **Icons:** simple-icons (brand/tech icons), lucide-react (UI icons)
- **Module System:** ES Modules

## Commands

```bash
bun install           # Install dependencies
bun dev               # Dev server at http://localhost:5173
bun run build         # Type-check (tsc -b) then build (vite build)
bun run preview       # Preview production build locally
bun run react-doctor  # Run react-doctor diagnostics
```

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI primitives (button.tsx)
│   ├── WorkTimeline.tsx       # Work history timeline with expandable project media
│   └── PublicationsList.tsx   # Articles/talks list with platform icons
├── data/
│   ├── sections.json          # Navigation sections
│   ├── experiences.json       # Work and education entries (with optional projects/media)
│   ├── publications.json      # Articles, talks, publications
│   └── techStack.json         # Tech stack items with icon keys and labels
├── lib/
│   └── utils.ts               # cn() utility (clsx + tailwind-merge)
├── App.tsx                    # Root component (sidebar + content layout + tech stack grid)
├── main.tsx                   # Entry point
├── index.css                  # Tailwind directives + CSS custom properties
└── vite-env.d.ts              # Vite client type reference
public/
├── media/                     # Project demo videos (.mp4, .webm) and images (.webp)
├── favicon.svg                # SVG favicon
├── og-image.png               # Open Graph preview image
├── robots.txt                 # Search engine crawl rules
├── sitemap.xml                # XML sitemap
└── site.webmanifest           # PWA web app manifest
```

## Conventions

- **Components:** PascalCase filenames, functional components with hooks. Use `React.forwardRef` when exposing refs.
- **Styling:** Tailwind utility classes only — no separate CSS files. Use the `cn()` helper from `@/lib/utils` to merge classes. Dark mode is the default via class strategy.
- **Variants:** Use CVA (`class-variance-authority`) for component variant definitions (see `button.tsx`).
- **Data:** Static content lives in `src/data/*.json`. Types are inferred from the JSON: `type Experience = (typeof data)[number]`.
- **Icons:** Brand/tech icons use `simple-icons` (imported as `si*` objects). UI icons use `lucide-react`. Tech stack items in `techStack.json` reference icon keys with a `si` prefix or `lucide:` prefix.
- **Media:** Project demo media lives in `public/media/`. Videos have both `.mp4` and `.webm` formats for browser compatibility.
- **Path aliases:** `@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
- **Color theme:** Custom HSL-based CSS variables defined in `:root` in `index.css`. Tailwind references these via the `tailwind.config.js` extension.

## Architecture Notes

- Single-page app with no router — navigation is managed via state in `App.tsx`.
- No external state management; React hooks only.
- `WorkTimeline` supports expandable entries with project media (video, image, article links) and keyboard-accessible toggles.
- SEO handled via meta tags in `index.html` (OG, Twitter cards, canonical URL, structured data).
- Build output goes to `dist/`. Static assets in `public/` are copied as-is.
