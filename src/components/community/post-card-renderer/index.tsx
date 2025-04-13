import React from "react";
import { CommunityPostItem } from "@/types/communityDTO";
import PostCard from "@/components/community/post-card";
import { getCategoryLabel } from "@/utils/categoryUtils";

interface PostCardRendererProps {
  item: CommunityPostItem;
  onClick: () => void;
  ref: React.LegacyRef<HTMLDivElement> | null;
  index?: number;
}

export default function PostCardRenderer({
  item,
  onClick,
  ref,
  index = 0,
}: PostCardRendererProps) {
  return (
    <div onClick={onClick} className="cursor-pointer" ref={ref}>
      <PostCard
        post={item}
        index={index}
        currentCategory={item.categoryName}
        getCategoryLabel={getCategoryLabel}
      />
    </div>
  );
}

// 게시물 아이템 ID 가져오는 헬퍼 함수
export const getPostId = (post: CommunityPostItem): string => {
  return post.id.toString();
};
