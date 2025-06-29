import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS, IMAGE_PATHS } from "@/constants/assets-path";
import { Link } from "react-router-dom";
import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";
import OauthButton from "@/components/sign-in/OauthButton";
import {
  isFlutterWebView,
  useRequestFcmToken,
} from "@/hooks/useFlutterCommunication";
import { useEffect } from "react";
import { setCookie } from "@/services/authService";

export default function RootPage() {
  const [requestFcmToken] = useRequestFcmToken();

  /// 플러터 웹뷰인 경우 토큰 요청
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
      <section className="pt-[10vh] flex flex-col text-center gap-4 justify-center mx-auto">
        <h1>
          <strong>선생님</strong>들의 <strong>진짜 유치원 이야기</strong>
        </h1>
        <img
          src={IMAGE_PATHS.LOGO.MAIN}
          alt="원바원 로고"
          width={89}
          height={31}
          className="mx-auto"
        />
      </section>
      <section className="flex flex-col gap-9 w-3/4 justify-center mx-auto">
        <div className="flex flex-col gap-3">
          <OauthButton type="kakao" />
          <OauthButton type="naver" />
          <OauthButton type="apple" />
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

          {/* 권한 테스트 페이지 링크 */}
          <Link to={URL_PATHS.PERMISSION_TEST}>
            <Button
              font="md"
              className="relative w-full bg-blue-500 text-white mt-4"
            >
              Flutter 권한 테스트 페이지
            </Button>
          </Link>
        </div>
        <div className="flex gap-2 justify-center text-xs">
          <p className="text-primary-dark01">아직 회원이 아니신가요?</p>
          <Link
            to={URL_PATHS.SIGNUP}
            className="text-tertiary-3 font-semibold underline"
          >
            회원가입
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
