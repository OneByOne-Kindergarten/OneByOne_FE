import { useCallback, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";

import PostCardRenderer from "@/components/community/PostCardRenderer";
import styles from "@/styles/scroll.module.css";
import { CommunityPostItem } from "@/types/communityDTO";

// 가상 스크롤 항목
interface PostItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    items: CommunityPostItem[];
    onItemClick: (id: string) => void;
  };
}

const PostItem = ({ index, style, data }: PostItemProps) => {
  const post = data.items[index];

  if (!post) return null;

  return (
    <div style={style}>
      <div
        onClick={() => data.onItemClick(post.id.toString())}
        className="cursor-pointer py-1"
      >
        <PostCardRenderer
          item={post}
          onClick={() => data.onItemClick(post.id.toString())}
          ref={null}
          index={index}
        />
      </div>
    </div>
  );
};

interface CommunitySearchResultProps {
  searchQuery: string;
  results: CommunityPostItem[];
  totalItems: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  error: unknown;
  onPostClick: (id: string) => void;
}

export default function CommunitySearchResult({
  searchQuery,
  results,
  totalItems,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onPostClick,
}: CommunitySearchResultProps) {
  const [maxListHeight, setMaxListHeight] = useState(() => {
    return typeof window !== "undefined" ? window.innerHeight - 120 : 680;
  });

  const itemHeight = 124;
  const listHeight = Math.min(results.length * itemHeight, maxListHeight);
  const loadMoreThreshold = Math.floor(results.length * 0.8);

  useEffect(() => {
    const handleResize = () => {
      setMaxListHeight(window.innerHeight - 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = useCallback(
    (id: string) => {
      onPostClick(id);
    },
    [onPostClick]
  );

  // 스크롤 위치 -> 다음 페이지 로드 처리
  const loadMoreItems = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // 가상 스크롤 아이템 범위 변경 감지
  const handleItemsRendered = useCallback(
    ({
      overscanStopIndex,
      visibleStopIndex,
    }: {
      overscanStartIndex: number;
      overscanStopIndex: number;
      visibleStartIndex: number;
      visibleStopIndex: number;
    }) => {
      if (
        visibleStopIndex > loadMoreThreshold &&
        overscanStopIndex >= results.length - 5
      ) {
        loadMoreItems();
      }
    },
    [results.length, loadMoreThreshold, loadMoreItems]
  );

  if (!searchQuery) return null;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="px-5">
        <h3 className="text-sm font-semibold text-primary-dark01">
          총 {totalItems > 0 && `${totalItems}`}개의 검색 결과
        </h3>
      </div>
      <section className="bg-white px-5 pt-4">
        <List
          height={listHeight}
          width="100%"
          itemCount={results.length}
          itemSize={itemHeight}
          onItemsRendered={handleItemsRendered}
          overscanCount={5}
          itemData={{
            items: results,
            onItemClick: handleItemClick,
          }}
          className={styles["scrollbar-hide"]}
        >
          {PostItem}
        </List>

        {isFetchingNextPage && <div className="h-2 w-full" />}
      </section>
    </div>
  );
}
