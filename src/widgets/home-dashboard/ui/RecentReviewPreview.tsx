import { Link, useNavigate } from "react-router-dom";

import type { WorkReview } from "@/entities/review/DTO.d";
import { useGetRecentWorkReviews } from "@/entities/review/hooks";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { REVIEW_TYPES } from "@/shared/constants/review";
import { URL_PATHS } from "@/shared/constants/url-path";
import Empty from "@/shared/ui/layout/empty";
import { cn } from "@/shared/utils/cn";
import { getTotalRating } from "@/widgets/review-list/lib/getTotalRating";
import { getWorkYear } from "@/widgets/review-list/lib/getWorkYear";
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
              <Link to={`/kindergarten/${review.kindergartenId}`}>
                <div className="mt-3 flex justify-between rounded-lg bg-primary-foreground p-3 text-left hover:opacity-70 active:opacity-70">
                  <p className="text-xs font-medium text-primary-dark02">
                    {review.kindergartenName}
                  </p>
                  <img
                    src={SVG_PATHS.ARROW.LIGHT}
                    alt="오른쪽 방향 화살표"
                    className="-rotate-90"
                  />
                </div>
              </Link>
            </div>
          </li>
        ))
      ) : (
        <Empty title="아직 등록된 리뷰가 없습니다." />
      )}
    </ul>
  );
}
