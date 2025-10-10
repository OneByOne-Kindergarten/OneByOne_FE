import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { SortType } from "@/entities/review/DTO.d";
import {
  useGetAllInternshipReviews,
  useGetAllWorkReviews,
} from "@/entities/review/hooks";
import NavBar from "@/features/nav/ui/NavBar";
import { REVIEW_TYPES } from "@/shared/constants/review";
import Empty from "@/shared/ui/layout/empty";
import ReviewCard from "@/widgets/review-list/ui/ReviewCard";
import SortToggle from "@/widgets/review-list/ui/SortToggle";
import { getFieldConfigsByType } from "@/widgets/review-panel/lib/getFieldConfigsByType";

const REVIEW_TYPE_OPTIONS = [
  { href: `/review?type=${REVIEW_TYPES.WORK}`, label: "근무리뷰" },
  { href: `/review?type=${REVIEW_TYPES.LEARNING}`, label: "실습리뷰" },
];

export default function AllReviewList() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // type이 없으면 work로 설정
  const reviewType = searchParams.get("type") || REVIEW_TYPES.WORK;
  if (!searchParams.get("type")) {
    setSearchParams({ type: REVIEW_TYPES.WORK }, { replace: true });
  }

  const sortType =
    (searchParams.get("sortType") as SortType) || SortType.LATEST;
  const [page] = useState(0);

  // 리뷰 타입에 따라 다른 hook 사용
  const { data: workReviewData } = useGetAllWorkReviews(
    reviewType === REVIEW_TYPES.WORK ? { page, size: 10, sortType } : undefined
  );

  const { data: internshipReviewData } = useGetAllInternshipReviews(
    reviewType === REVIEW_TYPES.LEARNING
      ? { page, size: 10, sortType }
      : undefined
  );

  const handleSortChange = (newSortType: SortType) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortType", newSortType);
      return newParams;
    });
  };

  const reviewData =
    reviewType === REVIEW_TYPES.WORK ? workReviewData : internshipReviewData;
  const reviews = reviewData?.content || [];
  const fieldConfigs = getFieldConfigsByType(reviewType).review;

  return (
    <>
      <NavBar
        options={REVIEW_TYPE_OPTIONS}
        currentPath={location.pathname + location.search}
      />
      <div className="flex flex-col gap-5 pb-4 pt-6">
        <section className="mx-5 border-b border-b-primary-normal01 pb-3">
          <SortToggle
            currentSortType={sortType}
            onSortChange={handleSortChange}
          />
        </section>
        {reviews.length > 0 ? (
          <section>
            <ReviewCard
              review={reviews}
              type={reviewType}
              fieldConfigs={fieldConfigs}
              showResource={true}
              limitItems={3}
            />
          </section>
        ) : (
          <Empty
            title="리뷰가 없습니다."
            subTitle={`첫 ${reviewType === REVIEW_TYPES.WORK ? "근무" : "실습"} 리뷰를 남겨보세요!`}
          />
        )}
      </div>
    </>
  );
}
