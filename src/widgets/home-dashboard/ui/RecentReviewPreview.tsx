import { useNavigate } from "react-router-dom";

import type { WorkReview } from "@/entities/review/DTO.d";
import { useGetRecentWorkReviews } from "@/entities/review/hooks";
import { REVIEW_TYPES } from "@/shared/constants/review";
import { URL_PATHS } from "@/shared/constants/url-path";
import Empty from "@/shared/ui/layout/empty";
import { cn } from "@/shared/utils/cn";
import { getTotalRating } from "@/widgets/review-list/lib/getTotalRating";
import { getWorkYear } from "@/widgets/review-list/lib/getWorkYear";
import ReviewResource from "@/widgets/review-list/ui/ReviewResource";
import ReviewSummary from "@/widgets/review-list/ui/ReviewSummary";

export default function RecentReviewPreview() {
  const { data: workReviews } = useGetRecentWorkReviews(3);
  const navigate = useNavigate();

  const handleReviewClick = (kindergartenId: number, isWorkReview: boolean) => {
    const reviewType = isWorkReview ? "work" : "learning";
    navigate(
      `${URL_PATHS.KINDERGARTEN_REVIEW.replace(":id", kindergartenId.toString())}?type=${reviewType}`
    );
  };

  const reviews = workReviews?.content || [];

  return (
    <ul className="flex flex-col space-y-3 rounded-lg border border-primary-light02 px-3 py-2">
      {reviews.length > 0 ? (
        reviews.map((review: WorkReview, index: number) => (
          <li key={review.workReviewId} className="">
            <div
              className={cn(
                "rounded-lg px-2 pb-4 pt-2 hover:bg-primary-foreground",
                index < reviews.length - 1
                  ? "border-b border-primary-light01"
                  : ""
              )}
            >
              <ReviewSummary
                rating={getTotalRating(review, REVIEW_TYPES.WORK)}
                title={review.oneLineComment}
                workType={review.workType}
                createdAt={review.createdAt || ""}
                workYear={getWorkYear(review, REVIEW_TYPES.WORK)}
                onClick={() =>
                  handleReviewClick(
                    review.kindergartenId,
                    Boolean(review.workReviewId)
                  )
                }
              />
              <ReviewResource
                kindergartenId={review.kindergartenId.toString()}
                kindergartenName={review.kindergartenName}
                className="mt-3"
              />
            </div>
          </li>
        ))
      ) : (
        <Empty title="아직 등록된 리뷰가 없습니다." />
      )}
    </ul>
  );
}
