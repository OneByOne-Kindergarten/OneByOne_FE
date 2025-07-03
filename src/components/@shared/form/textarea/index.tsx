import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

// cva를 사용하여 textarea 스타일 정의
const textareaVariants = cva(
  "flex w-full resize-none border border-transparent rounded-lg bg-primary-foreground text-sm placeholder:text-primary-normal03 outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
      error: {
        true: "border border-destructive",
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
>(({ className, font, padding, size, error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        textareaVariants({ font, padding, size, error, className })
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
