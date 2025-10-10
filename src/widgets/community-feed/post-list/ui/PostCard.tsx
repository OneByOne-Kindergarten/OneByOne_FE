import { Link } from "react-router-dom";

import type { CommunityPostItem } from "@/entities/community/DTO.d";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import Badge from "@/shared/ui/badge";
import UserActionDropDown from "@/shared/ui/drop-down/report-drop-down";
import { formatDate } from "@/shared/utils/dateUtils";

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
                src={SVG_PATHS.CHAT.LINE}
                alt="말풍선 아이콘"
                width="15"
                height="15"
              />
              <span>{post.commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={SVG_PATHS.FORM.EYE.ON}
                alt="조회 아이콘"
                width="15"
                height="15"
              />
              <span>{post.viewCount}</span>
            </div>
          </div>
          <div>
            <span className="ml-4 line-clamp-1">
              {post.userNickname || "알 수 없는 사용자"} ·{" "}
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
