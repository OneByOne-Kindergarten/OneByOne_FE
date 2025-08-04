import { Link } from "react-router-dom";

import Badge from "@/components/@shared/badge";
import UserActionDropDown from "@/components/@shared/drop-down/report-drop-down";
import { SVG_PATHS } from "@/constants/assets-path";
import type { CommunityPostItem } from "@/types/communityDTO";
import { formatDate } from "@/utils/dateUtils";

interface PostCardProps {
  post: CommunityPostItem;
  index: number;
  currentCategory: string;
  getCategoryLabel: (category: string) => string;
  showDropdown?: boolean;
  onEdit?: (post: CommunityPostItem) => void;
  onDelete?: (post: CommunityPostItem) => void;
}

export default function PostCard({
  post,
  index,
  currentCategory,
  getCategoryLabel,
  showDropdown = false,
}: PostCardProps) {
  return (
    <div className="flex flex-1 items-center gap-3 border-b border-primary-light02 pb-4">
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            {currentCategory === "top10" && (
              <Badge variant="secondary">{index + 1}</Badge>
            )}
            <Badge variant="primary">
              {getCategoryLabel(post.categoryName)}
            </Badge>
          </div>
          {showDropdown && (
            <UserActionDropDown
              targetId={post.id}
              targetType="POST"
              authorNickname={post.userNickname}
            />
          )}
        </div>
        <Link
          to={`/community/${post.id}`}
          className="duration-200 ease-out hover:brightness-50 active:brightness-50"
        >
          <p className="line-clamp-1 font-semibold text-primary-dark01">
            {post.title}
          </p>
          <p className="line-clamp-1 text-sm text-primary-normal03">
            {post.content}
          </p>
        </Link>
        <div className="flex justify-between text-xs text-primary-normal03">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <img
                src={SVG_PATHS.THUMB_UP}
                alt="좋아요 아이콘"
                width="15"
                height="15"
              />
              <span>{post.likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={SVG_PATHS.CHAT.line}
                alt="말풍선 아이콘"
                width="15"
                height="15"
              />
              <span>{post.commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={SVG_PATHS.EYE.on}
                alt="눈 아이콘"
                width="15"
                height="15"
              />
              <span>{post.viewCount}</span>
            </div>
          </div>
          <div>
            <span>
              {post.userNickname || "작성자"} · {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
