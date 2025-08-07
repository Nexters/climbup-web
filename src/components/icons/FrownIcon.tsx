import type { SVGProps } from "react";

interface FrownIconProps extends SVGProps<SVGSVGElement> {
  variant?: "white" | "dark";
  width?: number;
  height?: number;
}

export default function FrownIcon({
  variant = "dark",
  width = 16,
  height = 16,
}: FrownIconProps) {
  const color = variant === "white" ? "#FFFFFF" : "#4D5761";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Frown Icon"
      role="img"
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9C6 9 6.5 10 8 10C9.5 10 10 9 10 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6H6.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6H10.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
