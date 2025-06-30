import CommentUserInfo from "@/components/community/CommentUserInfo";
import { formatDate } from "@/utils/dateUtils";
import { SVG_PATHS } from "@/constants/assets-path";
import type { CommentItem } from "@/types/communityDTO";

interface ReplyCardProps {
  reply: CommentItem;
  postAuthor: string;
}

export default function ReplyCard({ reply, postAuthor }: ReplyCardProps) {
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
            <img
              src={SVG_PATHS.KEBAB}
              alt="커뮤니티 게시글 옵션 메뉴"
              width="20"
              height="20"
              className="mb-auto"
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
