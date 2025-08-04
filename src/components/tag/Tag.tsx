import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type TagVariant = "blue" | "red" | "green" | "neutral";

interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
}

const tagVariants: Record<TagVariant, string> = {
  blue: "bg-blue-200 text-blue-900",
  red: "bg-red-200 text-red-900",
  green: "bg-green-200 text-green-900",
  neutral: "bg-neutral-300 text-neutral-600",
};

export const Tag = ({ variant = "neutral", children, className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "px-1.5 py-0.5 rounded-3xl",
        "text-xs font-semibold leading-normal tracking-tight text-center",
        "w-fit",
        tagVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
