import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const mainVariants = cva("h-full pb-14", {
  variants: {
    bg: {
      white: "bg-white",
      gray: "bg-primary-foreground",
    },
  },
  defaultVariants: {
    bg: "gray",
  },
});

interface MainProps extends VariantProps<typeof mainVariants> {
  children: React.ReactNode;
  className?: string;
}

export default function Main({ children, bg, className }: MainProps) {
  return (
    <main className={`${mainVariants({ bg })} ${className}`}>{children}</main>
  );
}
