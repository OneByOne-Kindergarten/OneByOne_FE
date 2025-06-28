import { useEffect } from "react";
import { useAppleAuth } from "@/hooks/useSocialAuth";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";

export default function AppleCallbackPage() {
  const appleAuthMutation = useAppleAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id_token = urlParams.get("id_token");
    const error = urlParams.get("error");
    const error_description = urlParams.get("error_description");

    console.log("애플 콜백 파라미터:", { id_token, error, error_description });

    // 에러가 있는 경우
    if (error) {
      console.error("애플 로그인 에러:", error, error_description);
      return;
    }

    // 필수 파라미터 확인
    if (!id_token) {
      console.error("애플 콜백 파라미터 누락:", { id_token });
      return;
    }

    console.log("애플 로그인 시도:", { id_token });

    // 애플 로그인 실행
    appleAuthMutation.mutate({ id_token });
  }, []);

  if (appleAuthMutation.isError) {
    console.error("애플 로그인 mutation 에러:", appleAuthMutation.error);
    return (
      <Error type="page">애플 로그인 처리 중 오류가 발생했습니다.</Error>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner type="page" />
        <p className="mt-4 text-gray-600">애플 로그인 처리 중...</p>
      </div>
    </div>
  );
} 