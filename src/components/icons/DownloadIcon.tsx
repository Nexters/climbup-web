import type { SVGProps } from "react";
import { cn } from "@/utils/cn";

interface DownloadIconProps extends SVGProps<SVGSVGElement> {
  variant?: "default" | "white";
  size?: number;
}

export default function DownloadIcon({
  variant = "default",
  size = 20,
  className,
  ...props
}: DownloadIconProps) {
  const strokeColor = variant === "white" ? "#FFFFFF" : "#d2d6db";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      aria-label="다운로드"
      role="img"
      {...props}
    >
      <title>다운로드</title>
      <path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10L12 15L17 10"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15V3"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
