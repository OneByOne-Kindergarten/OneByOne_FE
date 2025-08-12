import type { CommentItem } from "@/entities/community/comment/DTO.d";
import ProfileImage from "@/features/user-profile/ProfileImage";
import Badge from "@/shared/ui/badge";
import { getUserRoleLabel } from "@/shared/utils/getUserRoleLabel";

interface ReplyCardProps {
  reply: CommentItem;
  postAuthor: string;
}

export default function CommentUserInfo({ reply, postAuthor }: ReplyCardProps) {
  const isAuthor = postAuthor === reply.nickName;

  return (
    <div className="flex items-center gap-2.5">
      <ProfileImage role={reply.userRole} size="sm" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-primary-dark02">
              {reply.nickName}
            </span>
            {isAuthor && (
              <Badge font="xxs" className="border border-primary-normal01">
                작성자
              </Badge>
            )}
          </div>
        </div>
        <ul className="flex gap-1.5 text-xs text-primary-normal03">
          {reply.career && (
            <>
              <li>{reply.career}</li>
              <li aria-hidden="true">·</li>
            </>
          )}
          <li>{getUserRoleLabel(reply.userRole)}</li>
        </ul>
      </div>
    </div>
  );
}
