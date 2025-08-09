import UserActionDropDown from "@/common/ui/drop-down/report-drop-down";
import { formatDate } from "@/common/utils/dateUtils";
import type { CommentItem } from "@/entities/community/comment/DTO.d";
import CommentUserInfo from "@/features/community/CommentUserInfo";
import ReplyButton from "@/features/community/ReplyButton";

interface CommentCardProps {
  comment: CommentItem;
  postAuthor: string;
  postId: number;
  onReply: (author: string) => void;
}

export default function CommentCard({
  comment,
  postAuthor,
  postId,
  onReply,
}: CommentCardProps) {
  const { nickName, createdAt, content } = comment;

  const handleReply = () => {
    onReply(nickName);
  };

  return (
    <>
      <div className="border-b px-5 py-4">
        <div className="flex flex-1 justify-between">
          <CommentUserInfo reply={comment} postAuthor={postAuthor} />
          <UserActionDropDown
            targetId={comment.id}
            targetType="COMMENT"
            targetUserEmail={comment.email}
            authorNickname={nickName}
            postId={postId}
          />
        </div>
        <p className="mb-3 mt-2 text-sm text-primary-dark01">{content}</p>
        <div className="flex justify-between gap-2">
          <span className="text-xxs text-primary-normal03">
            {formatDate(createdAt)}
          </span>
          <ReplyButton onClick={handleReply} />
        </div>
      </div>
    </>
  );
}
