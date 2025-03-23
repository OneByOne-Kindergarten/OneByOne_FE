import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-foreground text-primary-normal03 disabled:opacity-20 hover:opacity-80",
        secondary:
          "bg-secondary-main text-primary disabled:opacity-20 hover:opacity-80",
        tertiary:
          "bg-transparent border border-blue-100 text-blue-300 hover:border-blue-400 hover:text-blue-400 active:border-blue-400 active:text-blue-400",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        transparent: "hover:text-accent-foreground",
        transparent_gray: "hover:opacity-100 opacity-20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      border: {
        gray: "border border-primary-normal01",
        black: "border border-primary",
        none: "border-none",
      },
      shadow: {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      size: {
        sm: "py-1 px-[6px]",
        md: "px-2.5 py-2",
        lg: "w-full py-3",
      },
      font: {
        xs_sb: "text-xs font-semibold",
        sm_sb: "text-sm font-semibold",
        sm_md: "text-sm",
        md_sb: "text-md font-semibold",
        md_md: "text-md font-medium",
        lg_sb: "text-lg font-semibold",
        lg_md: "text-lg font-medium",
      },

      shape: {
        default: "rounded-lg",
        rounded: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "default",
      border: "none",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, shape, border, shadow, asChild = false, ...rest },
  ref
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, shape, border, shadow, className })
      )}
      ref={ref}
      {...rest}
    />
  );
});

Button.displayName = "Button";

export default Button;
