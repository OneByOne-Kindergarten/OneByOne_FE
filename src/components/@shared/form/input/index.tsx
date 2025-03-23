import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// cva를 사용하여 input 스타일 정의
const inputVariants = cva(
  "flex h-11 w-full rounded-md bg-primary-foreground text-primary transition-colors focus-visible:outline-1 focus-visible:outline-primary-normal03 placeholder:text-primary-normal03 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      font: {
        xs: "text-xs",
        xs_sb: "font-semibold text-xs",
        sm: "text-sm",
        sm_sb: "font-semibold text-sm",
        md: "text-base",
        md_sb: "font-semibold text-base",
        lg: "text-lg",
        lg_sb: "font-semibold text-lg",
      },
      size: {
        default: "p-5",
        sm: "p-4",
        xs: "p-3",
      },
    },
    defaultVariants: {
      font: "sm",
      size: "default",
    },
  }
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & VariantProps<typeof inputVariants>
>(({ className, font, size, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ font, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
