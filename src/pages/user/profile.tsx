import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import { Switch } from "@/components/@shared/switch";
import ToolTip from "@/components/@shared/tool-tip";
import ProfileDetail from "@/components/user/ProfileDetail";
import ProfileImage from "@/components/user/ProfileImage";
import { IMAGE_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";
import { userAtom } from "@/stores/userStore";

export default function ProfilePage() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  return (
    <PageLayout
      title="원바원 | 프로필"
      description="사용자 프로필 수정"
      headerTitle="프로필 수정"
      currentPath={URL_PATHS.USER}
      wrapperBg="white"
      mainClassName="flex flex-col gap-5 pb-5 mb-24 mt-14 px-5"
    >
      <section className="flex flex-col items-center gap-2.5 py-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-semibold text-primary-dark01">프로필</h2>
          <Link
            to={URL_PATHS.USER_PROFILE_EDITOR}
            className="text-sm text-primary-normal03"
          >
            편집
          </Link>
        </div>
        <ProfileImage role={user?.role} />
        <ProfileDetail user={user} className="items-center" />
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-semibold text-primary-dark01">근무지역</h2>
            <ToolTip>
              교사 인증 시 최근 근무했던 지역으로 자동 설정됩니다.
            </ToolTip>
          </div>
          {user?.career ? (
            <p className="font-semibold text-primary-normal03">
              {user?.career}
            </p>
          ) : (
            <p className="font-semibold text-primary-normal03">미설정</p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2.5">
              <h2 className="font-semibold text-primary-dark01">경력</h2>
              <ToolTip>교사 인증 시 자동 설정됩니다.</ToolTip>
            </div>
            {user?.career ? (
              <p className="font-semibold text-primary-normal03">
                {user?.career}
              </p>
            ) : (
              <p className="font-semibold text-primary-normal03">N년차</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-primary-dark01">
            프로필 공개 범위
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-primary-dark01">
                근무 지역 공개
              </h3>
              <p className="text-xs text-primary-dark01">
                공개하면 커뮤니티 근무 지역이 노출돼요.
              </p>
            </div>
            <Switch />
          </div>
          <img
            src={IMAGE_PATHS.GUIDE.PROFILE}
            alt="프로필 공개 범위"
            width={335}
            height={128}
            className="w-full"
          />
        </div>
      </section>
    </PageLayout>
  );
}
