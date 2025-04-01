import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex h-fit items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-foreground text-primary-normal03 hover:opacity-80",
        primary: "bg-primary text-white disabled:opacity-50 hover:opacity-80",
        secondary:
          "bg-secondary-main text-primary disabled:bg-primary-normal01 disabled:opacity-40",
        tertiary:
          "bg-transparent border border-blue-100 text-blue-300 disabled:text-primary-normal03 hover:opacity-80 active:border-blue-400 active:text-blue-400",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        transparent:
          "bg-background hover:bg-accent hover:text-accent-foreground",
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
        default: "rounded-md",
        rounded: "rounded-lg",
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
