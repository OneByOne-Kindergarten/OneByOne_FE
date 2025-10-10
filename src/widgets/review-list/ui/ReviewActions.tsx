import LikeToggle from "@/shared/ui/buttons/like-toggle";
import ShareButton from "@/shared/ui/buttons/share-button";
import { KakaoShareRequest } from "@/shared/utils/webViewCommunication";

interface ReviewActionsProps {
  likeCount: number;
  onLike: () => void;
  isPending: boolean;
  isLiked: boolean;
  shareData?: KakaoShareRequest;
}

export default function ReviewActions({
  likeCount,
  onLike,
  isLiked,
  shareData,
}: ReviewActionsProps) {
  return (
    <div className="flex gap-2">
      <LikeToggle
        variant="secondary"
        size="sm"
        isCount
        count={likeCount}
        onToggle={onLike}
        isLiked={isLiked}
      >
        도움돼요
      </LikeToggle>
      <ShareButton variant="secondary" size="xs" shareData={shareData} />
    </div>
  );
}
