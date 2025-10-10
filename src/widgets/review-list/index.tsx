import { useSearchParams } from "react-router-dom";

import { SortType } from "@/entities/review/DTO.d";
import { REVIEW_TYPES } from "@/shared/constants/review";
import Empty from "@/shared/ui/layout/empty";
import { ReviewData } from "@/widgets/review-list/lib/getTotalRating";
import ReviewCard from "@/widgets/review-list/ui/ReviewCard";
import SortToggle from "@/widgets/review-list/ui/SortToggle";
import { ReviewFieldConfig } from "@/widgets/review-panel/lib/config";

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
    <section className="mb-16 mt-2 flex flex-col gap-5 border-b border-b-primary-normal01 bg-white pb-7 pt-5">
      <div className="mx-5 flex justify-between border-b border-b-primary-normal01 pb-4">
        <SortToggle
          currentSortType={currentSortType}
          onSortChange={handleSortChange}
        />
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
        />
      )}
    </section>
  );
}
