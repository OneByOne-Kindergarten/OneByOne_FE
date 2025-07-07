import { useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

import Empty from "@/components/@shared/layout/empty";
import Error from "@/components/@shared/layout/error";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import NavBar from "@/components/@shared/nav/nav-bar";
import ReviewSummary from "@/components/review/ReviewSummary";
import { REVIEW_TYPES } from "@/constants/review";
import { URL_PATHS } from "@/constants/url-path";
import { useMyPosts } from "@/hooks/useMyPosts";
import { InternshipReview, WorkReview } from "@/types/reviewDTO";
import { getTotalRating, getWorkYear } from "@/utils/reviewUtils";

const ITEM_HEIGHT = 110;
const LIST_HEIGHT = 690;

// 내 게시물 목록에서 사용하는 확장된 리뷰 타입 (kindergartenId 포함)
type MyReviewData = (WorkReview | InternshipReview) & {
  kindergartenId: number;
};

interface ListItemProps {
  data: MyReviewData[];
  index: number;
  style: React.CSSProperties;
}

function ListItem({ data, index, style }: ListItemProps) {
  const review = data[index];

  // 리뷰 타입 결정 (workReviewId가 있으면 WORK, 없으면 LEARNING)
  const reviewType =
    "workReviewId" in review ? REVIEW_TYPES.WORK : REVIEW_TYPES.LEARNING;

  const reviewUrl = `${URL_PATHS.REVIEW.replace(":id", review.kindergartenId.toString())}?type=${reviewType}`;

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

export default function MyPostList() {
  const [searchParams] = useSearchParams();
  const currentType = searchParams.get("type") || REVIEW_TYPES.WORK;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useMyPosts();

  const listRef = useRef<List>(null);

  // 모든 페이지의 리뷰 데이터를 평탄화하고 MyReviewData 타입으로 캐스팅
  const reviews = (data?.pages.flatMap((page) => page.content) ||
    []) as unknown as MyReviewData[];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const MY_REVIEW_CATEGORY_OPTIONS = [
    {
      href: `${URL_PATHS.USER_POST}?type=${REVIEW_TYPES.WORK}`,
      label: "근무리뷰",
    },
    {
      href: `${URL_PATHS.USER_POST}?type=${REVIEW_TYPES.LEARNING}`,
      label: "실습리뷰",
    },
  ];

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

  return (
    <>
      <NavBar
        options={MY_REVIEW_CATEGORY_OPTIONS}
        currentPath={`${URL_PATHS.USER_POST}?type=${currentType}`}
        className="flex gap-5 bg-white px-5 py-3 text-lg font-semibold"
      />
      {reviews.length > 0 ? (
        <>
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
        </>
      ) : (
        <Empty
          type="page"
          title="작성된 리뷰가 없습니다."
          subTitle="유치원 상세 페이지에서 리뷰를 작성해보세요."
        />
      )}
    </>
  );
}
