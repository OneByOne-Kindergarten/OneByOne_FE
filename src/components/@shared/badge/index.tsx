import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "destructive" | "outline";
}

export default function Badge({
  className,
  variant = "primary",
  ...props
}: BadgeProps) {
  const baseClasses =
    "w-fit items-center rounded-full  px-2.5 py-0.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xxs ";

  const variantClasses = {
    primary:
      "bg-tertiary-1 outline-tertiary-2 outline outline-1 hover:bg-secondary/80 text-tertiary-3",
    secondary: "bg-primary-foreground text-primary-dark01",
    destructive:
      "outline-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className || ""}`}
      {...props}
    />
  );
}
