import { mkdirSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { summarize } from "./summarize.mjs";
import { writeFileSync } from "node:fs";

const label = process.argv[2] ?? "stylex";
const root = resolve(import.meta.dirname, "../..");
const reportsDir = resolve(root, "performance-results", label);
const outputFile = resolve(root, "docs/performance/data", `${label}.json`);
mkdirSync(reportsDir, { recursive: true });
mkdirSync(resolve(outputFile, ".."), { recursive: true });

const build = spawnSync("bun", ["run", "build"], { cwd: root, stdio: "inherit" });
if (build.status !== 0) process.exit(build.status ?? 1);

const server = spawn(resolve(root, "node_modules/.bin/vite"), ["preview", "--host", "127.0.0.1", "--port", "4173"], { cwd: root, stdio: "inherit" });
try {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try { if ((await fetch("http://127.0.0.1:4173/")).ok) break; } catch {}
    await delay(250);
  }
  for (const device of ["mobile", "desktop"]) {
    for (let run = 1; run <= 5; run += 1) {
      const args = ["lighthouse", "http://127.0.0.1:4173/", "--quiet", "--output=json", `--output-path=${resolve(reportsDir, `${label}-${device}-${run}.json`)}`, "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"];
      if (device === "desktop") args.push("--preset=desktop");
      const audit = spawnSync("bunx", args, { cwd: root, stdio: "inherit" });
      if (audit.status !== 0) throw new Error(`Lighthouse ${device} run ${run} failed`);
    }
  }
  const result = summarize({ label, reportsDir, distDir: resolve(root, "dist") });
  writeFileSync(outputFile, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Wrote ${outputFile}`);
} finally {
  server.kill("SIGTERM");
}
