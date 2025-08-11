import React from "react";

import type { CommunityPostItem } from "@/entities/community/DTO.d";
import { getCategoryLabel } from "@/shared/utils/categoryUtils";
import PostCard from "@/widgets/community-feed/post-list/ui/PostCard";

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
