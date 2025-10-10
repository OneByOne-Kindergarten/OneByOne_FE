import { useLocation, useSearchParams } from "react-router-dom";

import { SortType } from "@/entities/review/DTO.d";
import {
  useInfiniteAllInternshipReviews,
  useInfiniteAllWorkReviews,
} from "@/entities/review/hooks";
import NavBar from "@/features/nav/ui/NavBar";
import AutoFetchSentinel from "@/shared/components/AutoFetchSentinel";
import { REVIEW_TYPES, REVIEW_TYPE_LABELS } from "@/shared/constants/review";
import Empty from "@/shared/ui/layout/empty";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import { ReviewData } from "@/widgets/review-list/lib/getTotalRating";
import ReviewCard from "@/widgets/review-list/ui/ReviewCard";
import SortToggle from "@/widgets/review-list/ui/SortToggle";
import { getFieldConfigsByType } from "@/widgets/review-panel/lib/getFieldConfigsByType";

const REVIEW_TYPE_OPTIONS = [
  {
    href: `/review?type=${REVIEW_TYPES.WORK}`,
    label: REVIEW_TYPE_LABELS[REVIEW_TYPES.WORK],
  },
  {
    href: `/review?type=${REVIEW_TYPES.LEARNING}`,
    label: REVIEW_TYPE_LABELS[REVIEW_TYPES.LEARNING],
  },
];

export default function AllReviewList() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 리뷰 type이 없을 경우, 기본 값 work
  const reviewType = searchParams.get("type") || REVIEW_TYPES.WORK;

  const sortType =
    (searchParams.get("sortType") as SortType) || SortType.LATEST;

  const workReviews = useInfiniteAllWorkReviews({
    size: 10,
    sortType,
  });

  const internshipReviews = useInfiniteAllInternshipReviews({
    size: 10,
    sortType,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    reviewType === REVIEW_TYPES.WORK ? workReviews : internshipReviews;

  const handleSortChange = (newSortType: SortType) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortType", newSortType);
      return newParams;
    });
  };

  // 모든 페이지의 리뷰를 단일 배열로 변환
  const reviews = (data?.pages.flatMap(
    (page) => (page.content as ReviewData[]) || []
  ) || []) as ReviewData[];
  const fieldConfigs = getFieldConfigsByType(reviewType).review;

  const currentPath = searchParams.get("type")
    ? location.pathname + location.search
    : `${location.pathname}?type=${REVIEW_TYPES.WORK}${location.search ? `&${location.search.slice(1)}` : ""}`;

  return (
    <>
      <NavBar options={REVIEW_TYPE_OPTIONS} currentPath={currentPath} />
      <div className="flex flex-col gap-5 pb-7 pt-6">
        <section className="mx-5 border-b border-b-primary-normal01 pb-3">
          <SortToggle
            currentSortType={sortType}
            onSortChange={handleSortChange}
          />
        </section>
        {reviews.length > 0 ? (
          <>
            <section>
              <ReviewCard
                review={reviews as unknown as ReviewData[]}
                type={reviewType}
                fieldConfigs={fieldConfigs}
                showResource={true}
                limitItems={3}
              />
            </section>
            {hasNextPage && (
              <AutoFetchSentinel
                hasNext={!!hasNextPage}
                loading={!!isFetchingNextPage}
                fetchNext={() => fetchNextPage()}
              />
            )}
            {isFetchingNextPage && <LoadingSpinner type="element" />}
          </>
        ) : (
          <Empty
            title="리뷰가 없습니다."
            subTitle={`첫 ${
              reviewType === REVIEW_TYPES.WORK
                ? REVIEW_TYPE_LABELS[REVIEW_TYPES.WORK]
                : REVIEW_TYPE_LABELS[REVIEW_TYPES.LEARNING]
            } 리뷰를 남겨보세요!`}
          />
        )}
      </div>
    </>
  );
}
