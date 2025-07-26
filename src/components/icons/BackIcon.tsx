import type { SVGProps } from "react";

interface BackIconProps extends SVGProps<SVGSVGElement> {
  variant?: "dark" | "white";
}

export default function BackIcon({
  variant = "dark",
  ...props
}: BackIconProps) {
  const stroke = variant === "dark" ? "#121315" : "#FCFCFD";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Back icon"
      role="img"
      {...props}
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
