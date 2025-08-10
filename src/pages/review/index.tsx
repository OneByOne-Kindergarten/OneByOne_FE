import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { useKindergartenName } from "@/entities/kindergarten/hooks";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import ReviewPanel from "@/widgets/review-panel";

const SCHOOL_DEFAULT_NAME = "";

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
        <ReviewPanel />
      </Suspense>
    </PageLayout>
  );
}
