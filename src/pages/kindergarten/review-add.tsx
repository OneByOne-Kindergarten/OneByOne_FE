import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { REVIEW_TYPES, REVIEW_TYPE_LABELS } from "@/shared/constants/review";
import PageLayout from "@/shared/ui/layout/page-layout";
import ReviewFormManager from "@/widgets/review-editor/ui/ReviewFormManager";

export default function ReviewEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const reviewData = searchParams.get("data");
  const safeId = id || "unknown";

  // URL에서 전달된 리뷰 데이터 파싱 (있으면 수정 모드, 없으면 생성 모드)
  const initialData = reviewData
    ? JSON.parse(decodeURIComponent(reviewData))
    : undefined;
  const isEditMode = !!initialData;

  // 현재 경로 확인 (edit 또는 new)
  const isEditPath = location.pathname.includes("/edit");
  const mode = isEditMode || isEditPath ? "수정" : "작성";
  const pathSuffix = isEditPath ? "edit" : "new";

  return (
    <PageLayout
      title={`원바원 | ${safeId} ${REVIEW_TYPE_LABELS[type as "work" | "learning"]} ${mode}`}
      headerTitle=" "
      headerType="kindergarten"
      description={`${safeId} ${REVIEW_TYPE_LABELS[type as "work" | "learning"]} ${mode} 페이지`}
      currentPath={`/kindergarten/${safeId}/review/${pathSuffix}?type=${type}`}
      mainBg="gray"
      isGlobalNavBar={false}
    >
      <ReviewFormManager
        schoolId={safeId}
        type={type}
        isEditMode={isEditMode}
        initialData={initialData}
      />
    </PageLayout>
  );
}
