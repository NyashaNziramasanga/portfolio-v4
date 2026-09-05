# Tailwind-to-StyleX migration performance report

Captured on 4 September 2026 on the same local machine, Chromium/Lighthouse
configuration, production build, and Vite preview server.

## Outcome

The StyleX cutover preserved the existing interface in all 29 desktop and
mobile screenshot states. No lab regression threshold was triggered.

- CSS fell from 51,676 B raw / 9,212 B gzip to 23,748 B raw / 7,521 B gzip.
- Total generated CSS and JavaScript fell by 53,241 B raw and 7,004 B gzip.
- Mobile and desktop performance scores remained 92 and 100 respectively.
- Median FCP and LCP were effectively unchanged (all changes were below 3 ms).
- Median main-thread work fell by 9.8% on mobile and 12.1% on desktop.

These are controlled lab results, not a claim that real-user timings improved
by the same amount.

## Reproducing the lab measurement

Run:

```bash
bun install
bun run perf:collect stylex
```

The harness builds the production app, serves `dist` locally, and starts a
fresh Lighthouse navigation five times for mobile and five times for desktop.
Raw reports are written to ignored `performance-results/<label>/` files and
the summarized result is written to
`docs/performance/data/<label>.json`. Values below are
minimum / median / maximum across five cold-load samples.

The committed source data is:

- [Tailwind baseline](./data/tailwind.json)
- [StyleX result](./data/stylex.json)

## Lab results

### Mobile

| Metric | Tailwind min / median / max | StyleX min / median / max | Median delta | Assessment |
|---|---:|---:|---:|---|
| Performance score | 92 / 92 / 92 | 92 / 92 / 92 | 0 | No change |
| TTFB / server response | 0.665 / 0.740 / 3.904 ms | 0.821 / 0.885 / 1.367 ms | +0.145 ms (+19.6%) | Noise; local server timing is sub-millisecond |
| FCP | 2,038.091 / 2,112.638 / 2,114.814 ms | 2,111.907 / 2,112.426 / 2,123.126 ms | -0.212 ms (-0.01%) | Noise |
| LCP | 3,097.525 / 3,098.297 / 3,100.777 ms | 3,096.888 / 3,097.728 / 3,109.351 ms | -0.569 ms (-0.02%) | Noise |
| Speed Index | 2,038.091 / 2,112.638 / 2,114.814 ms | 2,111.907 / 2,112.426 / 2,123.126 ms | -0.212 ms (-0.01%) | Noise |
| TBT | 0 / 0 / 2 ms | 0 / 0 / 0 ms | 0 ms | No change |
| CLS | 0.001 / 0.001 / 0.001 | 0.001 / 0.001 / 0.001 | 0 | No change |
| Transfer size | 302,988 / 302,988 / 302,988 B | 294,909 / 294,909 / 294,909 B | -8,079 B (-2.67%) | Improvement |
| Requests | 21 / 21 / 21 | 21 / 21 / 21 | 0 | No change |
| Main-thread work | 271.140 / 292.820 / 318.600 ms | 262.260 / 264.016 / 265.748 ms | -28.804 ms (-9.84%) | Improvement |
| Unused CSS finding | 0 / 0 / 0 B | 0 / 0 / 0 B | 0 B | No change |
| Unused JavaScript finding | 33,835 / 33,835 / 33,835 B | 33,835 / 33,835 / 33,835 B | 0 B | No change |

### Desktop

| Metric | Tailwind min / median / max | StyleX min / median / max | Median delta | Assessment |
|---|---:|---:|---:|---|
| Performance score | 100 / 100 / 100 | 100 / 100 / 100 | 0 | No change |
| TTFB / server response | 0.663 / 0.733 / 0.783 ms | 0.705 / 0.767 / 1.099 ms | +0.034 ms (+4.64%) | Noise |
| FCP | 486.961 / 505.496 / 507.523 ms | 485.006 / 505.091 / 505.213 ms | -0.405 ms (-0.08%) | Noise |
| LCP | 648.385 / 649.953 / 650.627 ms | 647.930 / 648.109 / 648.256 ms | -1.844 ms (-0.28%) | Noise |
| Speed Index | 486.961 / 505.496 / 507.523 ms | 485.006 / 505.091 / 505.213 ms | -0.405 ms (-0.08%) | Noise |
| TBT | 0 / 0 / 0 ms | 0 / 0 / 0 ms | 0 ms | No change |
| CLS | 0.002 / 0.002 / 0.002 | 0.002 / 0.002 / 0.002 | 0 | No change |
| Transfer size | 281,946 / 281,946 / 281,946 B | 273,867 / 273,867 / 273,867 B | -8,079 B (-2.87%) | Improvement |
| Requests | 21 / 21 / 21 | 21 / 21 / 21 | 0 | No change |
| Main-thread work | 72.393 / 73.893 / 77.679 ms | 64.104 / 64.940 / 67.120 ms | -8.953 ms (-12.12%) | Improvement |
| Unused CSS finding | 0 / 0 / 0 B | 0 / 0 / 0 B | 0 B | No change |
| Unused JavaScript finding | 33,835 / 33,835 / 33,835 B | 33,835 / 33,835 / 33,835 B | 0 B | No change |

TBT is the lab responsiveness proxy. It must not be presented as field INP.

## Asset attribution

| Asset group | Tailwind raw / gzip | StyleX raw / gzip | Delta |
|---|---:|---:|---:|
| CSS | 51,676 / 9,212 B | 23,748 / 7,521 B | -27,928 B raw (-54.0%); -1,691 B gzip (-18.4%) |
| JavaScript | 553,684 / 190,940 B | 528,371 / 185,627 B | -25,313 B raw (-4.6%); -5,313 B gzip (-2.8%) |
| Combined CSS + JS | 605,360 / 200,152 B | 552,119 / 193,148 B | -53,241 B raw (-8.8%); -7,004 B gzip (-3.5%) |

The main attribution is:

- Tailwind's generated utility sheet was replaced by extracted, minified
  StyleX rules and a small reset layer.
- StyleX's runtime/compiler output was added, while CVA, `clsx`,
  `tailwind-merge`, and the `cn()` helper were removed.
- The shared button chunk fell from 28,439 B raw / 9,152 B gzip to 2,649 B raw
  / 1,482 B gzip. This is the clearest JavaScript reduction and includes the
  removal of the previous variant/class-merging stack.
- The principal application chunk remained 282,053 B raw and changed by 1 B
  gzip. Other route chunks moved by less than 1 kB raw individually. Exact
  hashed-file measurements are retained in the two JSON summaries.
- The StyleX CSS layer is emitted after the `reset` layer. Lightning CSS
  minification is enabled explicitly because the unplugin's extracted rules do
  not pass through Vite's ordinary CSS minifier.

## Lighthouse findings

After minification, Lighthouse reports no unused CSS. Remaining opportunities
are unrelated to the styling cutover:

- Mobile: reduce unused JavaScript (33,835 B; estimated 300 ms under mobile
  throttling). A zero-saving render-blocking diagnostic is also listed.
- Desktop: reduce unused JavaScript (33,835 B; estimated 40 ms) and properly
  size the above-the-fold image (estimated 6,740 B).

The intermediate unminified StyleX build exposed a 2,365 B CSS minification
opportunity. That was investigated and resolved before the final samples.

## Performance-related implementation retained

- Tool implementations are loaded with React `lazy()` and dynamic imports;
  TanStack Router automatic code splitting remains enabled.
- Vite continues to produce separate entry and route chunks.
- Inter is a local variable WOFF2 font with `font-display: swap`.
- Content and media images keep explicit dimensions, lazy loading, and
  asynchronous decoding where applicable.
- Expandable media is lazily mounted. Project video uses metadata-only preload;
  the profile video uses no preload.
- Reduced-motion behavior remains implemented in both the global document rule
  and component-level StyleX media conditions.
- Vercel Analytics and Speed Insights remain enabled.
- Lighthouse CI retains the existing category thresholds: performance 0.95,
  accessibility 1.00, best practices 0.95, and SEO 1.00. CI now runs those
  thresholds for both mobile and desktop.

The standard throttled mobile score is 0.92 in both the Tailwind baseline and
StyleX result, so the newly added mobile job will expose the pre-existing gap
to the retained 0.95 performance threshold. This is not a migration regression;
raising the mobile score is a separate performance task. Desktop and the other
mobile categories meet their retained thresholds.

## Regression gates

A migration regression is flagged when:

- median FCP or LCP worsens by both more than 5% and more than 100 ms;
- median TBT worsens by both more than 10% and more than 50 ms;
- CLS worsens by more than 0.01; or
- combined CSS and JavaScript grows by more than 5 kB gzip.

None fired. FCP and LCP were effectively flat, TBT and CLS were unchanged, and
combined assets shrank by 7,004 B gzip.

## Visual and behavior verification

A one-time local Playwright comparison checked the original Tailwind interface
at 1440×900 and 390×844 with reduced motion, loaded fonts, and paused media.
Coverage included every home section, both tools, mobile navigation, expanded
case-study/publication content, selection state, calculator controls, and
interaction states. The temporary Playwright suite and screenshots were not
retained in the production repository.

The production build was also checked locally for StyleX CSS loading,
keyboard-operable controls, dialogs, scrolling states, responsive layouts, and
development Fast Refresh.

## Production field snapshot

Field data must remain separate from the local Lighthouse results above.
PageSpeed Insights was queried for
`https://nyashanziramasanga.com/` on 4 September 2026 for both device
classes, but the public endpoint returned HTTP 429. No cached or third-party
values were substituted.

| Device | p75 LCP | p75 INP | p75 CLS | p75 FCP | p75 TTFB |
|---|---:|---:|---:|---:|---:|
| Mobile | Unavailable | Unavailable | Unavailable | Unavailable | Unavailable |
| Desktop | Unavailable | Unavailable | Unavailable | Unavailable | Unavailable |

## Post-deployment follow-up

Do not interpret an immediate field-data query as a clean StyleX “after.”
CrUX is a rolling production-data window. On or after 2 October 2026 (28 days
after this capture), query the same live origin for mobile and desktop and add:

| Device | p75 LCP | p75 INP | p75 CLS | p75 FCP | p75 TTFB | Change from 4 Sep |
|---|---:|---:|---:|---:|---:|---|
| Mobile | Pending | Pending | Pending | Pending | Pending | Pending |
| Desktop | Pending | Pending | Pending | Pending | Pending | Pending |

Record unavailable metrics as unavailable, note traffic or deployment changes,
and compare the distributions with the same device classification rather than
mixing field and lab data.
