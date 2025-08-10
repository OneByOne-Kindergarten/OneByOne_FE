import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FixedSizeList as List } from "react-window";

import styles from "@/app/styles/scroll.module.css";
import { CommunityPostItem } from "@/entities/community/DTO.d";
import { useCommunityPosts } from "@/entities/community/hooks";
import Empty from "@/shared/ui/layout/empty";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import { getCategoryLabel } from "@/shared/utils/categoryUtils";
import PostCard from "@/widgets/community-feed/post-list/ui/PostCard";

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

  // useMemo를 사용하여 options 객체를 메모이제이션
  const queryOptions = useMemo(() => {
    const options: {
      categoryName?: string;
      title?: string;
      content?: string;
      userName?: string;
    } = {};

    if (categoryName !== "all") {
      options.categoryName = categoryName;
    }

    if (searchQuery) {
      if (searchType === "title") {
        options.title = searchQuery;
      } else {
        options.content = searchQuery;
      }
    }

    return options;
  }, [categoryName, searchQuery, searchType]);

  const {
    data: communityPostsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCommunityPosts(
    10,
    type === "teacher" ? "TEACHER" : "PROSPECTIVE_TEACHER",
    queryOptions
  );

  // 창 크기 변경 시 높이 업데이트
  useEffect(() => {
    const handleResize = () => {
      setMaxListHeight(window.innerHeight - 270);

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
    return <LoadingSpinner type="element" />;
  }

  if (uniquePosts.length === 0) {
    return (
      <Empty
        title="게시글이 없습니다."
        subTitle="첫 번째 게시글을 남겨보세요!"
      />
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
