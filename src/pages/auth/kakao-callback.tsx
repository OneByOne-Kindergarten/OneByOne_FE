import { useEffect } from "react";
import { useKakaoAuth, extractAuthParams } from "@/hooks/useSocialAuth";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";

export default function KakaoCallbackPage() {
  const kakaoAuthMutation = useKakaoAuth();

  useEffect(() => {
    const handleKakaoCallback = () => {
      const { code, error, error_description } = extractAuthParams();

      // 에러가 있는 경우
      if (error) {
        console.error("카카오 로그인 에러:", error, error_description);
        return;
      }

      // 필수 파라미터 확인
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

      // 실행 표시
      sessionStorage.setItem(sessionKey, "true");

      // 카카오 로그인 실행
      kakaoAuthMutation.mutate({ code });
    };

    handleKakaoCallback();
  }, []);

  if (kakaoAuthMutation.isError) {
    return (
      <Error type="page">카카오 로그인 처리 중 오류가 발생했습니다.</Error>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner type="page" />
        <p className="mt-4 text-gray-600">카카오 로그인 처리 중...</p>
      </div>
    </div>
  );
}
