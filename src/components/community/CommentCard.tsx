import ActionDropDown from "@/components/@shared/drop-down/report-drop-down";
import CommentUserInfo from "@/components/community/CommentUserInfo";
import ReplyButton from "@/components/community/ReplyButton";

import type { CommentItem } from "@/types/communityDTO";
import { formatDate } from "@/utils/dateUtils";

interface CommentCardProps {
  comment: CommentItem;
  postAuthor: string;
  postId: number;
  onReply: (author: string) => void;
}

/**
 * CommentCard Details
 *
 * @param comment - 댓글 데이터
 * @param postAuthor - 게시글 작성자
 * @param postId - 게시글 ID
 * @param onReply - 답글 작성 함수
 */
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
      <div className="border-b px-4 py-5">
        <div className="flex flex-1 justify-between">
          <CommentUserInfo reply={comment} postAuthor={postAuthor} />
          <ActionDropDown
            targetId={comment.id}
            targetType="COMMENT"
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
