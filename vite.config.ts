import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const port = process.env.NODE_ENV === "production" ? 8080 : 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: port,
    strictPort: true,
  },
  server: {
    port: port,
    strictPort: true,
    host: true,
    origin: `http://0.0.0.0:${port}`,
  },
});
