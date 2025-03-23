import { useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { REVIEW_TYPES, REVIEW_TYPE_LABELS } from "@/constants/review";
import PageLayout from "@/components/@shared/layout/page-layout";
import NavBar from "@/components/@shared/nav/nav-bar";
import ReviewLayout from "@/components/review/review-layout";
import PostButton from "@/components/@shared/buttons/post-button";
import { setReviewState } from "@/utils/sessionStorage";

export default function Review() {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 리뷰 타입 설정
  const reviewType =
    searchParams.get("type") === REVIEW_TYPES.LEARNING
      ? REVIEW_TYPES.LEARNING
      : REVIEW_TYPES.WORK;

  const reviewPath = `/school/${safeId}/review?type=${reviewType}`;

  // 세션 스토리지에 현재 경로 저장
  useEffect(() => {
    setReviewState({
      path: reviewPath,
      type: reviewType as "work" | "learning",
    });
  }, [safeId, reviewType, reviewPath]);

  const handleWriteReview = () => {
    navigate(`/school/${safeId}/review/new?type=${reviewType}`);
  };

  const schoolOptions = [
    { href: `/school/${safeId}`, label: "기관정보" },
    {
      href: `/school/${safeId}/review?type=${REVIEW_TYPES.WORK}`,
      label: REVIEW_TYPE_LABELS[REVIEW_TYPES.WORK],
    },
    {
      href: `/school/${safeId}/review?type=${REVIEW_TYPES.LEARNING}`,
      label: REVIEW_TYPE_LABELS[REVIEW_TYPES.LEARNING],
    },
  ];

  return (
    <PageLayout
      title={`원바원 | ${safeId} ${REVIEW_TYPE_LABELS[reviewType]}`}
      description={`${safeId} 유치원 ${REVIEW_TYPE_LABELS[reviewType]} 정보`}
      headerTitle={`${safeId}`}
      currentPath={reviewPath}
      mainBg={reviewType === REVIEW_TYPES.WORK ? "gray" : "white"}
      mainClassName={reviewType === REVIEW_TYPES.WORK ? "gap-0 mb-28" : "mb-28"}
      wrapperBg="white"
    >
      <NavBar id={safeId} options={schoolOptions} currentPath={reviewPath} />
      <ReviewLayout type={reviewType as "work" | "learning"} />
      <PostButton onClick={handleWriteReview} label="리뷰쓰기" />
    </PageLayout>
  );
}
