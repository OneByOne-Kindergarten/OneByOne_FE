import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const squareVariants = cva("cursor-pointer transition-colors", {
  variants: {
    size: {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-10 h-10",
    },
    selected: {
      true: "bg-tertiary-2",
      false: "bg-primary-light02",
    },
  },
  defaultVariants: {
    size: "md",
    selected: false,
  },
});

export interface RatingSquareProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof squareVariants> {
  value: number;
  isSelected?: boolean;
}

export const RatingSquare = React.memo(
  ({
    className,
    value,
    size,
    isSelected = false,
    onClick,
    ...props
  }: RatingSquareProps) => {
    return (
      <div
        className={cn(
          squareVariants({ size, selected: isSelected, className })
        )}
        onClick={onClick}
        aria-selected={isSelected}
        role="button"
        tabIndex={0}
        data-value={value}
        {...props}
      />
    );
  }
);

RatingSquare.displayName = "RatingSquare";

export interface RatingGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export const SquareRatingGroup = React.memo(
  ({
    value,
    onChange,
    max = 5,
    size = "md",
    className,
    ...props
  }: RatingGroupProps) => {
    const handleRatingClick = React.useCallback(
      (rating: number) => {
        onChange(rating);
      },
      [onChange]
    );

    return (
      <div className={cn("flex gap-2", className)} {...props}>
        {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
          <RatingSquare
            key={rating}
            value={rating}
            size={size}
            isSelected={rating <= value}
            onClick={() => handleRatingClick(rating)}
          />
        ))}
      </div>
    );
  }
);
