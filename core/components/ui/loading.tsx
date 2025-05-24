import React from "react";
import { cn } from "@/core/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const loadingVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const pureVariants = cva(undefined, {
  variants: {
    opacity: {
      none: "",
      low: "bg-white/20 dark:bg-black/20",
      medium: "bg-white/40 dark:bg-black/40",
      high: "bg-white/60 dark:bg-black/60",
      full: "bg-white/100 dark:bg-black/100",
    },
    blur: {
      none: "",
      xs: "backdrop-blur-xs",
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    },
  },
  defaultVariants: {
    opacity: "medium",
    blur: "md"
  }
})

type LoadingProps = React.PropsWithChildren<
  VariantProps<typeof loadingVariants> & {
    isLoading?: boolean;
    fullscreen?: boolean;
    className?: string;
    zIndex?: number;
    spinClassName?: string;
    /**
     * Use when have children without fullscreen active.
     */
    rootClassName?: string;
  } &
  VariantProps<typeof pureVariants>
>;

function Loading({
  isLoading = false,
  size,
  fullscreen = false,
  zIndex = 1000,
  opacity,
  children,
  className,
  spinClassName,
  rootClassName,
  blur = "xs",
}: LoadingProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  const spinner = (
    <svg
      className={cn(loadingVariants({ size }), spinClassName)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="gray"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="30"
        className="animate-spin origin-center"
      />
    </svg>
  );

  const overlayStyle = { zIndex };

  if (fullscreen) {
    return (
      <>
        {children}
        <div
          className={cn("fixed inset-0 flex items-center justify-center",
            pureVariants({ opacity, blur, className }),
          )}
          style={overlayStyle}
        >
          {spinner}
        </div>
      </>
    );
  }

  if (children) {
    return (
      <div className={cn("relative", rootClassName)}>
        {children}
        <div
          className={cn("absolute inset-0 flex items-center justify-center",
            pureVariants({ opacity, blur, className }),
          )}
          style={overlayStyle}
        >
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}

export { Loading, loadingVariants };
