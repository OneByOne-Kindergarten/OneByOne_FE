import { URL } from "@/constants/url";
import PageLayout from "@/components/@shared/layout/page-layout";

export default function SignIn() {
  return (
    <PageLayout
      title="원바원 | 로그인"
      currentPath={URL.HOME}
      isGlobalNavBar={false}
    >
      <h1 className="text-center text-2xl font-bold my-10">이메일로 로그인</h1>
    </PageLayout>
  );
}
