import { Slot } from "radix-ui";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "black" | "white";
}

export default function Button({
  className,
  disabled,
  children,
  asChild = false,
  variant = "black",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Slot : "button";

  return (
    <Component
      className={cn(
        "w-fit px-9 py-4 rounded-[32px] transition-colors t-p-14-sb",
        "inline-flex items-center justify-center gap-[10px]",
        "shadow-[2px_2px_16px_0_rgba(0,0,0,0.4)]",
        {
          "bg-neutral-800 text-neutral-100 active:bg-neutral-900":
            !disabled && variant === "black",
          "bg-neutral-100 text-neutral-800 active:bg-neutral-300 active:shadow-[2px_2px_8px_0_rgba(0,0,0,0.4)]":
            !disabled && variant === "white",
          "bg-neutral-400 text-neutral-500 cursor-not-allowed": disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
}
