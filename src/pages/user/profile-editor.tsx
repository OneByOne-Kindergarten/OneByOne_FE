import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "@/stores/userStore";

import PageLayout from "@/components/@shared/layout/page-layout";
import ProfileDetail from "@/components/user/profile-detail";
import ProfileImage from "@/components/user/profile-image";
import ToolTip from "@/components/@shared/tool-tip";
import { URL_PATHS } from "@/constants/url-path";
import { IMAGE_PATHS } from "@/constants/assets-path";
import { Switch } from "@/components/switch";

export default function ProfileEditorPage() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  return (
    <PageLayout
      title="원바원 | 프로필"
      description="사용자 프로필 수정"
      headerTitle="프로필 수정"
      currentPath={URL_PATHS.USER}
      wrapperBg="white"
      mainClassName="flex flex-col gap-5 pb-5 mb-24 px-5"
    >
      <section className="flex flex-col py-5 items-center gap-2.5 ">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-semibold text-primary-dark01">프로필</h2>
          <button
            className="text-sm text-primary-normal03"
            onClick={() => navigate(URL_PATHS.USER_NICKNAME_EDITOR)}
          >
            편집
          </button>
        </div>
        <ProfileImage profileImageUrl={user?.profileImageUrl} />
        <ProfileDetail user={user} className="items-center" />
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-semibold text-primary-dark01">근무지역</h2>
            <ToolTip>최근 근무했던 지역으로 자동 설정됩니다.</ToolTip>
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
            <h2 className="font-semibold text-primary-dark01">경력</h2>
            {user?.career ? (
              <p className="font-semibold text-primary-normal03">
                {user?.career}
              </p>
            ) : (
              <p className="font-semibold text-primary-normal03">N년차</p>
            )}
          </div>
          <button>
            <span className="text-sm text-primary-normal03">편집</span>
          </button>
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
