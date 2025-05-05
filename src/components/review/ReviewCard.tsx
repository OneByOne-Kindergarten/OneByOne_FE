import { useState } from "react";

import LikeToggle from "@/components/@shared/buttons/like-toggle";
import ShareButton from "@/components/@shared/buttons/share-button";
import { StarRating } from "@/components/@shared/rating/star-rating";
import { BoxRatingGroup } from "@/components/@shared/rating/box-rating";

export type ReviewFieldConfig = {
  key: string;
  label: string;
};

export interface ReviewData {
  id: number;
  title: string;
  type: string;
  createdAt: string;
  likeCount: number;
  workYear: string;
  rating: {
    total: number;
  };
  scores: Record<string, number>;
  contents: Record<string, string>;
}

export interface ReviewCardProps {
  review: ReviewData | ReviewData[];
  fieldConfigs: ReviewFieldConfig[];
}

function ReviewCardItem({
  review,
  fieldConfigs,
}: {
  review: ReviewData;
  fieldConfigs: ReviewFieldConfig[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + " …";
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <StarRating value={review.rating.total} />
          <span className="text-sm font-semibold">
            {Number(review.rating.total).toFixed(1)}
          </span>
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
        {fieldConfigs.map((config) => {
          const score = review.scores[config.key] || 0;
          const content = review.contents[config.key] || "";

          return (
            <li key={config.key} className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center">
                <h3 className="font-semibold w-14">{config.label}</h3>
                <BoxRatingGroup value={score} size="xs" className="gap-0.5" />
              </div>
              <p className={isExpanded ? "" : "line-clamp-1"}>
                {isExpanded ? content : truncateText(content)}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-normal03 text-xs text-left underline font-semibold"
        >
          {isExpanded ? "접기" : "더보기"}
        </button>
        <div className="flex gap-2">
          <LikeToggle
            variant="secondary"
            size="sm"
            isCount
            count={review.likeCount}
          >
            도움돼요
          </LikeToggle>
          <ShareButton variant="secondary" size="xs" />
        </div>
      </div>
    </div>
  );
}

export default function ReviewCard({ review, fieldConfigs }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {Array.isArray(review) ? (
        review.map((item) => (
          <ReviewCardItem
            key={item.id}
            review={item}
            fieldConfigs={fieldConfigs}
          />
        ))
      ) : (
        <ReviewCardItem review={review} fieldConfigs={fieldConfigs} />
      )}
    </div>
  );
}
