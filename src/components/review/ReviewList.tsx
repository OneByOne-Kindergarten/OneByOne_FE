import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

import Toggle from "@/components/@shared/buttons/base-toggle";
import Empty from "@/components/@shared/layout/empty";
import ReviewCard, { ReviewData } from "@/components/review/ReviewCard";
import { ReviewFieldConfig } from "@/components/review/ReviewContent";
import { REVIEW_TYPES } from "@/constants/review";
import { SortType } from "@/types/reviewDTO";

const SORT_OPTIONS: { type: SortType; label: string }[] = [
  { type: SortType.POPULAR, label: "추천순" },
  { type: SortType.LATEST, label: "최신순" },
];

interface ReviewListProps {
  reviews: ReviewData[];
  fieldConfigs: ReviewFieldConfig[];
  kindergartenName: string;
  initialSortType?: SortType;
}

export default function ReviewList({
  reviews,
  fieldConfigs,
  kindergartenName,
  initialSortType = SortType.LATEST,
}: ReviewListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const currentSortType =
    (searchParams.get("sortType") as SortType) || initialSortType;

  const handleSortChange = (newSortType: SortType) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortType", newSortType);
      return newParams;
    });
  };

  const displayReviews = reviews;

  return (
    <section className="mb-16 mt-2 flex flex-col gap-5 border-b border-b-primary-normal01 bg-white px-5 py-4">
      <div className="flex justify-between border-b border-b-primary-normal01 pb-4">
        <div className="flex items-center gap-2.5">
          {SORT_OPTIONS.map(({ type: sortOptionType, label }) => (
            <Toggle
              key={sortOptionType}
              size="sm"
              onClick={() => handleSortChange(sortOptionType)}
            >
              <div
                className={clsx("h-2 w-2 rounded-full", {
                  "bg-star text-primary": currentSortType === sortOptionType,
                  "bg-primary-normal03": currentSortType !== sortOptionType,
                })}
              />
              <span
                className={clsx("text-xs font-semibold", {
                  "text-primary": currentSortType === sortOptionType,
                  "text-primary-normal03": currentSortType !== sortOptionType,
                })}
              >
                {label}
              </span>
            </Toggle>
          ))}
        </div>
        {/* <RatingFilter /> */}
      </div>
      {displayReviews.length > 0 ? (
        <ReviewCard
          review={displayReviews}
          fieldConfigs={fieldConfigs}
          type={type}
        />
      ) : (
        <Empty
          title="리뷰가 없습니다."
          subTitle={`${kindergartenName}의 첫 리뷰를 남겨보세요!`}
        ></Empty>
      )}
    </section>
  );
}
