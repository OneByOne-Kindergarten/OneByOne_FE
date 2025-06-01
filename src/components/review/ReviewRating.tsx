import { StarRating } from "@/components/@shared/rating/star-rating";

interface ReviewRatingProps {
  rating: number;
  title: string;
  workType: string;
  createdAt: string;
  workYear: string;
}

export default function ReviewRating({
  rating,
  title,
  workType,
  createdAt,
  workYear,
}: ReviewRatingProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <StarRating value={rating} />
        <span className="text-sm font-semibold">
          {Number(rating).toFixed(1)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-pretty">{title}</h2>
        <p className="text-xxs text-primary-normal03">
          {workType} <span aria-hidden="true">│</span> {createdAt} 작성
          <span aria-hidden="true">│</span> {workYear}
        </p>
      </div>
    </div>
  );
}
