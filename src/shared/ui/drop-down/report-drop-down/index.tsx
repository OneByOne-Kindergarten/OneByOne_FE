import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

import { userAtom } from "@/entities/auth/model";
import { useBlock } from "@/entities/block/hooks";
import { useDeleteComment } from "@/entities/community/comment/hooks";
import { useDeletePost } from "@/entities/community/hooks";
import { URL_PATHS } from "@/shared/constants/url-path";
import DropDown from "@/shared/ui/drop-down/base-drop-down";

type ReportTargetType = "REVIEW" | "POST" | "COMMENT";

interface UserActionDropDownProps {
  targetId: number;
  targetType: ReportTargetType;
  authorNickname?: string;
  targetUserEmail?: string;
  postId?: number; // 댓글인 경우 게시글 ID
  onDeleteSuccess?: () => void;
}

export default function UserActionDropDown({
  targetId,
  targetType,
  authorNickname,
  targetUserEmail,
  postId,
  onDeleteSuccess,
}: UserActionDropDownProps) {
  const navigate = useNavigate();
  const currentUser = useAtomValue(userAtom);
  const deletePost = useDeletePost();
  const deleteComment = useDeleteComment();
  const { useBlockUser } = useBlock();
  const blockUser = useBlockUser();

  const isOwner = currentUser?.nickname === authorNickname;

  const handleDelete = () => {
    if (targetType === "POST") {
      deletePost.mutate(targetId, {
        onSuccess: () => {
          onDeleteSuccess?.();
        },
      });
    } else if (targetType === "COMMENT" && postId) {
      deleteComment.mutate(
        { commentId: targetId, postId },
        {
          onSuccess: () => {
            onDeleteSuccess?.();
          },
        }
      );
    }
  };

  const handleBlock = () => {
    if (targetUserEmail) {
      blockUser.mutate({ targetUserEmail });
    }
  };

  const options = [];

  if (isOwner) {
    options.push({
      label: "삭제하기",
      onClick: handleDelete,
    });
  } else {
    // 작성자가 타인일 경우
    options.push({
      label: "신고하기",
      onClick: () =>
        navigate(`${URL_PATHS.REPORT}?targetId=${targetId}&type=${targetType}`),
    });

    options.push({
      label: "차단하기",
      onClick: handleBlock,
    });
  }

  return <DropDown options={options} position="bottom" align="end" />;
}
