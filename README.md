<div align="center">
<p align="center">
  <a href="https://www.nyashanziramasanga.com/">
    <img src="./public/favicon.svg" alt="Portfolio logo" height="60"/>
  </a>
</p>
    <h1>Online Portfolio v4</h1>
    <p>
      <i>Personal portfolio on <a href="https://www.nyashanziramasanga.com/">nyashanziramasanga.com</a></i>
    </p>
</div>

[![Twitter Follow](https://img.shields.io/twitter/follow/NyashaNziboi.svg?style=social)](https://twitter.com/NyashaNziboi)
![Website](https://img.shields.io/website?down_color=red&url=https%3A%2F%2Fwww.nyashanziramasanga.com%2F)
[![wakatime](https://wakatime.com/badge/user/618747d3-3e85-4a84-b829-c878e16d401a/project/22b25776-2036-48c7-95ac-88b028e82a7b.svg)](https://wakatime.com/badge/user/618747d3-3e85-4a84-b829-c878e16d401a/project/22b25776-2036-48c7-95ac-88b028e82a7b)
![Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)
![License](https://img.shields.io/badge/license-MIT-blue)

![online-portfolio](public/media/online-portfolio-v4.webm)

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

Deployed on [Vercel](https://vercel.com/) from the main branch. Includes [@vercel/analytics](https://vercel.com/docs/analytics) for page view tracking.

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) 5
- [React](https://react.dev/) 18
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Bun](https://bun.sh/)
- [Vercel](https://vercel.com/)
- Icons from [simple-icons](https://simpleicons.org/) and [lucide-react](https://lucide.dev/)

## Previous Version

- [Portfolio v3](https://github.com/NyashaNziramasanga/online-portfolio-v3)

## License

This project is licensed under the [MIT License](LICENSE).
