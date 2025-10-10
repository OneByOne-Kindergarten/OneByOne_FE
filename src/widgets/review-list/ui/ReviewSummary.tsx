import { StarRating } from "@/shared/ui/rating/star-rating";
import { cn } from "@/shared/utils/cn";
import { formatDate } from "@/shared/utils/dateUtils";

interface ReviewSummaryProps {
  rating: number;
  title: string;
  workType: string;
  createdAt: string;
  workYear?: string;
  className?: string;
  onClick?: () => void;
}

export default function ReviewSummary({
  rating,
  title,
  workType,
  createdAt,
  workYear,
  className,
  onClick,
}: ReviewSummaryProps) {
  return (
    <div
      className={cn("flex flex-col gap-3 text-left", className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="flex items-center gap-2">
        <StarRating value={rating} />
        <span className="text-sm font-semibold">
          {Number(rating).toFixed(1)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-2 text-pretty font-semibold text-primary-dark02">
          {title}
        </h2>
        <p className="text-xs text-primary-normal03">
          {workType && (
            <>
              {workType}
              <span className="mx-1 text-xxs" aria-hidden="true">
                │
              </span>
            </>
          )}
          {formatDate(createdAt)} 작성
          {workYear && (
            <>
              <span className="mx-1 text-xxs" aria-hidden="true">
                │
              </span>
              {workYear}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
