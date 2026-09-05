<div align="center">
<p align="center">
  <a href="https://www.nyashanziramasanga.com/">
    <img src="./src/assets/icons/logo.svg" alt="" height="60"/>
  </a>
</p>
    <h1> 
    🗂️  Online Portfolio v4 🔥
    </h1>
</div>

[![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fnyashanziramasanga.com)](https://nyashanziramasanga.com)
[![Lighthouse CI](https://github.com/NyashaNziramasanga/portfolio-v4/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/NyashaNziramasanga/portfolio-v4/actions/workflows/lighthouse.yml)
[![Vercel](https://vercelbadge.vercel.app/api/NyashaNziramasanga/portfolio-v4)](https://nyashanziramasanga.com)

![online-portfolio](docs/online-portfolio-v4.gif)

## Getting Started

1. Clone repo
2. Use **Bun** (see [package.json](package.json)): `bun --version`
3. Run:

```bash
# First time install and start script
bun install && bun dev
```

## Scripts

```bash
bun install          # Install dependencies

bun dev              # Start dev server on http://localhost:5173

bun run build        # Type-check (tsc -b) then build (vite build)

bun run preview      # Preview production build

bun run lint         # Run ESLint and StyleX rules

bun run perf:collect stylex # Build and collect 5x mobile/desktop Lighthouse samples

bun run react-doctor # Run react-doctor diagnostics
```

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [StyleX](https://stylexjs.com/)
- [Bun](https://bun.sh/)
- [Vercel](https://vercel.com/)
- Icons from [simple-icons](https://simpleicons.org/) and [lucide-react](https://lucide.dev/)

Styles are co-located with components through `stylex.create()`. Shared visual
values live in focused modules under [`src/styles`](src/styles/README.md) and are
imported directly from their defining `.stylex.ts` file—there is intentionally no
barrel export. Prefer semantic tokens, and run `bun run lint` to enforce token use
and vertically formatted StyleX objects. Reusable spacing follows a compact,
named 4 px grid; larger structural measurements live in the layout tokens.
`src/index.css` is limited to the font, reset, document globals, and scrollbar behavior. See the
[Tailwind-to-StyleX performance report](docs/performance/stylex-migration.md)
for the reproducible before/after measurements.

## Previous Version

- [Portfolio v3](https://github.com/NyashaNziramasanga/online-portfolio-v3)

## License

This project is licensed under the [MIT License](LICENSE).
