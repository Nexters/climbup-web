import type { Config } from "tailwindcss";
import scrollbarHide from "./tailwind-config/scroll-hide";
import plugin from "tailwindcss/plugin";
import typography from "./tailwind-config/typography";
import colors from "./tailwind-config/colors";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [
    scrollbarHide,
    plugin(function({ addComponents }) {
      addComponents(typography);
    }),
  ],
  safelist: [...Object.keys(typography)],
};

export default config;
