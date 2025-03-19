import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow disabled:opacity-20 hover:opacity-80",
        secondary:
          "bg-transparent border border-blue-100 text-blue-300 hover:border-blue-400 hover:text-blue-400 active:border-blue-400 active:text-blue-400",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        transparent: "hover:text-accent-foreground",
        transparentGray: "hover:opacity-100 opacity-20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "py-1 px-[6px] text-xs font-semibold",
        md: "px-2.5 py-2 text-sm font-semibold",
        lg: "w-full py-3 text-sm font-medium",
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
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, shape, asChild = false, ...rest },
  ref
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, shape, className }))}
      ref={ref}
      {...rest}
    />
  );
});

Button.displayName = "Button";

export default Button;
