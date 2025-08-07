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
        d="M8.5 1.5C8.5 1.22386 8.27614 1 8 1C7.72386 1 7.5 1.22386 7.5 1.5V6.5H4.5C4.22386 6.5 4 6.72386 4 7V13.5C4 13.7761 4.22386 14 4.5 14H11.5C11.7761 14 12 13.7761 12 13.5V7C12 6.72386 11.7761 6.5 11.5 6.5H10.5V4.5C10.5 3.67157 9.82843 3 9 3H8.5V1.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
