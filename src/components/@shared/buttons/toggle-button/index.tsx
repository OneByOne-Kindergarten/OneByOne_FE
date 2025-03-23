import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        primary:
          "bg-primary-foreground text-primary-normal03 data-[state=on]:bg-secondary-main",
        transparent_gray: "hover:opacity-100 opacity-20",
      },
      border: {
        default: "border border-primary-normal01",
        none: "border-none",
      },
      size: {
        default: "px-3 py-2",
        sm: "py-1 px-[6px]",
        lg: "h-10 px-2.5 min-w-10",
      },
      shape: {
        full: "rounded-full",
        md: "rounded-md",
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
      size: "default",
      border: "none",
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

export { Toggle, toggleVariants };
