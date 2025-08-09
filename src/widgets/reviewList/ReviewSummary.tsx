import { StarRating } from "@/common/ui/rating/star-rating";
import { cn } from "@/common/utils/cn";
import { formatDate } from "@/common/utils/dateUtils";

interface ReviewSummaryProps {
  rating: number;
  title: string;
  workType: string;
  createdAt: string;
  workYear: string;
  className?: string;
}

export default function ReviewSummary({
  rating,
  title,
  workType,
  createdAt,
  workYear,
  className,
}: ReviewSummaryProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <StarRating value={rating} />
        <span className="text-sm font-semibold">
          {Number(rating).toFixed(1)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-pretty font-semibold">{title}</h2>
        <p className="text-xxs text-primary-normal03">
          {workType && (
            <>
              {workType} <span aria-hidden="true">│</span>
            </>
          )}
          {formatDate(createdAt)} 작성
          {workYear && (
            <>
              <span aria-hidden="true">│</span> {workYear}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
