import { Link } from "react-router-dom";

import Badge from "@/components/@shared/badge";
import ReportDropDown from "@/components/@shared/drop-down/report-drop-down";
import { SVG_PATHS } from "@/constants/assets-path";
import { formatDate } from "@/utils/dateUtils";
import type { CommunityPostItem } from "@/types/communityDTO";

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
    <li className="flex items-center gap-3 flex-1 pb-4 border-b border-primary-light02">
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            {currentCategory === "top10" && (
              <Badge variant="secondary">{index + 1}</Badge>
            )}
            <Badge variant="primary">
              {getCategoryLabel(post.categoryName)}
            </Badge>
          </div>
          {showDropdown && <ReportDropDown targetId={post.id} />}
        </div>
        <Link to={`/community/${post.id}`}>
          <p className="font-semibold text-primary-dark01 line-clamp-1">
            {post.title}
          </p>
          <p className="text-sm text-primary-normal03 line-clamp-1">
            {post.content}
          </p>
        </Link>
        <div className="flex justify-between text-xs text-primary-normal03">
          <div className="flex gap-4">
            <div className="flex gap-1 items-center">
              <img
                src={SVG_PATHS.THUMB_UP}
                alt="좋아요 아이콘"
                width="15"
                height="15"
              />
              <span>{post.likeCount}</span>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src={SVG_PATHS.CHAT.line}
                alt="말풍선 아이콘"
                width="15"
                height="15"
              />
              <span>{post.commentCount}</span>
            </div>
            <div className="flex gap-1 items-center">
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
    </li>
  );
}
