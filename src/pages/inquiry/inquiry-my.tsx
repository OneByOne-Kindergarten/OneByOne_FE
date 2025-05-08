import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";

export default function InquiryMyPage() {
  return (
    <PageLayout
      title="원바원 | 문의 내역"
      description="나의 문의 내역 보기"
      headerTitle="문의 내역"
      currentPath={URL_PATHS.INQUIRY}
    >
      <div>InquiryMyPage</div>
    </PageLayout>
  );
}
