import { gzipSync } from "node:zlib";
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

const metrics = {
  performanceScore: (lhr) => lhr.categories.performance.score * 100,
  ttfbMs: (lhr) => lhr.audits["server-response-time"].numericValue,
  fcpMs: (lhr) => lhr.audits["first-contentful-paint"].numericValue,
  lcpMs: (lhr) => lhr.audits["largest-contentful-paint"].numericValue,
  speedIndexMs: (lhr) => lhr.audits["speed-index"].numericValue,
  tbtMs: (lhr) => lhr.audits["total-blocking-time"].numericValue,
  cls: (lhr) => lhr.audits["cumulative-layout-shift"].numericValue,
  transferBytes: (lhr) => lhr.audits["total-byte-weight"].numericValue,
  requestCount: (lhr) => lhr.audits["network-requests"].details.items.length,
  mainThreadMs: (lhr) => lhr.audits["mainthread-work-breakdown"].numericValue,
  unusedCssBytes: (lhr) => lhr.audits["unused-css-rules"].details?.overallSavingsBytes ?? 0,
  unusedJsBytes: (lhr) => lhr.audits["unused-javascript"].details?.overallSavingsBytes ?? 0,
};

const round = (value) => Math.round(value * 1000) / 1000;
const stats = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return { min: round(sorted[0]), median: round(sorted[Math.floor(sorted.length / 2)]), max: round(sorted.at(-1)) };
};

function assetSummary(distDir) {
  const assetDir = join(distDir, "assets");
  const files = readdirSync(assetDir)
    .filter((file) => [".css", ".js"].includes(extname(file)))
    .map((file) => {
      const contents = readFileSync(join(assetDir, file));
      return { file, type: extname(file).slice(1), rawBytes: statSync(join(assetDir, file)).size, gzipBytes: gzipSync(contents).length };
    });
  const totals = Object.fromEntries(["css", "js"].map((type) => {
    const selected = files.filter((file) => file.type === type);
    return [type, { rawBytes: selected.reduce((sum, file) => sum + file.rawBytes, 0), gzipBytes: selected.reduce((sum, file) => sum + file.gzipBytes, 0) }];
  }));
  totals.combined = { rawBytes: totals.css.rawBytes + totals.js.rawBytes, gzipBytes: totals.css.gzipBytes + totals.js.gzipBytes };
  return { files, totals };
}

export function summarize({ label, reportsDir, distDir }) {
  const devices = {};
  for (const device of ["mobile", "desktop"]) {
    const runs = Array.from({ length: 5 }, (_, index) => {
      const file = join(reportsDir, `${label}-${device}-${index + 1}.json`);
      const lhr = JSON.parse(readFileSync(file, "utf8"));
      return Object.fromEntries(Object.entries(metrics).map(([name, getValue]) => [name, round(getValue(lhr))]));
    });
    const aggregate = Object.fromEntries(Object.keys(metrics).map((name) => [name, stats(runs.map((run) => run[name]))]));
    const medianLhr = JSON.parse(readFileSync(join(reportsDir, `${label}-${device}-3.json`), "utf8"));
    const opportunities = Object.values(medianLhr.audits)
      .filter((audit) => audit.details?.type === "opportunity" && audit.score !== null && audit.score < 1)
      .map((audit) => ({ id: audit.id, title: audit.title, savingsMs: round(audit.details.overallSavingsMs ?? 0), savingsBytes: round(audit.details.overallSavingsBytes ?? 0) }));
    devices[device] = { runs, aggregate, opportunities };
  }
  return { schemaVersion: 1, label, capturedAt: new Date().toISOString(), samplesPerDevice: 5, devices, assets: assetSummary(distDir) };
}

if (process.argv[1]?.endsWith("summarize.mjs")) {
  const [, , label, reportsDir, distDir, outputFile] = process.argv;
  if (!label || !reportsDir || !distDir || !outputFile) throw new Error("Usage: summarize.mjs <label> <reports-dir> <dist-dir> <output-file>");
  const result = summarize({ label, reportsDir: resolve(reportsDir), distDir: resolve(distDir) });
  mkdirSync(resolve(outputFile, ".."), { recursive: true });
  writeFileSync(resolve(outputFile), `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Wrote ${basename(outputFile)}`);
}
