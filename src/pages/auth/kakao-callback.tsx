import { useEffect } from "react";

import Error from "@/common/ui/layout/error";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import { getCookie } from "@/entities/auth/api";
import { extractAuthParams, useKakaoAuth } from "@/entities/auth/hooks";

export default function KakaoCallbackPage() {
  const kakaoAuthMutation = useKakaoAuth();

  useEffect(() => {
    const handleKakaoCallback = () => {
      const { code, error, error_description } = extractAuthParams();

      if (error) {
        console.error("카카오 로그인 에러:", error, error_description);
        return;
      }

      if (!code) {
        console.error("카카오 콜백 파라미터 누락:", { code });
        return;
      }

      // 중복 실행 방지 체크
      const sessionKey = `kakao_auth_${code}`;
      if (sessionStorage.getItem(sessionKey)) {
        console.log("카카오 로그인 중복 실행 방지");
        return;
      }

      sessionStorage.setItem(sessionKey, "true");

      // FCM 토큰 포함해서 mutation 호출
      const fcmToken = getCookie("fcmToken") || "";
      kakaoAuthMutation.mutate({ code, fcmToken });
    };

    handleKakaoCallback();
  }, []);

  if (kakaoAuthMutation.isError) {
    return (
      <Error type="page">카카오 로그인 처리 중 오류가 발생했습니다.</Error>
    );
  }

  return <LoadingSpinner />;
}
