import plugin from "tailwindcss/plugin";

const scrollbarHide = plugin(({ addUtilities }) => {
  addUtilities({
    ".scrollbar-hide": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });
});

export default scrollbarHide;
