import type { CommentItem } from "@/entities/community/comment/DTO.d";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import UserActionDropDown from "@/shared/ui/drop-down/report-drop-down";
import { formatDate } from "@/shared/utils/dateUtils";
import CommentUserInfo from "@/widgets/community-feed/comment-list/ui/CommentUserInfo";

interface ReplyCardProps {
  reply: CommentItem;
  postAuthor: string;
  postId: number;
}

export default function ReplyCard({
  reply,
  postAuthor,
  postId,
}: ReplyCardProps) {
  return (
    <div className="border-b px-4 py-5">
      <div className="flex flex-1 items-start gap-2.5">
        <img
          src={SVG_PATHS.BROKEN_LINE}
          alt="꺾은 선 아이콘"
          width={15}
          height={16}
        />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex justify-between">
            <CommentUserInfo reply={reply} postAuthor={postAuthor} />
            <UserActionDropDown
              targetId={reply.id}
              targetType="COMMENT"
              authorNickname={reply.nickName}
              targetUserEmail={reply.email}
              postId={postId}
            />
          </div>
          <p className="whitespace-pre-wrap text-sm text-primary-dark01">
            {reply.content}
          </p>
          <p className="text-xxs text-primary-normal03">
            {formatDate(reply.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
