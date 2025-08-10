import { Suspense, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { URL_PATHS } from "@/shared/constants/url-path";
import Error from "@/shared/ui/layout/error";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import KindergartenInfoPanel from "@/widgets/kindergarten-info-panel";

const SCHOOL_DEFAULT_NAME = "유치원";

export default function KindergartenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const safeId = id || "unknown";
  const [kindergartenName, setKindergartenName] = useState<string | null>(null);

  const handleBackClick = () => {
    if (location.state?.fromBookmarks) {
      navigate(URL_PATHS.FAVORITES);
      return;
    }

    navigate(URL_PATHS.KINDERGARTEN);
  };

  return (
    <PageLayout
      title={`원바원 | ${kindergartenName || SCHOOL_DEFAULT_NAME} 상세정보`}
      description={`${kindergartenName || SCHOOL_DEFAULT_NAME} 상세 정보`}
      headerTitle={kindergartenName || ""}
      headerType="kindergarten"
      currentPath={URL_PATHS.KINDERGARTEN}
      wrapperBg="white"
      kindergartenId={safeId}
      showBookmark={true}
      mainClassName="flex flex-col mt-14"
      hasBackButton={true}
      onBackButtonClick={handleBackClick}
    >
      {id || id === "unknown" ? (
        <Suspense fallback={<LoadingSpinner />}>
          <KindergartenInfoPanel
            safeId={safeId}
            onKindergartenLoad={setKindergartenName}
          />
        </Suspense>
      ) : (
        <Error type="page">존재하지 않는 유치원입니다.</Error>
      )}
    </PageLayout>
  );
}
