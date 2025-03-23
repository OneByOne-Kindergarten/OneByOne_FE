import React from "react";
import { SVG_PATHS } from "@/constants/assets-path";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const StarIcon = React.memo(
  ({
    filled = false,
    className,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { filled?: boolean }) => (
    <img
      src={filled ? SVG_PATHS.STAR.yellow : SVG_PATHS.STAR.gray}
      alt={filled ? "노란색 별" : "회색 별"}
      className={className}
      {...props}
    />
  )
);

StarIcon.displayName = "StarIcon";

// 별점 아이템 스타일
const starRatingVariants = cva("flex items-center cursor-pointer", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// 별 아이콘 스타일
const starIconVariants = cva("text-tertiary-2 transition-all", {
  variants: {
    size: {
      sm: "w-4 h-4",
      lg: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface StarRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof starRatingVariants> {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: "sm" | "lg";
}

export const StarRating = React.memo(
  ({
    value,
    onChange,
    max = 5,
    size = "sm",
    className,
    ...props
  }: StarRatingProps) => {
    const handleRatingChange = React.useCallback(
      (newRating: number) => {
        onChange(newRating);
      },
      [onChange]
    );

    // 별 배열
    const stars = React.useMemo(
      () => Array.from({ length: max }, (_, i) => i + 1),
      [max]
    );

    return (
      <div
        className={cn(starRatingVariants({ size, className }))}
        role="radiogroup"
        aria-label="별점"
        {...props}
      >
        {stars.map((star) => (
          <div
            key={star}
            onClick={() => handleRatingChange(star)}
            role="radio"
            aria-checked={star <= value}
            tabIndex={0}
            className="focus:outline-none focus:ring-2 focus:ring-tertiary-2 focus:ring-opacity-50 rounded-full"
            data-value={star}
          >
            <StarIcon
              filled={star <= value}
              className={starIconVariants({ size })}
            />
          </div>
        ))}
      </div>
    );
  }
);

StarRating.displayName = "StarRating";
