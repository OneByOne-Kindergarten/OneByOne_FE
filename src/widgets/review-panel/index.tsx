import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useKindergartenName } from "@/entities/kindergarten/hooks";
import { SortType } from "@/entities/review/DTO.d";
import NavBar from "@/features/nav/nav-bar";
import { REVIEW_TYPES } from "@/shared/constants/review";
import PostButton from "@/shared/ui/buttons/post-button";
import ReviewList from "@/widgets/content-list/review-list";
import { useReviewPage } from "@/widgets/review-panel/lib/useReviewPage";
import TotalRatingSection from "@/widgets/review-panel/ui/TotalRatingSection";

const SCHOOL_DEFAULT_NAME = "";

export default function ReviewPanel() {
  const { id: kindergartenId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const sortType =
    (searchParams.get("sortType") as SortType) || SortType.LATEST;
  const navigate = useNavigate();

  const safeKindergartenId = kindergartenId || "unknown";
  const { data: kindergartenData } = useKindergartenName(safeKindergartenId);

  const { schoolOptions, fieldConfigs, reviewData, currentPath, isDisabled } =
    useReviewPage(safeKindergartenId, type, sortType);

  const kindergartenName = kindergartenData?.name || SCHOOL_DEFAULT_NAME;

  const handleWriteReview = () => {
    if (!safeKindergartenId || safeKindergartenId === "unknown") return;
    navigate(`/kindergarten/${safeKindergartenId}/review/new?type=${type}`);
  };

  return (
    <>
      <NavBar
        id={safeKindergartenId}
        options={schoolOptions}
        currentPath={currentPath}
      />
      <TotalRatingSection
        reviewCount={reviewData.reviews.length}
        totalRating={reviewData.rating.total}
        scoreData={reviewData.scores}
        fieldConfigs={fieldConfigs.rating}
      />
      <ReviewList
        reviews={reviewData.reviews}
        fieldConfigs={fieldConfigs.review}
        kindergartenName={kindergartenName}
        initialSortType={sortType}
      />
      <PostButton
        onClick={handleWriteReview}
        label="리뷰쓰기"
        isDisabled={isDisabled}
      />
    </>
  );
}
