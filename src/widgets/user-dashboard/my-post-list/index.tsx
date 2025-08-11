import { useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

import { useMyPosts } from "@/entities/user/my-post/hooks/useMyPosts";
import NavBar from "@/features/nav/ui/NavBar";
import { REVIEW_TYPES } from "@/shared/constants/review";
import { URL_PATHS } from "@/shared/constants/url-path";
import Empty from "@/shared/ui/layout/empty";
import Error from "@/shared/ui/layout/error";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import { MY_REVIEW_CATEGORY_OPTIONS } from "@/widgets/user-dashboard/my-post-list/lib/category";
import type { MyReviewData } from "@/widgets/user-dashboard/my-post-list/lib/types";
import MyPostItem from "@/widgets/user-dashboard/my-post-list/ui/MyPostItem";

const ITEM_HEIGHT = 110;
const LIST_HEIGHT = 690;

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

  return (
    <>
      <NavBar
        options={MY_REVIEW_CATEGORY_OPTIONS}
        currentPath={`${URL_PATHS.USER_POST}?type=${currentType}`}
        className="flex gap-5 bg-white px-5 py-3 text-lg font-semibold"
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error type="page">
          <p className="text-sm">리뷰 불러오기 오류</p>
          <span className="text-xxs text-primary-normal02">
            {error?.message}
          </span>
        </Error>
      ) : reviews.length === 0 ? (
        <Empty
          type="page"
          title="작성된 리뷰가 없습니다."
          subTitle="유치원 상세 페이지에서 리뷰를 작성해보세요."
        />
      ) : (
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
          {MyPostItem}
        </List>
      )}
    </>
  );
}
