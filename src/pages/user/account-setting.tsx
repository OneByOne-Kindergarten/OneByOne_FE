import { useState } from "react";
import { Link } from "react-router-dom";

import { useSignOut, useWithdrawUser } from "@/hooks/useAuth";
import PageLayout from "@/components/@shared/layout/page-layout";
import PopUpModal from "@/components/@shared/modal/pop-up";
import Button from "@/components/@shared/buttons/base-button";
import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS } from "@/constants/assets-path";

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
      mainClassName="flex flex-col gap-0 pb-5 mb-24"
    >
      <section className="flex flex-col gap-4 p-5 font-bold bg-white">
        <menu className="text-primary-dark01 flex flex-col gap-6">
          <li className="flex items-center flex-1 justify-between">
            <div className="flex items-center gap-5">
              <img
                src={SVG_PATHS.LOGOUT}
                alt="유저 아이콘"
                width="20"
                height="20"
              />
              <span>비밀번호 변경</span>
            </div>
            <Link to={URL_PATHS.USER_PASSWORD_EDITOR}>
              <img
                src={SVG_PATHS.ARROW.right}
                alt="오른쪽 방향 화살표 아이콘"
                width="24"
                height="24"
              />
            </Link>
          </li>
          <li className="flex items-center flex-1 justify-between">
            <div className="flex items-center gap-5">
              <img
                src={SVG_PATHS.LOGOUT}
                alt="유저 아이콘"
                width="20"
                height="20"
              />
              <span>로그아웃</span>
            </div>
            <button onClick={() => setIsSignOutModalOpen(true)}>
              <img
                src={SVG_PATHS.ARROW.right}
                alt="오른쪽 방향 화살표 아이콘"
                width="24"
                height="24"
              />
            </button>
          </li>
          <li className="flex items-center flex-1 justify-between">
            <div className="flex items-center gap-5">
              <img
                src={SVG_PATHS.LEAVE}
                alt="회원 탈퇴 유저 아이콘"
                width="20"
                height="20"
              />
              <span>회원 탈퇴</span>
            </div>
            <button onClick={() => setIsWithdrawModalOpen(true)}>
              <img
                src={SVG_PATHS.ARROW.right}
                alt="오른쪽 방향 화살표 아이콘"
                width="24"
                height="24"
              />
            </button>
          </li>
        </menu>
      </section>

      <PopUpModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        title="로그아웃 하시겠어요?"
        className="text-center"
        footer={
          <div className="flex flex-1 gap-2">
            <Button
              className="w-full bg-primary-dark02 text-white"
              onClick={() => setIsSignOutModalOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                signOut();
                setIsSignOutModalOpen(false);
              }}
            >
              로그아웃
            </Button>
          </div>
        }
      >
        언제든지 다시 로그인하실 수 있습니다.
      </PopUpModal>

      <PopUpModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        title={
          <div className="flex flex-col gap-3 items-center">
            <div className="w-11 h-11 rounded-full bg-secondary-light03 flex items-center justify-center">
              <img
                src={SVG_PATHS.ALERT}
                alt="경고 아이콘"
                width={30}
                height={30}
              />
            </div>
            <p className="font-semibold text-primary-dark02">회원 탈퇴</p>
          </div>
        }
        className="text-center"
        footer={
          <div className="flex flex-1 gap-2">
            <Button
              className="w-full bg-primary-dark02 text-white"
              onClick={() => setIsWithdrawModalOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                withdraw();
                setIsWithdrawModalOpen(false);
              }}
            >
              탈퇴
            </Button>
          </div>
        }
      >
        정말로 탈퇴하시겠어요? <br /> 탈퇴 후에는 계정을 복구할 수 없습니다.
      </PopUpModal>
    </PageLayout>
  );
}
