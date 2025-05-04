import { useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";

import { useMyPosts } from "@/hooks/useMyPosts";
import PostCard from "@/components/community/post-card";
import { getCategoryLabel } from "@/utils/categoryUtils";

const ITEM_HEIGHT = 110;
const LIST_HEIGHT = 600;

const mockData = {
  pages: [
    {
      content: [
        {
          id: 1,
          title: "테스트 게시글입니다.",
          content: "이 게시글은 mockData로 생성되었습니다.",
          category: "TEACHER",
          categoryName: "자유",
          categoryDescription: "교사",
          userNickname: "테스트유저",
          userRole: "TEACHER",
          career: "5년차",
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          createdAt: "2024-03-20T15:30:00.000Z",
          updatedAt: "2024-03-20T15:30:00.000Z",
        },
        {
          id: 2,
          title: "KST 기준 테스트 게시글",
          content: "이 게시글은 KST 기준으로 생성되었습니다.",
          category: "TEACHER",
          categoryName: "자유",
          categoryDescription: "교사",
          userNickname: "테스트유저",
          userRole: "TEACHER",
          career: "5년차",
          viewCount: 10,
          likeCount: 5,
          commentCount: 3,
          createdAt: "2024-03-20T14:30:00.000Z",
          updatedAt: "2024-03-20T14:30:00.000Z",
        },
      ],
      totalPages: 1,
      totalElements: 2,
      size: 10,
      number: 0,
      first: true,
      last: true,
      empty: false,
    },
  ],
};

interface ListItemProps {
  data: any[];
  index: number;
  style: React.CSSProperties;
}

function ListItem({ data, index, style }: ListItemProps) {
  const post = data[index];
  return (
    <div style={style}>
      <PostCard
        showDropdown={true}
        post={post}
        index={index}
        currentCategory="TEACHER"
        getCategoryLabel={getCategoryLabel}
      />
    </div>
  );
}

export default function MyPostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyPosts();
  const listRef = useRef<List>(null);

  // mockData 사용
  const posts = mockData.pages.flatMap((page) => page.content);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <List
      ref={listRef}
      height={LIST_HEIGHT}
      width="100%"
      itemCount={posts.length}
      itemSize={ITEM_HEIGHT}
      itemData={posts}
      onItemsRendered={({ visibleStopIndex }) => {
        if (visibleStopIndex === posts.length - 1) {
          loadMore();
        }
      }}
    >
      {ListItem}
    </List>
  );
}
