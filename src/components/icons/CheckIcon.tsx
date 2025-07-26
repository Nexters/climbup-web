import type { SVGProps } from "react";

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  variant?: "dark" | "white";
}

export default function CheckIcon({
  variant = "dark",
  ...props
}: CheckIconProps) {
  const stroke = variant === "dark" ? "#121315" : "#FCFCFD";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Check icon"
      role="img"
      {...props}
    >
      <path
        d="M20 6L9 17L4 12"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
