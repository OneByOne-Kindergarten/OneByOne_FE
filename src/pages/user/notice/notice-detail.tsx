import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { URL_PATHS } from "@/common/constants/url-path";
import Empty from "@/common/ui/layout/empty";
import PageLayout from "@/common/ui/layout/page-layout";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import NoticeDetail from "@/widgets/noticeList/NoticeDetail";

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
      mainClassName="px-5 py-5 mt-14 mb-14"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <NoticeDetail id={Number(id)} />
      </Suspense>
    </PageLayout>
  );
}
