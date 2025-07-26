import type { SVGProps } from "react";

interface CloseIconProps extends SVGProps<SVGSVGElement> {
  variant?: "dark" | "white";
}

export default function CloseIcon({
  variant = "dark",
  ...props
}: CloseIconProps) {
  const stroke = variant === "dark" ? "#121315" : "#FCFCFD";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Close icon"
      role="img"
      {...props}
    >
      <path
        d="M18 6L6 18"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
