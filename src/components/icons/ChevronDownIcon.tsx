import type { SVGProps } from "react";

interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
  variant?: "dark" | "white";
}

export default function ChevronDownIcon({
  variant = "white",
  ...props
}: ChevronDownIconProps) {
  const stroke = variant === "dark" ? "#121315" : "#FCFCFD";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chevron down icon"
      role="img"
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
