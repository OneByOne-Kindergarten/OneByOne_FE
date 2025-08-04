import { Suspense, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Error from "@/components/@shared/layout/error";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import SchoolInfoOverView from "@/components/school/SchoolInfoOverView";
import { URL_PATHS } from "@/constants/url-path";

const SCHOOL_DEFAULT_NAME = "유치원";

export default function SchoolDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const safeId = id || "unknown";
  const [kindergartenName, setKindergartenName] = useState<string | null>(null);

  const handleBackClick = () => {
    if (location.state?.fromBookmarks) {
      navigate(URL_PATHS.BOOKMARKS);
      return;
    }

    navigate(URL_PATHS.SCHOOL);
  };

  return (
    <PageLayout
      title={`원바원 | ${kindergartenName || SCHOOL_DEFAULT_NAME} 상세정보`}
      description={`${kindergartenName || SCHOOL_DEFAULT_NAME} 상세 정보`}
      headerTitle={kindergartenName || ""}
      headerType="school"
      currentPath={URL_PATHS.SCHOOL_DETAIL.replace(":id", safeId)}
      wrapperBg="white"
      kindergartenId={safeId}
      showBookmark={true}
      mainClassName="flex flex-col mt-14"
      hasBackButton={true}
      onBackButtonClick={handleBackClick}
    >
      {id || id === "unknown" ? (
        <Suspense fallback={<LoadingSpinner />}>
          <SchoolInfoOverView
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
