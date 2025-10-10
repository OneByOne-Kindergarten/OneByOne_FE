import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { userAtom } from "@/entities/auth/model";
import { useReviewLike } from "@/entities/review/hooks";
import Button from "@/shared/ui/buttons/base-button";
import ReportDropDown from "@/shared/ui/drop-down/report-drop-down";
import { ShareType } from "@/shared/utils/webViewCommunication";
import {
  getTotalRating,
  ReviewData,
} from "@/widgets/review-list/lib/getTotalRating";
import { getWorkYear } from "@/widgets/review-list/lib/getWorkYear";
import ReviewActions from "@/widgets/review-list/ui/ReviewActions";
import ReviewContent from "@/widgets/review-list/ui/ReviewContent";
import ReviewResource from "@/widgets/review-list/ui/ReviewResource";
import ReviewSummary from "@/widgets/review-list/ui/ReviewSummary";
import { ReviewFieldConfig } from "@/widgets/review-panel/lib/config";

export interface ReviewCardProps {
  review: ReviewData | ReviewData[];
  fieldConfigs: ReviewFieldConfig[];
  type: string;
  showResource?: boolean; // 유치원 정보 링크 표시 여부 (기본값: false)
  limitItems?: number; // ReviewContent의 아이템 수 제한 (기본값: undefined = 전체 표시)
}

function ReviewCardItem({
  review,
  fieldConfigs,
  type,
  showResource = false,
  limitItems,
  isLastItem = false,
}: {
  review: ReviewData;
  fieldConfigs: ReviewFieldConfig[];
  type: string;
  showResource?: boolean;
  limitItems?: number;
  isLastItem?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const { id } = useParams();

  // 좋아요 수 낙관적 업데이트를 위한 상태
  const [localLikeCount, setLocalLikeCount] = useState(review.likeCount || 0);
  const [localIsLiked, setLocalIsLiked] = useState(false);

  const { handleLike, isPending, isLiked } = useReviewLike(
    type,
    "workReviewId" in review ? review.workReviewId : review.internshipReviewId
  );

  useEffect(() => {
    setLocalIsLiked(isLiked);
  }, [isLiked]);

  const handleOptimisticLike = () => {
    const wasLiked = localIsLiked;

    setLocalIsLiked(!wasLiked);
    setLocalLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1));

    handleLike();
  };

  const handleWriteReview = () => {
    if (id && user && id !== "unknown") {
      if (user.role === "TEACHER") {
        navigate(`/kindergarten/${id}/review/new?type=work`);
      } else if (user.role === "PROSPECTIVE_TEACHER") {
        navigate(`/kindergarten/${id}/review/new?type=learning`);
      }
    }
  };

  const isContentBlocked = !user?.hasWrittenReview;

  const reviewId =
    "workReviewId" in review ? review.workReviewId : review.internshipReviewId;

  return (
    <div
      className={`${!isLastItem ? "border-b border-b-primary-light02 pb-7" : ""}`}
    >
      <div className="flex flex-col gap-7 px-5">
        <div className="flex items-start justify-between">
          <ReviewSummary
            rating={getTotalRating(review, type)}
            title={review.oneLineComment}
            workType={review.workType}
            createdAt={review.createdAt || ""}
            workYear={getWorkYear(review, type)}
          />
          <ReportDropDown targetId={reviewId} targetType="REVIEW" />
        </div>

        {showResource && (
          <ReviewResource
            kindergartenId={review.kindergartenId.toString()}
            kindergartenName={review.kindergartenName}
            className="-mt-4"
          />
        )}

        {isContentBlocked ? (
          <div className="relative">
            <div className="pointer-events-none opacity-70 blur-sm">
              <ReviewContent
                review={review}
                type={type}
                fieldConfigs={fieldConfigs}
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
                limitItems={limitItems}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <p className="text-center text-sm font-medium text-primary">
                리뷰를 작성하고 <br /> 전체 리뷰를 확인해보세요!
              </p>
              <Button
                variant="primary"
                size="md"
                font="sm_sb"
                onClick={handleWriteReview}
                className="px-4 text-primary-normal02"
              >
                리뷰쓰기
              </Button>
            </div>
          </div>
        ) : (
          <ReviewContent
            review={review}
            type={type}
            fieldConfigs={fieldConfigs}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
            limitItems={limitItems}
          />
        )}

        <div className="flex justify-end">
          <ReviewActions
            likeCount={localLikeCount}
            onLike={handleOptimisticLike}
            isPending={isPending}
            isLiked={localIsLiked}
            shareData={{
              title: `${review.kindergartenName} ${type === "work" ? "근무" : "실습"} 리뷰`,
              id: reviewId.toString(),
              isWork: type === "work",
              shareType: ShareType.REVIEW,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ReviewCard({
  review,
  fieldConfigs,
  type,
  showResource = false,
  limitItems,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {Array.isArray(review) ? (
        review.map((item, index) => (
          <ReviewCardItem
            key={
              "workReviewId" in item
                ? item.workReviewId
                : item.internshipReviewId
            }
            review={item}
            fieldConfigs={fieldConfigs}
            type={type}
            showResource={showResource}
            limitItems={limitItems}
            isLastItem={index === review.length - 1}
          />
        ))
      ) : (
        <ReviewCardItem
          review={review}
          fieldConfigs={fieldConfigs}
          type={type}
          showResource={showResource}
          limitItems={limitItems}
          isLastItem={true}
        />
      )}
    </div>
  );
}
