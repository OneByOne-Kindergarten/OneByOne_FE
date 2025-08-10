import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/utils/cn";

const toggleVariants = cva(
  "inline-flex h-fit items-center justify-center gap-1 transition-colors hover:bg-primary-foreground active:bg-primary-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        primary:
          "bg-primary-foreground text-primary-normal03 data-[state=on]:bg-secondary-main hover:bg-muted ",
      },
      border: {
        gray: "border border-primary-normal01",
        none: "border-none",
      },
      size: {
        xs: "py-0.5 px-1",
        sm: "py-0.5 px-1.5",
        md: "px-3 py-2",
        lg: "px-3.5 py-2.5",
      },
      shape: {
        default: "rounded-lg",
        rounded: "rounded-xl",
        full: "rounded-full",
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
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      border: "none",
      shape: "default",
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, shape, font, border, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      toggleVariants({ variant, size, shape, font, border, className })
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export default Toggle;
