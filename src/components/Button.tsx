import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

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
    <button
      className={clsx(
        "w-fit px-9 py-4 rounded-[32px] transition-colors",
        "inline-flex items-center justify-center gap-[10px]",
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
