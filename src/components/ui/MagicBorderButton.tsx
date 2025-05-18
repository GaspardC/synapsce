import React from "react";
import { cn } from "@/lib/utils";

interface MagicBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  containerClassName?: string;
  spanClassName?: string;
  variant?: "default" | "outline";
}

const MagicBorderButton = React.forwardRef<
  HTMLButtonElement,
  MagicBorderButtonProps
>(
  (
    {
      children,
      containerClassName,
      spanClassName,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const isOutline = variant === "outline";
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
          containerClassName,
          isOutline && "p-0"
        )}
        {...props}
      >
        {!isOutline && (
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        )}
        <span
          className={cn(
            "group inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full text-sm font-medium backdrop-blur-3xl",
            isOutline
              ? "bg-transparent border border-slate-400 text-slate-950 hover:bg-slate-100 px-3 py-1"
              : "bg-slate-950 text-white px-3 py-1",
            spanClassName
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

MagicBorderButton.displayName = "MagicBorderButton";

export { MagicBorderButton };
