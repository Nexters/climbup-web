import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type TagVariant = "ORANGE" | "BLUE" | "RED" | "GREEN" | "NEUTRAL";

interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
}

const tagVariants: Record<TagVariant, string> = {
  ORANGE: "bg-orange-200 text-orange-900",
  BLUE: "bg-blue-200 text-blue-900",
  RED: "bg-red-200 text-red-900",
  GREEN: "bg-green-200 text-green-900",
  NEUTRAL: "bg-neutral-300 text-neutral-600",
};

export const Tag = ({ variant = "NEUTRAL", children, className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "px-1.5 py-0.5 rounded-3xl",
        "t-p-10-sb",
        "w-fit",
        tagVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
