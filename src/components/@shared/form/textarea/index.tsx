import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// cva를 사용하여 textarea 스타일 정의
const textareaVariants = cva(
  "flex w-full rounded-md bg-primary-foreground text-sm placeholder:text-primary-normal03 focus-visible:outline-1 focus-visible:outline-primary-normal03 disabled:cursor-not-allowed disabled:opacity-50",
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
      padding: {
        default: "p-5",
        sm: "p-4",
        xs: "p-3",
      },
      size: {
        fixed: "h-80",
        auto: "h-24 focus:h-80",
      },
    },
    defaultVariants: {
      font: "sm_sb",
      padding: "default",
      size: "fixed",
    },
  }
);

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>
>(({ className, font, padding, size, ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants({ font, padding, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
