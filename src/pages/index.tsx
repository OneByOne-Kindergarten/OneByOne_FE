import { useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@/components/@shared/buttons/base-button";
import PageLayout from "@/components/@shared/layout/page-layout";
import OauthButton from "@/components/sign-in/OauthButton";
import { IMAGE_PATHS, SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";
import {
  isFlutterWebView,
  useRequestFcmToken,
} from "@/hooks/useFlutterCommunication";
import { setCookie } from "@/services/authService";

const oauthButtons = [
  { type: "kakao" as const },
  { type: "naver" as const },
  { type: "apple" as const },
];

export default function RootPage() {
  const [requestFcmToken] = useRequestFcmToken();

  useEffect(() => {
    const getToken = async () => {
      const token = await requestFcmToken();
      if (token) {
        setCookie("fcmToken", token);
        console.log("FCM 토큰 저장  >> ", token);
      }
    };

    if (isFlutterWebView) {
      getToken();
    }
  }, []);

  return (
    <PageLayout
      currentPath={URL_PATHS.ROOT}
      isGlobalNavBar={false}
      mainClassName="my-auto flex flex-col gap-[10vh]"
      wrapperBg="white"
    >
      <section className="mx-auto flex flex-col justify-center gap-4 pt-[10vh] text-center">
        <h1>
          <strong>선생님</strong>들의 <strong>진짜 유치원 이야기</strong>
        </h1>
        <img
          src={IMAGE_PATHS.LOGO.MAIN}
          alt="원바원 로고"
          width={89}
          height={31}
          className="animate-slide-in-from-left mx-auto"
        />
      </section>
      <section className="mx-auto flex w-3/4 flex-col justify-center gap-9">
        <div className="flex flex-col gap-3">
          {oauthButtons.map((button) => (
            <OauthButton key={button.type} type={button.type} />
          ))}
          <Link to={URL_PATHS.SIGNIN}>
            <Button font="md" className="relative w-full text-black">
              <img
                src={SVG_PATHS.EMAIL}
                width="24"
                height="24"
                className="absolute left-4"
              />
              Email로 시작하기
            </Button>
          </Link>
        </div>
        <div className="flex justify-center gap-2 text-xs">
          <p className="text-primary-dark01">아직 회원이 아니신가요?</p>
          <Link
            to={URL_PATHS.SIGNUP}
            className="font-semibold text-tertiary-3 active:opacity-70"
          >
            회원가입
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
