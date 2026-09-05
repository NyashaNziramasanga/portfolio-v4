import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: {
        before: ["reset"],
        prefix: "stylex",
      },
      lightningcssOptions: {
        minify: true,
      },
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: __dirname,
      },
    }),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    warmup: {
      clientFiles: ["./src/**/*.{ts,tsx}"],
    },
  },
});
