import { useEffect, useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useInView } from "react-intersection-observer";

import { CommunityPostItem } from "@/types/communityDTO";
import PostCardRenderer from "@/components/community/post-card-renderer";
import styles from "@/styles/scroll.module.css";

// 가상 스크롤 항목
interface PostItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    items: CommunityPostItem[];
    onItemClick: (id: string) => void;
    lastItemRef:
      | React.RefObject<HTMLDivElement>
      | ((node?: Element | null) => void);
  };
}

const PostItem = ({ index, style, data }: PostItemProps) => {
  const post = data.items[index];

  const isLastItem = index === data.items.length - 1;

  if (!post) return null;

  return (
    <div style={style}>
      <div
        onClick={() => data.onItemClick(post.id.toString())}
        className="cursor-pointer py-1"
        ref={isLastItem ? data.lastItemRef : null}
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

  const itemHeight = 104;
  const listHeight = Math.min(results.length * itemHeight, maxListHeight);

  // 창 크기 변경 시 높이 업데이트
  useEffect(() => {
    const handleResize = () => {
      setMaxListHeight(window.innerHeight - 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 200px 0px",
  });

  // 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleItemClick = useCallback(
    (id: string) => {
      onPostClick(id);
    },
    [onPostClick]
  );

  if (!searchQuery) return null;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="px-5">
        <h3 className="font-semibold text-sm text-primary-dark01 ">
          총 {totalItems > 0 && `${totalItems}`}개의 검색 결과
        </h3>
      </div>
      <section className="px-5 pt-4 bg-white">
        <List
          height={listHeight}
          width="100%"
          itemCount={results.length}
          itemSize={itemHeight}
          itemData={{
            items: results,
            onItemClick: handleItemClick,
            lastItemRef: ref,
          }}
          className={styles["scrollbar-hide"]}
        >
          {PostItem}
        </List>

        {isFetchingNextPage && (
          <div className="w-full flex justify-center py-2">
            <div className="text-sm text-gray-500">더 불러오는 중...</div>
          </div>
        )}
      </section>
    </div>
  );
}
