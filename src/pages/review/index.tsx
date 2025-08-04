import { useAtom } from "jotai";
import { Suspense } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import PostButton from "@/components/@shared/buttons/post-button";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import NavBar from "@/components/@shared/nav/nav-bar";
import ReviewList from "@/components/review/ReviewList";
import TotalRatingSection from "@/components/review/TotalRatingSection";
import { REVIEW_TYPES } from "@/constants/review";
import { useKindergartenName } from "@/hooks/useKindergartenName";
import { useReviewPage } from "@/hooks/useReviewPage";
import { userAtom } from "@/stores/userStore";
import { SortType } from "@/types/reviewDTO";

const SCHOOL_DEFAULT_NAME = "";

function ReviewContent() {
  const { id: kindergartenId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const sortType =
    (searchParams.get("sortType") as SortType) || SortType.LATEST;
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  const safeKindergartenId = kindergartenId || "unknown";
  const { data: kindergartenData } = useKindergartenName(safeKindergartenId);

  const { schoolOptions, fieldConfigs, reviewData, currentPath, isDisabled } =
    useReviewPage(safeKindergartenId, type, sortType);

  const kindergartenName = kindergartenData?.name || SCHOOL_DEFAULT_NAME;

  const handleWriteReview = () => {
    if (safeKindergartenId && user && safeKindergartenId !== "unknown") {
      if (user.role === "TEACHER") {
        navigate(`/school/${safeKindergartenId}/review/new?type=work`);
      } else if (user.role === "PROSPECTIVE_TEACHER") {
        navigate(`/school/${safeKindergartenId}/review/new?type=learning`);
      }
    }
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
      headerType="school"
      currentPath={`/school/${safeKindergartenId}/review`}
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
