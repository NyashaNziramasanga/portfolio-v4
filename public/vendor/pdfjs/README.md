# Mozilla PDF.js standard viewer

Vendored official generic viewer release **6.3.289**, licensed under Apache-2.0.
Source: https://github.com/mozilla/pdf.js/releases/download/v6.3.289/pdfjs-6.3.289-dist.zip
Archive SHA-256: `98c5832ffe7af4edd59853476a478c0d4d4d76dd49c1701f4c86f7182725cdf9`

The full runtime, worker, images, translations, character maps, fonts, and WASM
assets are kept together. Source maps and the sample paper are omitted. Keep
LICENSE and asset-specific license files. No external viewer service is used.

Local changes: `web/viewer.html` uses the title "Publication reader" and loads
`portfolio-theme.css`, which matches the portfolio shell. The annotation shortcuts are hidden below 560px so the standard Tools menu
remains reachable in narrow embeds. The upstream 350px container minimum is
removed to fit small publication cards. Viewer JavaScript is unchanged.

Hosting: `vercel.json` overrides the site's framing restrictions for
`/vendor/pdfjs/(.*)`, allowing only same-origin embedding. Keep both
`frame-ancestors 'self'` and `X-Frame-Options: SAMEORIGIN`; the global policy
blocks the publication iframe. The scoped policy also permits PDF.js workers,
WebAssembly decoders, and data/blob resources used for fonts, images, and printing.

To update, extract a new official release here, omit source maps and the sample
paper, reapply the title/theme link, and update the version and checksum above.
Verify both publication PDFs, search, page navigation, zoom, and presentation.
