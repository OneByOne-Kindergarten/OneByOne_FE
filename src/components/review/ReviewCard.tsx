import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReviewLike } from "@/hooks/useReviewLike";
import { REVIEW_TYPES } from "@/constants/review";
import ReviewRating from "@/components/review/ReviewRating";
import ReviewContent, {
  ReviewFieldConfig,
} from "@/components/review/ReviewContent";
import ReviewActions from "@/components/review/ReviewActions";
import ReportDropDown from "../@shared/drop-down/report-drop-down";

export interface ReviewData {
  id: number;
  title: string;
  type: string;
  createdAt: string;
  likeCount: number;
  workYear: string;
  rating: {
    total: number;
  };
  scores: Record<string, number>;
  contents: Record<string, string>;
}

export interface ReviewCardProps {
  review: ReviewData | ReviewData[];
  fieldConfigs: ReviewFieldConfig[];
}

function ReviewCardItem({
  review,
  fieldConfigs,
}: {
  review: ReviewData;
  fieldConfigs: ReviewFieldConfig[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const { handleLike, isPending, isLiked } = useReviewLike(type, review.id);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex justify-between items-start">
        <ReviewRating
          rating={review.rating.total}
          title={review.title}
          type={review.type}
          createdAt={review.createdAt}
          workYear={review.workYear}
        />
        <ReportDropDown targetId={review.id} targetType="REVIEW" />
      </div>
      <ReviewContent
        scores={review.scores}
        contents={review.contents}
        fieldConfigs={fieldConfigs}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />
      <div className="flex justify-end">
        <ReviewActions
          likeCount={review.likeCount}
          onLike={handleLike}
          isPending={isPending}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
}

export default function ReviewCard({ review, fieldConfigs }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {Array.isArray(review) ? (
        review.map((item) => (
          <ReviewCardItem
            key={item.id}
            review={item}
            fieldConfigs={fieldConfigs}
          />
        ))
      ) : (
        <ReviewCardItem review={review} fieldConfigs={fieldConfigs} />
      )}
    </div>
  );
}
