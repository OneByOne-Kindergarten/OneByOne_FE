import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

export default function Badge({
  className,
  variant = "primary",
  ...props
}: BadgeProps) {
  const baseClasses =
    "w-fit items-center rounded-full  px-2 py-0.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xxs ";

  const variantClasses = {
    primary: "bg-primary-foreground text-primary-dark01",
    secondary: "bg-secondary-light03 outline outline-1 outline-secondary-main",
    tertiary:
      "bg-tertiary-1 outline-tertiary-2 outline outline-1 hover:bg-secondary/80 text-tertiary-3",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className || ""}`}
      {...props}
    />
  );
}
