import { useCallback, useRef } from "react";
import { FixedSizeList as List } from "react-window";

import Empty from "@/components/@shared/layout/empty";
import Error from "@/components/@shared/layout/error";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import ReviewCard from "@/components/review/ReviewCard";
import { REVIEW_TYPES } from "@/constants/review";
import { useMyPosts } from "@/hooks/useMyPosts";
import { InternshipReview, WorkReview } from "@/types/reviewDTO";
import { getFieldConfigsByType } from "@/utils/fieldConfigsUtils";

const ITEM_HEIGHT = 200;
const LIST_HEIGHT = 690;

type ReviewData = WorkReview | InternshipReview;

interface ListItemProps {
  data: ReviewData[];
  index: number;
  style: React.CSSProperties;
}

function ListItem({ data, index, style }: ListItemProps) {
  const review = data[index];

  // 리뷰 타입 결정 (workReviewId가 있으면 WORK, 없으면 LEARNING)
  const reviewType =
    "workReviewId" in review ? REVIEW_TYPES.WORK : REVIEW_TYPES.LEARNING;
  const fieldConfigs = getFieldConfigsByType(reviewType);

  return (
    <div style={style} className="px-5 py-4">
      <ReviewCard
        review={review}
        fieldConfigs={fieldConfigs.review}
        type={reviewType}
      />
    </div>
  );
}

export default function MyPostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useMyPosts();

  console.log(data);

  const listRef = useRef<List>(null);

  // 모든 페이지의 리뷰 데이터를 평탄화하고 ReviewData 타입으로 캐스팅
  const reviews = (data?.pages.flatMap((page) => page.content) ||
    []) as unknown as ReviewData[];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Error type="page">
        <p className="text-sm">리뷰 불러오기 오류</p>
        <span className="text-xxs text-primary-normal02">{error?.message}</span>
      </Error>
    );
  }

  if (reviews.length === 0) {
    return (
      <Empty
        type="page"
        title="작성된 리뷰가 없습니다."
        subTitle="유치원 상세 페이지에서 리뷰를 작성해보세요."
      ></Empty>
    );
  }

  return (
    <List
      ref={listRef}
      height={LIST_HEIGHT}
      width="100%"
      itemCount={reviews.length}
      itemSize={ITEM_HEIGHT}
      itemData={reviews}
      onItemsRendered={({ visibleStopIndex }) => {
        if (visibleStopIndex === reviews.length - 1) {
          loadMore();
        }
      }}
    >
      {ListItem}
    </List>
  );
}
