import type { SVGProps } from "react";

interface ThumbsUpIconProps extends SVGProps<SVGSVGElement> {
  variant?: "white" | "dark";
  width?: number;
  height?: number;
}

export default function ThumbsUpIcon({
  variant = "dark",
  width = 16,
  height = 16,
}: ThumbsUpIconProps) {
  const color = variant === "white" ? "#FFFFFF" : "#4D5761";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Thumbs Up Icon"
      role="img"
    >
      <path
        d="M4.66634 14.6663H2.66634C2.31272 14.6663 1.97358 14.5259 1.72353 14.2758C1.47348 14.0258 1.33301 13.6866 1.33301 13.333V8.66634C1.33301 8.31272 1.47348 7.97358 1.72353 7.72353C1.97358 7.47348 2.31272 7.33301 2.66634 7.33301H4.66634M9.33301 5.99967V3.33301C9.33301 2.80257 9.12229 2.29387 8.74722 1.91879C8.37215 1.54372 7.86344 1.33301 7.33301 1.33301L4.66634 7.33301V14.6663H12.1863C12.5079 14.67 12.8199 14.5573 13.0649 14.349C13.31 14.1407 13.4715 13.8509 13.5197 13.533L14.4397 7.53301C14.4687 7.34191 14.4558 7.1468 14.4019 6.96118C14.348 6.77556 14.2544 6.60387 14.1276 6.45802C14.0008 6.31216 13.8437 6.19563 13.6674 6.11649C13.4911 6.03734 13.2996 5.99749 13.1063 5.99967H9.33301Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
