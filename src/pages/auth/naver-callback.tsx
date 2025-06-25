import { useEffect } from "react";
import { useNaverAuth, extractAuthParams } from "@/hooks/useSocialAuth";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";

export default function NaverCallbackPage() {
  const naverAuthMutation = useNaverAuth();

  useEffect(() => {
    const handleNaverCallback = () => {
      const { code, state, error, error_description } = extractAuthParams();

      if (error) {
        console.error("error:", error, error_description);
        return;
      }

      if (!code || !state) {
        console.error("parameter not found:", { code, state });
        return;
      }

      naverAuthMutation.mutate({ code, state });
    };

    handleNaverCallback();
  }, [naverAuthMutation]);

  if (naverAuthMutation.isError) {
    return <Error type="page">네이버 로그인 중 오류가 발생했습니다.</Error>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner type="page" />
    </div>
  );
}
