import { useEffect } from "react";
import { useNaverAuth, extractAuthParams } from "@/hooks/useSocialAuth";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";

export default function NaverCallbackPage() {
  const naverAuthMutation = useNaverAuth();

  useEffect(() => {
    const handleNaverCallback = () => {
      const { code, state, error, error_description } = extractAuthParams();

      // 에러가 있는 경우
      if (error) {
        console.error("네이버 로그인 에러:", error, error_description);
        return;
      }

      // 필수 파라미터 확인
      if (!code || !state) {
        console.error("네이버 콜백 파라미터 누락:", { code, state });
        return;
      }

      // 네이버 로그인 실행
      naverAuthMutation.mutate({ code, state });
    };

    handleNaverCallback();
  }, [naverAuthMutation]);

  if (naverAuthMutation.isError) {
    return (
      <Error type="page">네이버 로그인 처리 중 오류가 발생했습니다.</Error>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner type="page" />
        <p className="mt-4 text-gray-600">네이버 로그인 처리 중...</p>
      </div>
    </div>
  );
}
