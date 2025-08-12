import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/utils/cn";

const badgeVariants = cva(
  "w-fit inline-flex items-center rounded-full my-auto transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary-foreground !text-primary-dark01",
        secondary:
          "bg-secondary-light03 outline outline-1 outline-secondary-main",
        tertiary:
          "bg-tertiary-1 outline outline-1 outline-tertiary-2 hover:bg-secondary/80 !text-tertiary-3",
      },
      size: {
        md: "px-2 py-0.5",
        lg: "p-2.5 py-1",
      },
      font: {
        xxs: "text-xxs",
        xs: "text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      font: "xs",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export default function Badge({
  className,
  variant,
  size,
  font,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(className, badgeVariants({ variant, size, font }))}
      {...props}
    />
  );
}
