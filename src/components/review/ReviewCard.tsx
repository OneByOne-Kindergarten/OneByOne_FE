import { useState } from "react";

import ReportDropDown from "@/components/@shared/drop-down/report-drop-down";
import ReviewActions from "@/components/review/ReviewActions";
import ReviewContent, {
  ReviewFieldConfig,
} from "@/components/review/ReviewContent";
import ReviewSummary from "@/components/review/ReviewSummary";
import { useReviewLike } from "@/hooks/useReviewLike";
import { getTotalRating, getWorkYear, ReviewData } from "@/utils/reviewUtils";

export type { ReviewData };

export interface ReviewCardProps {
  review: ReviewData | ReviewData[];
  fieldConfigs: ReviewFieldConfig[];
  type: string;
}

function ReviewCardItem({
  review,
  fieldConfigs,
  type,
}: {
  review: ReviewData;
  fieldConfigs: ReviewFieldConfig[];
  type: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { handleLike, isPending, isLiked } = useReviewLike(
    type,
    "workReviewId" in review ? review.workReviewId : review.internshipReviewId
  );

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-start justify-between">
        <ReviewSummary
          rating={getTotalRating(review, type)}
          title={review.oneLineComment}
          workType={review.workType}
          createdAt={review.createdAt || ""}
          workYear={getWorkYear(review, type)}
        />
        <ReportDropDown
          targetId={
            "workReviewId" in review
              ? review.workReviewId
              : review.internshipReviewId
          }
          targetType="REVIEW"
        />
      </div>
      <ReviewContent
        review={review}
        type={type}
        fieldConfigs={fieldConfigs}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />
      <div className="flex justify-end">
        <ReviewActions
          likeCount={review.likeCount || 0}
          onLike={handleLike}
          isPending={isPending}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
}

export default function ReviewCard({
  review,
  fieldConfigs,
  type,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {Array.isArray(review) ? (
        review.map((item) => (
          <ReviewCardItem
            key={
              "workReviewId" in item
                ? item.workReviewId
                : item.internshipReviewId
            }
            review={item}
            fieldConfigs={fieldConfigs}
            type={type}
          />
        ))
      ) : (
        <ReviewCardItem
          review={review}
          fieldConfigs={fieldConfigs}
          type={type}
        />
      )}
    </div>
  );
}
