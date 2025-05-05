import { formatDate } from "@/utils/dateUtils";
import { SVG_PATHS } from "@/constants/assets-path";
import LikeToggle from "@/components/@shared/buttons/like-toggle";
import ReplyButton from "@/components/community/reply-button";
import Badge from "@/components/@shared/badge";
import type { CommentItem } from "@/types/communityDTO";

/**
 * CommentCard Details
 *
 * @param comment - 댓글 데이터
 * @param postAuthor - 게시글 작성자
 * @param isReply - 답글 여부
 * @param onReply - 답글 작성 함수
 */

interface CommentCardProps {
  comment: CommentItem;
  postAuthor: string;
  isReply?: boolean;
  onReply: (author: string) => void;
}

export default function CommentCard({
  comment,
  postAuthor,
  isReply = false,
  onReply,
}: CommentCardProps) {
  const { nickName, createdAt, content } = comment;
  const isAuthor = nickName === postAuthor;

  const handleReply = () => {
    onReply(nickName);
  };

  return (
    <>
      {/* 댓글 */}
      <div className={`${isReply ? "" : "border-b py-5 px-4"}`}>
        <div className="flex flex-1 justify-between">
          <div className="flex gap-2.5 items-center">
            <div className="relative w-7 h-7 bg-primary-normal03 rounded-full">
              <img
                src={SVG_PATHS.CHARACTER.user}
                alt="병아리 사용자 캐릭터"
                className="absolute w-2/3 h-3/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-primary-dark02 font-semibold text-sm">
                  {nickName}
                </span>
                {isAuthor && <Badge>작성자</Badge>}
              </div>
              <ul className="text-primary-normal03 text-xxs flex gap-1">
                <li>{formatDate(createdAt)}</li>
              </ul>
            </div>
          </div>
          <img
            src={SVG_PATHS.KEBAB}
            alt="커뮤니티 게시글 옵션 메뉴"
            width="20"
            height="20"
            className="mb-auto"
          />
        </div>
        <p className="text-primary-dark01 text-sm mt-2 mb-3">{content}</p>
        <div className="flex justify-end gap-2 ">
          <LikeToggle variant="secondary" size="sm" isCount count={12}>
            좋아요
          </LikeToggle>
          <ReplyButton onClick={handleReply} />
        </div>
      </div>

      {/* 대댓글 */}
      {/* {replies && replies.length > 0 && (
        <ul className="flex flex-col w-full gap-4">
          {replies.map((reply: CommentItem) => (
            <li
              key={comment.id}
              className="flex gap-2.5 items-start py-5 px-4 border-b"
            >
              <img
                src={SVG_PATHS.BROKEN_LINE}
                alt="꺾은 선 아이콘"
                width={15}
                height={16}
              />
              <div className="flex flex-col flex-1">
                <ReplyCard
                  comment={reply}
                  postAuthor={postAuthor}
                  isReply={true}
                  onReply={onReply}
                />
              </div>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}
