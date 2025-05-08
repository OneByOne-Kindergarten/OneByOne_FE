import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";
export default function InquiryEditorPage() {
  return (
    <PageLayout
      title="원바원 | 1:1 문의"
      description="1:1 문의 작성"
      headerTitle="1:1 문의하기"
      currentPath={URL_PATHS.INQUIRY}
    >
      <div>InquiryEditorPage</div>
    </PageLayout>
  );
}
