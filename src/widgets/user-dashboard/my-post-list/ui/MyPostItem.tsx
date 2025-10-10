import { Link } from "react-router-dom";

import { REVIEW_TYPES } from "@/shared/constants/review";
import { URL_PATHS } from "@/shared/constants/url-path";
import { getTotalRating } from "@/widgets/review-list/lib/getTotalRating";
import { getWorkYear } from "@/widgets/review-list/lib/getWorkYear";
import ReviewSummary from "@/widgets/review-list/ui/ReviewSummary";
import type { MyReviewData } from "@/widgets/user-dashboard/my-post-list/lib/types";

interface MyPostItemProps {
  data: MyReviewData[];
  index: number;
  style: React.CSSProperties;
}

export default function MyPostItem({ data, index, style }: MyPostItemProps) {
  const review = data[index];

  const reviewType =
    "workReviewId" in review ? REVIEW_TYPES.WORK : REVIEW_TYPES.LEARNING;

  const reviewUrl = `${URL_PATHS.KINDERGARTEN_REVIEW.replace(":id", review.kindergartenId.toString())}?type=${reviewType}`;

  return (
    <Link to={reviewUrl} style={style} className="">
      <ReviewSummary
        rating={getTotalRating(review, reviewType)}
        title={review.oneLineComment}
        workType={review.workType}
        createdAt={review.createdAt || ""}
        workYear={getWorkYear(review, reviewType)}
        className="mx-5 border-b border-primary-light02 py-4 hover:opacity-70"
      />
    </Link>
  );
}
