import { useEffect } from "react";

import Error from "@/components/@shared/layout/error";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { extractAuthParams, useNaverAuth } from "@/hooks/useSocialAuth";

export default function NaverCallbackPage() {
  const naverAuthMutation = useNaverAuth();

  useEffect(() => {
    const handleNaverCallback = () => {
      const { code, state } = extractAuthParams();

      if (!code || !state) {
        console.error("네이버 콜백 파라미터 누락:", { code, state });
        return;
      }

      // 중복 실행 방지 체크
      const sessionKey = `naver_auth_${code}`;
      if (sessionStorage.getItem(sessionKey)) {
        console.log("네이버 로그인 중복 실행 방지");
        return;
      }

      sessionStorage.setItem(sessionKey, "true");

      naverAuthMutation.mutate({ code, state });
    };

    handleNaverCallback();
  }, []);

  if (naverAuthMutation.isError) {
    return (
      <Error type="page">네이버 로그인 처리 중 오류가 발생했습니다.</Error>
    );
  }

  return <LoadingSpinner />;
}
