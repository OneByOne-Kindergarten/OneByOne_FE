import { useEffect } from "react";
import { useKakaoAuth, extractAuthParams } from "@/hooks/useSocialAuth";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";

export default function KakaoCallbackPage() {
  const kakaoAuthMutation = useKakaoAuth();

  useEffect(() => {
    const handleKakaoCallback = () => {
      const { code, error, error_description } = extractAuthParams();

      if (error) {
        console.error("error:", error, error_description);
        return;
      }

      if (!code) {
        console.error("parameter not found:", { code });
        return;
      }

      kakaoAuthMutation.mutate({ code });
    };

    handleKakaoCallback();
  }, [kakaoAuthMutation]);

  if (kakaoAuthMutation.isError) {
    return <Error type="page">카카오 로그인 중 오류가 발생했습니다.</Error>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner type="page" />
    </div>
  );
}
