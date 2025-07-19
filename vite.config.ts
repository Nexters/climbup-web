import { tanstackRouter } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tanstackRouter()],
  server: {
    allowedHosts: ["0cfb2f639498.ngrok-free.app"],
  },
});
