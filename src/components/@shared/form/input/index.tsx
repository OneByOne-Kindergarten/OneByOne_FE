import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariants = cva(
  "flex max-h-11 w-full rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-foreground text-primary placeholder:text-primary-normal03 focus-visible:outline-1 focus-visible:outline-primary-normal03 ",
        outline:
          "bg-white border border-primary-dark01 placeholder:text-primary-normal03 focus-visible:outline-none",
      },
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
        xs: "py-2 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      font: "sm",
      size: "default",
    },
  }
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & VariantProps<typeof inputVariants>
>(({ className, font, size, variant, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ font, size, variant, className }))}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
