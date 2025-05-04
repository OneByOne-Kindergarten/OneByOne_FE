import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";

export default function HomePage() {
  return (
    <PageLayout
      title="원바원 | 홈"
      description="원바원 홈"
      headerLogo={true}
      currentPath={URL_PATHS.HOME}
    >
      <div>HomePage</div>
    </PageLayout>
  );
}
