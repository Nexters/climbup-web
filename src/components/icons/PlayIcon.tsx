import type { SVGProps } from "react";

interface PlayIconProps extends SVGProps<SVGSVGElement> {
  variant?: "dark" | "white";
}

export default function PlayIcon({
  variant = "dark",
  ...props
}: PlayIconProps) {
  const fill = variant === "dark" ? "#121315" : "#FCFCFD";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Play icon"
      role="img"
      {...props}
    >
      <path
        d="M3.33301 3.83166C3.33301 3.0405 4.20825 2.56266 4.87377 2.99049L11.3578 7.15882C11.9702 7.55246 11.9702 8.44754 11.3578 8.84118L4.87377 13.0095C4.20825 13.4373 3.33301 12.9595 3.33301 12.1683V3.83166Z"
        fill={fill}
      />
    </svg>
  );
}
