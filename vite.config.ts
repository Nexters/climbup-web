import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-vite-plugin";

export default defineConfig({
  plugins: [react(), tanstackRouter()],
});
