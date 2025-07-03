import { useState } from "react";

import PageLayout from "@/components/@shared/layout/page-layout";
import LogOutAlertModal from "@/components/user/LogOutAlertModal";
import MenuItem from "@/components/user/MenuItem";
import WithdrawAlertModal from "@/components/user/WithdrawAlertModal";
import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";
import { useSignOut, useWithdrawUser } from "@/hooks/useAuth";

export default function AccountSettingPage() {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { mutate: signOut } = useSignOut();
  const { mutate: withdraw } = useWithdrawUser();

  return (
    <PageLayout
      title="원바원 | 계정 설정"
      description="계정 설정 및 관리"
      headerTitle="계정 설정"
      currentPath={URL_PATHS.USER}
      mainBg="gray"
      hasBackButton={true}
      mainClassName="flex flex-col gap-0 pb-5 mt-14 mb-24"
    >
      <section className="flex flex-col gap-4 bg-white p-5 font-bold">
        <menu className="flex flex-col gap-6 text-primary-dark01">
          <MenuItem
            iconPath={SVG_PATHS.RESET.password}
            iconAlt="비밀번호 변경 아이콘"
            to={URL_PATHS.USER_PASSWORD_EDITOR}
            label="비밀번호 변경"
          />
          <MenuItem
            iconPath={SVG_PATHS.LOGOUT}
            iconAlt="유저 아이콘"
            label="로그아웃"
            onClick={() => setIsSignOutModalOpen(true)}
          />
          <MenuItem
            iconPath={SVG_PATHS.LEAVE}
            iconAlt="회원탈퇴 아이콘"
            label="회원 탈퇴"
            onClick={() => setIsWithdrawModalOpen(true)}
          />
        </menu>
      </section>

      <LogOutAlertModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onClick={() => signOut()}
        setIsSignOutModalOpen={setIsSignOutModalOpen}
      />

      <WithdrawAlertModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onClick={() => withdraw()}
        setIsWithdrawModalOpen={setIsWithdrawModalOpen}
      />
    </PageLayout>
  );
}
