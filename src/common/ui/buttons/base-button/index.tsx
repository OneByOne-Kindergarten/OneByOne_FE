import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/common/utils/cn";

const buttonVariants = cva(
  "inline-flex h-fit items-center justify-center gap-2 whitespace-nowrap transition-all hover:opacity-80 active:scale-95 duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-foreground text-primary-normal03",
        primary: "bg-primary-dark02 text-white disabled:opacity-50",
        primary_light: "bg-primary-dark01 text-white disabled:opacity-50",
        secondary:
          "bg-secondary-main text-primary disabled:bg-primary-normal01 disabled:opacity-40",
        tertiary:
          "bg-transparent border border-tertiary-3 text-tertiary-3 disabled:text-primary-normal03 active:border-tertiary-3 active:text-tertiary-3",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        transparent:
          "bg-transparent hover:bg-accent hover:text-accent-foreground",
        transparent_gray: "text-primary-normal03 hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
      },
      border: {
        gray: "border border-primary-normal01",
        blue: "border border-tertiary-2",
        black: "border border-primary",
        none: "border-none",
      },
      shadow: {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      size: {
        xs: "px-1 py-0.5",
        sm: "px-2.5 py-0.5",
        md: "p-2.5",
        lg: "px-3.5 py-2.5",
      },
      font: {
        xs_sb: "text-xs font-semibold",
        xs: "text-xs",
        sm_sb: "text-sm font-semibold",
        sm: "text-sm",
        md_sb: "text-md font-semibold",
        md: "text-md",
        lg_sb: "text-lg font-semibold",
        lg: "text-lg",
      },
      shape: {
        default: "rounded-lg",
        rounded: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "default",
      border: "none",
      font: "md_sb",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    font,
    size,
    shape,
    border,
    shadow,
    asChild = false,
    ...rest
  },
  ref
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          font,
          size,
          shape,
          border,
          shadow,
          className,
        })
      )}
      ref={ref}
      {...rest}
    />
  );
});

Button.displayName = "Button";

export default Button;
