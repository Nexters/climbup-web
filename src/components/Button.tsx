import { Slot } from "radix-ui";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export default function Button({
  className,
  disabled,
  children,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Slot : "button";

  return (
    <Component
      className={cn(
        "w-fit px-9 py-4 rounded-[32px] transition-colors",
        "inline-flex items-center justify-center gap-[10px]",
        "shadow-[2px_2px_16px_0_rgba(0,0,0,0.4)]",
        {
          "bg-neutral-800 text-neutral-100 active:bg-neutral-900": !disabled,
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
