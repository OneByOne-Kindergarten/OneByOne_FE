import LikeToggle from "@/common/ui/buttons/like-toggle";

interface ReviewActionsProps {
  likeCount: number;
  onLike: () => void;
  isPending: boolean;
  isLiked: boolean;
}

export default function ReviewActions({
  likeCount,
  onLike,
  isLiked,
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
      {/* <ShareButton variant="secondary" size="xs" /> */}
    </div>
  );
}
