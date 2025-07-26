import type { SVGProps } from "react";

interface GridIconProps extends SVGProps<SVGSVGElement> {
  variant?: "dark" | "white";
}

export default function GridIcon({
  variant = "dark",
  ...props
}: GridIconProps) {
  const stroke = variant === "dark" ? "#121315" : "#FCFCFD";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grid view icon"
      role="img"
      {...props}
    >
      <path
        d="M10 3H3V10H10V3Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3H14V10H21V3Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14H14V21H21V14Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14H3V21H10V14Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
