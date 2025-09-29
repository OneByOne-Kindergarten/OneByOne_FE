import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SortType } from "@/entities/review/DTO.d";
import {
  useGetAllInternshipReviews,
  useGetAllWorkReviews,
} from "@/entities/review/hooks";
import { REVIEW_TYPES } from "@/shared/constants/review";
import Toggle from "@/shared/ui/buttons/base-toggle";
import Empty from "@/shared/ui/layout/empty";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";

const SORT_OPTIONS: { type: SortType; label: string }[] = [
  { type: SortType.POPULAR, label: "추천순" },
  { type: SortType.LATEST, label: "최신순" },
];

const REVIEW_TYPE_OPTIONS = [
  { type: REVIEW_TYPES.WORK, label: "근무리뷰" },
  { type: REVIEW_TYPES.LEARNING, label: "실습리뷰" },
];

export default function AllReviewList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewType = searchParams.get("type") || REVIEW_TYPES.WORK;
  const sortType =
    (searchParams.get("sortType") as SortType) || SortType.LATEST;
  const [page] = useState(0);

  // 리뷰 타입에 따라 다른 hook 사용
  const {
    data: workReviewData,
    isLoading: isWorkLoading,
    error: workError,
  } = useGetAllWorkReviews(
    reviewType === REVIEW_TYPES.WORK ? { page, size: 20, sortType } : undefined
  );

  const {
    data: internshipReviewData,
    isLoading: isInternshipLoading,
    error: internshipError,
  } = useGetAllInternshipReviews(
    reviewType === REVIEW_TYPES.LEARNING
      ? { page, size: 20, sortType }
      : undefined
  );

  const handleSortChange = (newSortType: SortType) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortType", newSortType);
      return newParams;
    });
  };

  const handleTypeChange = (newType: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("type", newType);
      // 타입 변경 시 정렬 초기화
      newParams.set("sortType", SortType.LATEST);
      return newParams;
    });
  };

  const isLoading = isWorkLoading || isInternshipLoading;
  const error = workError || internshipError;
  const reviewData =
    reviewType === REVIEW_TYPES.WORK ? workReviewData : internshipReviewData;
  const reviews = reviewData?.content || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-sm text-primary-dark01">
          리뷰를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  return (
    <section className="mb-16 mt-2 flex flex-col gap-5 bg-white">
      {/* 리뷰 타입 선택 */}
      <div className="border-b border-b-primary-normal01 px-5 pt-4">
        <div className="flex gap-4 pb-4">
          {REVIEW_TYPE_OPTIONS.map(({ type, label }) => (
            <Toggle
              key={type}
              size="md"
              onClick={() => handleTypeChange(type)}
              className={`px-4 py-2 ${
                reviewType === type
                  ? "bg-primary text-white"
                  : "bg-primary-foreground text-primary-dark02"
              }`}
            >
              {label}
            </Toggle>
          ))}
        </div>
      </div>

      {/* 정렬 옵션 */}
      <div className="px-5">
        <div className="flex items-center gap-2.5 border-b border-b-primary-normal01 pb-4">
          {SORT_OPTIONS.map(({ type: sortOptionType, label }) => (
            <Toggle
              key={sortOptionType}
              size="sm"
              onClick={() => handleSortChange(sortOptionType)}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  sortType === sortOptionType
                    ? "bg-star text-primary"
                    : "bg-primary-normal03"
                }`}
              />
              <span
                className={`text-xs font-semibold ${
                  sortType === sortOptionType
                    ? "text-primary"
                    : "text-primary-normal03"
                }`}
              >
                {label}
              </span>
            </Toggle>
          ))}
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="px-5 pb-4">
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={`${reviewType}-${reviewType === REVIEW_TYPES.WORK ? review.workReviewId : review.internshipReviewId}`}
                className="border-b border-primary-light02 pb-4 last:border-b-0"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-primary-dark02">
                      {review.kindergartenName}
                    </h3>
                    <span className="text-xs text-primary-normal03">
                      {review.createdAt?.split("T")[0]}
                    </span>
                  </div>
                  <p className="text-sm text-primary-dark01">
                    {review.oneLineComment}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary-normal03">
                    <span>{review.workType}</span>
                    <span>•</span>
                    <span>
                      평점{" "}
                      {reviewType === REVIEW_TYPES.WORK
                        ? review.totalRating
                        : review.overallRating}
                      /5
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty
            title="리뷰가 없습니다."
            subTitle={`첫 ${reviewType === REVIEW_TYPES.WORK ? "근무" : "실습"} 리뷰를 남겨보세요!`}
          />
        )}
      </div>
    </section>
  );
}
