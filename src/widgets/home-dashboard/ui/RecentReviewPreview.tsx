import { useNavigate } from "react-router-dom";

import type { WorkReview } from "@/entities/review/DTO.d";
import { useGetRecentWorkReviews } from "@/entities/review/hooks";
import { REVIEW_TYPES } from "@/shared/constants/review";
import Empty from "@/shared/ui/layout/empty";
import { getTotalRating } from "@/widgets/review-list/lib/getTotalRating";
import { getWorkYear } from "@/widgets/review-list/lib/getWorkYear";
import ReviewSummary from "@/widgets/review-list/ui/ReviewSummary";

export default function RecentReviewPreview() {
  const { data: workReviews } = useGetRecentWorkReviews(3);
  const navigate = useNavigate();

  const handleReviewClick = (kindergartenId: number) => {
    navigate(`/kindergarten/${kindergartenId}`);
  };

  const reviews = workReviews?.content || [];

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-primary-light02 px-5 py-4">
      {reviews.length > 0 ? (
        reviews.map((review: WorkReview, index: number) => (
          <div
            key={review.workReviewId}
            className={
              index < reviews.length - 1
                ? "border-b border-primary-light01 pb-5"
                : ""
            }
          >
            <ReviewSummary
              rating={getTotalRating(review, REVIEW_TYPES.WORK)}
              title={review.oneLineComment}
              workType={review.workType}
              createdAt={review.createdAt || ""}
              workYear={getWorkYear(review, REVIEW_TYPES.WORK)}
              onClick={() => handleReviewClick(review.kindergartenId)}
            />
          </div>
        ))
      ) : (
        <Empty title="아직 등록된 리뷰가 없습니다." />
      )}
    </div>
  );
}
