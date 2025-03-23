import * as React from "react";

import { cn } from "@/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md bg-primary-foreground text-primary p-5 text-sm transition-colors focus-visible:outline-1 focus-visible:outline-primary-normal03 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-primary-normal03 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
