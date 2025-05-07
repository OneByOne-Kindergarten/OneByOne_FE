import { useState } from "react";
import clsx from "clsx";
import Toggle from "@/components/@shared/buttons/base-toggle";
import RatingFilter from "@/components/review/RatingFilter";
import ReviewCard from "@/components/review/ReviewCard";
import Empty from "@/components/@shared/layout/empty";
import { ReviewData } from "@/components/review/ReviewCard";
import { ReviewFieldConfig } from "@/components/review/ReviewContent";

type SortType = "recommended" | "latest";

const SORT_OPTIONS: { type: SortType; label: string }[] = [
  { type: "recommended", label: "추천순" },
  { type: "latest", label: "최신순" },
];

interface ReviewListProps {
  reviews: ReviewData[];
  fieldConfigs: ReviewFieldConfig[];
  kindergartenName: string;
}

export default function ReviewList({
  reviews,
  fieldConfigs,
  kindergartenName,
}: ReviewListProps) {
  const [sortType, setSortType] = useState<SortType>("recommended");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "recommended") {
      return b.likeCount - a.likeCount;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <section className="bg-white flex flex-col gap-5 px-5 py-4 mb-16 mt-2 border-b border-b-primary-normal01">
      <div className="flex justify-between border-b border-b-primary-normal01 pb-4">
        <div className="flex gap-2.5 items-center">
          {SORT_OPTIONS.map(({ type, label }) => (
            <Toggle key={type} size="sm" onClick={() => setSortType(type)}>
              <div
                className={clsx("w-2 h-2 rounded-full", {
                  "bg-star text-primary": sortType === type,
                  "bg-primary-normal03": sortType !== type,
                })}
              />
              <span
                className={clsx("font-semibold text-xs", {
                  "text-primary": sortType === type,
                  "text-primary-normal03": sortType !== type,
                })}
              >
                {label}
              </span>
            </Toggle>
          ))}
        </div>
        <RatingFilter />
      </div>
      {sortedReviews.length > 0 ? (
        <ReviewCard review={sortedReviews} fieldConfigs={fieldConfigs} />
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
