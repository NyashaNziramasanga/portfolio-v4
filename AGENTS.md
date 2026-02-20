# AGENTS.md

## Project Overview

Portfolio v4 — a personal portfolio website with a fixed left sidebar for navigation and a scrollable right content area. Dark-themed, single-page layout.

**Design reference:** [Figma](https://www.figma.com/design/T7b8Kk55LVc6Oa7bUzMxWc/Portfolio-v4?node-id=3140-94)

## Tech Stack

- **Framework:** React 18 + TypeScript (strict mode)
- **Bundler:** Vite 5
- **Package Manager:** Bun
- **Styling:** Tailwind CSS 3 with class-variance-authority (CVA), tailwind-merge, clsx
- **Module System:** ES Modules

## Commands

```bash
bun install        # Install dependencies
bun dev            # Dev server at http://localhost:5173
bun run build      # Type-check (tsc -b) then build (vite build)
bun run preview    # Preview production build locally
```

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI primitives (button.tsx)
│   ├── ExperienceTimeline.tsx # Work history timeline
│   └── PublicationsList.tsx   # Articles/talks list with platform icons
├── data/
│   ├── sections.json          # Navigation sections
│   ├── experiences.json       # Work and education entries
│   └── publications.json      # Articles, talks, publications
├── lib/
│   └── utils.ts               # cn() utility (clsx + tailwind-merge)
├── App.tsx                    # Root component (sidebar + content layout)
├── main.tsx                   # Entry point
└── index.css                  # Tailwind directives + CSS custom properties
public/
└── logos/                     # Company logos and profile image
```

## Conventions

- **Components:** PascalCase filenames, functional components with hooks. Use `React.forwardRef` when exposing refs.
- **Styling:** Tailwind utility classes only — no separate CSS files. Use the `cn()` helper from `@/lib/utils` to merge classes. Dark mode is the default via class strategy.
- **Variants:** Use CVA (`class-variance-authority`) for component variant definitions (see `button.tsx`).
- **Data:** Static content lives in `src/data/*.json`. Types are inferred from the JSON: `type Experience = (typeof data)[number]`.
- **Path aliases:** `@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
- **Color theme:** Custom HSL-based CSS variables defined in `:root` in `index.css`. Tailwind references these via the `tailwind.config.js` extension.

## Architecture Notes

- Single-page app with no router — navigation is managed via state in `App.tsx`.
- No external state management; React hooks only.
- Build output goes to `dist/`.
