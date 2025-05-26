import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { FixedSizeList as List } from "react-window";

import PostCard from "@/components/community/PostCard";
import Empty from "@/components/@shared/layout/empty";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { useCommunityPosts } from "@/hooks/useCommunity";
import { getCategoryLabel } from "@/utils/categoryUtils";
import { CommunityPostItem } from "@/types/communityDTO";
import styles from "@/styles/scroll.module.css";

interface PostListProps {
  type: "teacher" | "pre-teacher";
  categoryName: string;
  searchQuery?: string;
  searchType?: "title" | "content";
}

interface PostItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    posts: CommunityPostItem[];
    currentCategory: string;
    lastItemRef?:
      | React.RefObject<HTMLDivElement>
      | ((node?: Element | null) => void);
  };
}

const PostItem = ({ index, style, data }: PostItemProps) => {
  const { posts, currentCategory, lastItemRef } = data;
  const post = posts[index];

  const isLastItem = index === posts.length - 1;

  if (!post) return null;

  return (
    <div style={style} ref={isLastItem && lastItemRef ? lastItemRef : null}>
      <PostCard
        post={post}
        index={index}
        currentCategory={currentCategory}
        getCategoryLabel={getCategoryLabel}
      />
    </div>
  );
};

export default function PostList({
  type,
  categoryName,
  searchQuery = "",
  searchType = "title",
}: PostListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxListHeight, setMaxListHeight] = useState(window.innerHeight - 200);
  const [containerWidth, setContainerWidth] = useState<number | string>("100%");
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 200px 0px",
  });

  const categoryParams = categoryName !== "all" ? { categoryName } : undefined;

  const searchParams = searchQuery
    ? searchType === "title"
      ? { title: searchQuery }
      : { content: searchQuery }
    : undefined;

  const {
    data: communityPostsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCommunityPosts(
    10,
    type === "teacher" ? "TEACHER" : "PROSPECTIVE_TEACHER",
    {
      ...categoryParams,
      ...searchParams,
    }
  );

  // 창 크기 변경 시 높이 업데이트
  useEffect(() => {
    const handleResize = () => {
      setMaxListHeight(window.innerHeight - 256);

      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 첫 렌더링 후 컨테이너 너비 측정
    setTimeout(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    }, 0);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 게시물을 단일 배열로 변환 (중복 제거)
  const allPosts =
    communityPostsData?.pages.flatMap((page) => page.content || []) || [];
  const uniquePosts = Array.from(
    new Map(allPosts.map((post) => [post.id, post])).values()
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (uniquePosts.length === 0) {
    return (
      <Empty>
        <p className="text-sm">게시글이 없습니다.</p>
      </Empty>
    );
  }

  const itemHeight = 124;
  const listHeight = Math.min(uniquePosts.length * itemHeight, maxListHeight);

  return (
    <section ref={containerRef}>
      {searchQuery && (
        <div className="mb-4 text-sm text-primary-normal03">
          {uniquePosts.length}개의 검색 결과
        </div>
      )}
      <List
        height={listHeight}
        width={containerWidth}
        itemCount={uniquePosts.length}
        itemSize={itemHeight}
        itemData={{
          posts: uniquePosts,
          currentCategory: categoryName,
          lastItemRef: ref,
        }}
        className={styles["scrollbar-hide"]}
      >
        {PostItem}
      </List>
    </section>
  );
}
