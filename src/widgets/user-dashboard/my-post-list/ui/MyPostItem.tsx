import { Link, useNavigate } from "react-router-dom";

import { REVIEW_TYPES } from "@/shared/constants/review";
import { URL_PATHS } from "@/shared/constants/url-path";
import DropDown from "@/shared/ui/drop-down/base-drop-down";
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
  const navigate = useNavigate();
  const review = data[index];

  const reviewType =
    "workReviewId" in review ? REVIEW_TYPES.WORK : REVIEW_TYPES.LEARNING;

  const reviewUrl = `${URL_PATHS.KINDERGARTEN_REVIEW.replace(":id", review.kindergartenId.toString())}?type=${reviewType}`;

  const handleEdit = () => {
    // 리뷰 데이터를 URL 파라미터로 전달
    const reviewData = encodeURIComponent(JSON.stringify(review));
    navigate(
      `/kindergarten/${review.kindergartenId}/review/edit?type=${reviewType}&data=${reviewData}`
    );
  };

  return (
    <Link to={reviewUrl} style={style} className="relative">
      <ReviewSummary
        rating={getTotalRating(review, reviewType)}
        title={review.oneLineComment}
        workType={review.workType}
        createdAt={review.createdAt || ""}
        workYear={getWorkYear(review, reviewType)}
        className="mx-5 border-b border-primary-light02 py-4 pr-10 hover:opacity-70"
      />
      <div
        className="absolute right-5 top-4"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DropDown
          options={[
            {
              label: "수정하기",
              onClick: handleEdit,
            },
          ]}
          position="bottom"
          align="end"
        />
      </div>
    </Link>
  );
}
