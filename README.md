<div align="center">
<p align="center">
  <a href="https://www.nyashanziramasanga.com/">
    <img src="./public/favicon.svg" alt="" height="60"/>
  </a>
</p>
    <h1>Online Portfolio v4</h1>
    <p>
      <i>Personal portfolio on <a href="https://www.nyashanziramasanga.com/">nyashanziramasanga.com</a></i>
    </p>
</div>

[![Twitter Follow](https://img.shields.io/twitter/follow/NyashaNziboi.svg?style=social)](https://twitter.com/NyashaNziboi)
![Website](https://img.shields.io/website?down_color=red&url=https%3A%2F%2Fwww.nyashanziramasanga.com%2F)

![online-portfolio](public/og-image.png)

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

bun run react-doctor # Run react-doctor diagnostics
```

## Layout

- **Left panel**: Fixed nav with buttons — About, Experience, Projects, Publications.
- **Right panel**: Scrollable content; clicking a nav button smoothly scrolls to the matching section.

Design reference: [Figma: Portfolio v4](https://www.figma.com/design/T7b8Kk55LVc6Oa7bUzMxWc/Portfolio-v4?node-id=3140-94)

## Deployment

Deployed on [Vercel](https://vercel.com/) from the main branch.

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) 5
- [React](https://react.dev/) 18
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Bun](https://bun.sh/)
- [Vercel](https://vercel.com/)
- Icons from [simple-icons](https://simpleicons.org/) and [lucide-react](https://lucide.dev/)
