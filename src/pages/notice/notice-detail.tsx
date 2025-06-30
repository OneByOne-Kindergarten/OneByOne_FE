import { useParams } from "react-router-dom";
import { Suspense } from "react";

import NoticeDetail from "@/components/notice/NoticeDetail";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Empty from "@/components/@shared/layout/empty";
import { URL_PATHS } from "@/constants/url-path";

export default function NoticeDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <Empty title="공지사항을 찾을 수 없습니다." />;
  }

  return (
    <PageLayout
      title="원바원 | 공지사항"
      description="공지사항 상세"
      headerTitle="공지사항"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
      wrapperBg="white"
      mainClassName="px-5 py-5 mt-14"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <NoticeDetail id={Number(id)} />
      </Suspense>
    </PageLayout>
  );
}
