import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

import Toggle from "@/components/@shared/buttons/base-toggle";
import RatingFilter from "@/components/review/RatingFilter";
import ReviewCard from "@/components/review/ReviewCard";
import Empty from "@/components/@shared/layout/empty";
import { ReviewData } from "@/components/review/ReviewCard";
import { ReviewFieldConfig } from "@/components/review/ReviewContent";
import { SortType } from "@/types/reviewDTO";
import { REVIEW_TYPES } from "@/constants/review";

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
    <section className="bg-white flex flex-col gap-5 px-5 py-4 mb-16 mt-2 border-b border-b-primary-normal01">
      <div className="flex justify-between border-b border-b-primary-normal01 pb-4">
        <div className="flex gap-2.5 items-center">
          {SORT_OPTIONS.map(({ type: sortOptionType, label }) => (
            <Toggle
              key={sortOptionType}
              size="sm"
              onClick={() => handleSortChange(sortOptionType)}
            >
              <div
                className={clsx("w-2 h-2 rounded-full", {
                  "bg-star text-primary": currentSortType === sortOptionType,
                  "bg-primary-normal03": currentSortType !== sortOptionType,
                })}
              />
              <span
                className={clsx("font-semibold text-xs", {
                  "text-primary": currentSortType === sortOptionType,
                  "text-primary-normal03": currentSortType !== sortOptionType,
                })}
              >
                {label}
              </span>
            </Toggle>
          ))}
        </div>
        <RatingFilter />
      </div>
      {displayReviews.length > 0 ? (
        <ReviewCard
          review={displayReviews}
          fieldConfigs={fieldConfigs}
          type={type}
        />
      ) : (
        <Empty>
          <p className="text-sm">리뷰가 없습니다.</p>
          <span className="text-xxs text-primary-normal02">
            {kindergartenName}의 첫 리뷰를 작성해보세요!
          </span>
        </Empty>
      )}
    </section>
  );
}
