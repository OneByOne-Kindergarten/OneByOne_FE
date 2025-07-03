import { useState } from "react";

import ReviewActions from "@/components/review/ReviewActions";
import ReviewContent, {
  ReviewFieldConfig,
} from "@/components/review/ReviewContent";
import ReviewRating from "@/components/review/ReviewRating";
import { REVIEW_TYPES } from "@/constants/review";
import { useReviewLike } from "@/hooks/useReviewLike";
import type { InternshipReview, WorkReview } from "@/types/reviewDTO";
import { formatDate } from "@/utils/dateUtils";

import ReportDropDown from "../@shared/drop-down/report-drop-down";

export type ReviewData = InternshipReview | WorkReview;

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

  // 타입에 따른 총점 계산
  const getTotalRating = (review: ReviewData, type: string): number => {
    if (type === REVIEW_TYPES.WORK && "workReviewId" in review) {
      return (
        (review.benefitAndSalaryScore +
          review.workLifeBalanceScore +
          review.workEnvironmentScore +
          review.managerScore +
          review.customerScore) /
        5
      );
    } else if ("internshipReviewId" in review) {
      return (
        (review.workEnvironmentScore +
          review.learningSupportScore +
          review.instructionTeacherScore) /
        3
      );
    }
    return 0;
  };

  const getWorkYear = (review: ReviewData, type: string): string => {
    if (type === REVIEW_TYPES.WORK && "workReviewId" in review) {
      switch (review.workYear) {
        case 1:
          return "2년 이내 근무";
        case 2:
          return "2-5년 전 근무";
        case 3:
          return "근무한지 오래됨";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-start justify-between">
        <ReviewRating
          rating={getTotalRating(review, type)}
          title={review.oneLineComment}
          workType={review.workType}
          createdAt={formatDate(review.createdAt || new Date().toISOString())}
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
