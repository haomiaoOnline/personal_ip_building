import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? "/",
  cacheDir: process.env.VITE_CACHE_DIR ?? ".vite-cache",
  build: {
    outDir: "dist-static",
    emptyOutDir: true,
    target: "es2020",
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
