import { useParams, useSearchParams } from "react-router-dom";
import { REVIEW_TYPES, REVIEW_TYPE_LABELS } from "@/constants/review";
import PageLayout from "@/components/@shared/layout/page-layout";
import ReviewFormManager from "@/components/review/ReviewFormManager";

export default function ReviewEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const safeId = id || "unknown";

  return (
    <PageLayout
      title={`원바원 | ${safeId} ${REVIEW_TYPE_LABELS[type as "work" | "learning"]} 작성`}
      headerTitle=" "
      headerType="school"
      description={`${safeId} ${REVIEW_TYPE_LABELS[type as "work" | "learning"]} 작성 페이지`}
      currentPath={`/school/${safeId}/review/new?type=${type}`}
      mainBg="gray"
    >
      <ReviewFormManager schoolId={safeId} type={type} />
    </PageLayout>
  );
}
