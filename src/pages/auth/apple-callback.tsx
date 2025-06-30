import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { setCookie } from "@/services/authService";
import { getUserInfo } from "@/services/userService";
import { URL_PATHS } from "@/constants/url-path";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";

export default function AppleCallbackPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // 중복 실행 방지
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleAppleCallback = async () => {
      try {
        // URL 파라미터에서 토큰 정보 확인 - 백엔드에서 리다이렉트됨
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");
        const error = urlParams.get("error");
        const errorMessage = urlParams.get("message");

        // 토큰 정보 콘솔 로깅
        console.log("애플 콜백 파라미터:", { 
          accessToken: accessToken ? accessToken.substring(0, 20) + "..." : null,
          refreshToken: refreshToken ? refreshToken.substring(0, 20) + "..." : null,
          error,
          errorMessage
        });

        // 에러가 있는 경우
        if (error) {
          console.error("애플 로그인 에러:", error, errorMessage);
          toast({
            title: "애플 로그인 실패",
            description: errorMessage ? decodeURIComponent(errorMessage) : "로그인 중 오류가 발생했습니다.",
            variant: "destructive",
          });
          navigate(URL_PATHS.ROOT, { replace: true });
          return;
        }

        // 토큰이 있는 경우
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);
          await getUserInfo();
          toast({
            title: "선생님, 어서오세요!",
          });
          navigate(URL_PATHS.HOME, { replace: true });

        // 토큰이 없는 경우
        } else {
          console.error("애플 콜백 파라미터 누락:", { accessToken, refreshToken });
          toast({
            title: "애플 로그인 실패",
            description: "인증 정보를 받을 수 없습니다.",
            variant: "destructive",
          });
          navigate(URL_PATHS.ROOT, { replace: true });
        }

      // 에러 처리
      } catch (error) {
        console.error("애플 로그인 처리 중 오류:", error);
        toast({
          title: "애플 로그인 실패",
          description: "로그인 처리 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        navigate(URL_PATHS.ROOT, { replace: true });
      }
    };

    handleAppleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">애플 로그인 처리 중...</p>
      </div>
    </div>
  );
} 