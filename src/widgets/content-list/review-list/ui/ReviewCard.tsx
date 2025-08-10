import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { userAtom } from "@/entities/auth/model";
import { useReviewLike } from "@/entities/review/hooks";
import ReviewActions from "@/features/review/ReviewActions";
import Button from "@/shared/ui/buttons/base-button";
import ReportDropDown from "@/shared/ui/drop-down/report-drop-down";
import {
  getTotalRating,
  getWorkYear,
  ReviewData,
} from "@/shared/utils/reviewUtils";
import ReviewContent, {
  ReviewFieldConfig,
} from "@/widgets/content-list/review-list/ui/ReviewContent";
import ReviewSummary from "@/widgets/content-list/review-list/ui/ReviewSummary";

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
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const { id } = useParams();

  const { handleLike, isPending, isLiked } = useReviewLike(
    type,
    "workReviewId" in review ? review.workReviewId : review.internshipReviewId
  );

  const handleWriteReview = () => {
    if (id && user && id !== "unknown") {
      if (user.role === "TEACHER") {
        navigate(`/kindergarten/${id}/review/new?type=work`);
      } else if (user.role === "PROSPECTIVE_TEACHER") {
        navigate(`/kindergarten/${id}/review/new?type=learning`);
      }
    }
  };

  const isContentBlocked = !user?.hasWrittenReview;

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

      {isContentBlocked ? (
        <div className="relative">
          <div className="pointer-events-none opacity-70 blur-sm">
            <ReviewContent
              review={review}
              type={type}
              fieldConfigs={fieldConfigs}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <p className="text-center text-sm font-medium text-primary">
              리뷰를 작성하고 <br /> 전체 리뷰를 확인해보세요!
            </p>
            <Button
              variant="primary"
              size="md"
              font="sm_sb"
              onClick={handleWriteReview}
              className="px-4 text-primary-normal02"
            >
              리뷰쓰기
            </Button>
          </div>
        </div>
      ) : (
        <ReviewContent
          review={review}
          type={type}
          fieldConfigs={fieldConfigs}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
        />
      )}

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
