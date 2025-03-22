import { URL } from "@/constants/url";
import PageLayout from "@/components/@shared/layout/page-layout";

export default function SignUp() {
  return (
    <PageLayout
      title="원바원 | 회원가입"
      currentPath={URL.HOME}
      headerTitle=" "
      isGlobalNavBar={false}
    >
      <h1 className="text-center text-2xl font-bold my-10">이메일로 가입</h1>
    </PageLayout>
  );
}
