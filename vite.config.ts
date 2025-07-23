import { tanstackRouter } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tanstackRouter({
      routesDirectory: "./src/routes",
    }),
  ],
  server: {
    allowedHosts: ["0cfb2f639498.ngrok-free.app"],
  },
  define: {
    __MSW_ENABLED__: JSON.stringify(process.env.MSW_ENABLED === "true"),
  },
});
