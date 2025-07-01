import DropDown from "@/components/@shared/drop-down/base-drop-down";
import { URL_PATHS } from "@/constants/url-path";
import { useDeleteComment, useDeletePost } from "@/hooks/useCommunity";
import { userAtom } from "@/stores/userStore";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

type ReportTargetType = "REVIEW" | "POST" | "COMMENT";

interface ActionDropDownProps {
  targetId: number;
  targetType: ReportTargetType;
  authorNickname?: string;
  postId?: number; // 댓글인 경우 게시글 ID
  onDeleteSuccess?: () => void;
}

export default function ActionDropDown({
  targetId,
  targetType,
  authorNickname,
  postId,
  onDeleteSuccess,
}: ActionDropDownProps) {
  const navigate = useNavigate();
  const currentUser = useAtomValue(userAtom);
  const deletePost = useDeletePost();
  const deleteComment = useDeleteComment();

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

  const options = [
    {
      label: "신고하기",
      onClick: () =>
        navigate(`${URL_PATHS.REPORT}?targetId=${targetId}&type=${targetType}`),
    },
  ];

  // 본인이 작성한 글/댓글인 경우 삭제 옵션 추가
  if (isOwner) {
    options.unshift({
      label: "삭제하기",
      onClick: handleDelete,
    });
  }

  return <DropDown options={options} position="bottom" align="end" />;
}
