import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";

export default function InquiryPage() {
  return (
    <PageLayout
      title="원바원 | 문의"
      description="사용자 문의사항 목록"
      headerTitle="문의"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
    >
      <div>InquiryPage</div>
    </PageLayout>
  );
}
