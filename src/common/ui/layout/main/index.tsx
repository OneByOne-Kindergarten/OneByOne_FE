import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

/**
 * 페이지 내용 컨테이너
 * @param children
 * @param bg 기본 값 gray
 */

interface MainProps extends VariantProps<typeof mainVariants> {
  children: React.ReactNode;
  className?: string;
}

const mainVariants = cva("h-full", {
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

export default function Main({ children, bg, className }: MainProps) {
  return (
    <main className={`${mainVariants({ bg })} ${className}`}>{children}</main>
  );
}
