import { Suspense } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { REVIEW_TYPES } from "@/common/constants/review";
import PostButton from "@/common/ui/buttons/post-button";
import PageLayout from "@/common/ui/layout/page-layout";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import { useKindergartenName } from "@/entities/kindergarten/hooks";
import { SortType } from "@/entities/review/DTO.d";
import TotalRatingSection from "@/features/review/TotalRatingSection";
import NavBar from "@/widgets/nav/nav-bar";
import ReviewList from "@/widgets/reviewList";
import { useReviewPage } from "@/widgets/reviewList/useReviewPage";

const SCHOOL_DEFAULT_NAME = "";

function ReviewContent() {
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

export default function ReviewPage() {
  const { id: kindergartenId } = useParams<{ id: string }>();
  const safeKindergartenId = kindergartenId || "unknown";
  const { data: kindergartenData } = useKindergartenName(safeKindergartenId);
  const kindergartenName = kindergartenData?.name || SCHOOL_DEFAULT_NAME;

  return (
    <PageLayout
      title={`원바원 | ${safeKindergartenId} 유치원`}
      headerTitle={kindergartenName}
      headerType="kindergarten"
      currentPath={`/kindergarten/${safeKindergartenId}/review`}
      kindergartenId={safeKindergartenId}
      showBookmark={true}
      mainBg="gray"
      mainClassName="gap-0 mt-14 mb-28"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <ReviewContent />
      </Suspense>
    </PageLayout>
  );
}
