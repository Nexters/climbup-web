import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "./tailwind-config/colors";
import scrollbarHide from "./tailwind-config/scroll-hide";
import typography from "./tailwind-config/typography";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [
    scrollbarHide,
    plugin(({ addComponents }) => {
      addComponents(typography);
    }),
    plugin(function({ addUtilities }) {
      addUtilities({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    }),
  ],
  safelist: [...Object.keys(typography)],
};

export default config;
