import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  className,
  disabled,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    // #6C737F #121315
    <button
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
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
