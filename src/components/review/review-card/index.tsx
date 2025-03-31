import { StarRating } from "@/components/@shared/rating/star-rating";
import { BoxRatingGroup } from "@/components/@shared/rating/box-rating";
import { useState } from "react";

interface ReviewCardProps {
  review: {
    id: number;
    title: string;
    type: string;
    createdAt: string;
    shareCount: number;
    likeCount: number;
    workYear: string;
    rating: {
      total: number;
    };
    reviewScore: {
      welfare: number;
      workLabel: number;
      atmosphere: number;
      manager: number;
      customer: number;
    };
    content: {
      welfare: string;
      workLabel: string;
      atmosphere: string;
      manager: string;
      customer: string;
    };
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + " …";
  };

  const getDisplayText = (text: string) => {
    return isExpanded ? text : truncateText(text);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <StarRating value={review.rating.total} />
          <span className="text-sm font-semibold">{review.rating.total}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">{review.title}</h2>
          <p className="text-xxs text-primary-normal03">
            <span>{review.type}</span> | <span>{review.createdAt}</span> |{" "}
            <span>{review.workYear}</span>
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        <li className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center">
            <h3 className="font-semibold w-14">복지/급여</h3>
            <BoxRatingGroup
              value={review.reviewScore.welfare}
              size="xs"
              className="gap-0.5"
            />
          </div>
          <p className={isExpanded ? "" : "line-clamp-1"}>
            {isExpanded
              ? review.content.welfare
              : truncateText(review.content.welfare)}
          </p>
        </li>
        <li className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center">
            <h3 className="font-semibold w-14">워라벨</h3>
            <BoxRatingGroup
              value={review.reviewScore.workLabel}
              size="xs"
              className="gap-0.5"
            />
          </div>
          <p className={isExpanded ? "" : "line-clamp-1"}>
            {isExpanded
              ? review.content.workLabel
              : truncateText(review.content.workLabel)}
          </p>
        </li>
        <li className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center">
            <h3 className="font-semibold w-14">분위기</h3>
            <BoxRatingGroup
              value={review.reviewScore.atmosphere}
              size="xs"
              className="gap-0.5"
            />
          </div>
          <p className={isExpanded ? "" : "line-clamp-1"}>
            {isExpanded
              ? review.content.atmosphere
              : truncateText(review.content.atmosphere)}
          </p>
        </li>
        <li className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center">
            <h3 className="font-semibold w-14">관리자</h3>
            <BoxRatingGroup
              value={review.reviewScore.manager}
              size="xs"
              className="gap-0.5"
            />
          </div>
          <p className={isExpanded ? "" : "line-clamp-1"}>
            {isExpanded
              ? review.content.manager
              : truncateText(review.content.manager)}
          </p>
        </li>
        <li className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center">
            <h3 className="font-semibold w-14">고객</h3>
            <BoxRatingGroup
              value={review.reviewScore.customer}
              size="xs"
              className="gap-0.5"
            />
          </div>
          <p className={isExpanded ? "" : "line-clamp-1"}>
            {isExpanded
              ? review.content.customer
              : truncateText(review.content.customer)}
          </p>
        </li>
      </ul>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary-normal03 text-xs underline font-semibold"
      >
        {isExpanded ? "접기" : "더보기"}
      </button>
    </div>
  );
}
