import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Error from "@/components/@shared/layout/error";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { URL_PATHS } from "@/constants/url-path";
import {
  extractAuthParams,
  useKakaoAuth,
  useNaverAuth,
} from "@/hooks/useSocialAuth";
import { useToast } from "@/hooks/useToast";
import { setCookie } from "@/services/authService";
import { getUserInfo } from "@/services/userService";

type SocialProvider = "naver" | "kakao";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export default function OAuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const naverAuthMutation = useNaverAuth();
  const kakaoAuthMutation = useKakaoAuth();
  const { toast } = useToast();
  const [isProcessingDirectToken, setIsProcessingDirectToken] = useState(false);

  // URL 경로 또는 파라미터로 소셜 제공자 구분
  const urlParams = new URLSearchParams(location.search);
  const providerParam = urlParams.get("provider");
  const provider: SocialProvider =
    providerParam === "naver"
      ? "naver"
      : providerParam === "kakao"
        ? "kakao"
        : location.pathname.includes("naver")
          ? "naver"
          : location.pathname.includes("kakao")
            ? "kakao"
            : "kakao"; // 기본값
  const currentMutation =
    provider === "naver" ? naverAuthMutation : kakaoAuthMutation;

  // 페이지 로드 시 상태 확인
  useEffect(() => {
    console.log("🚀 OAuth 콜백 페이지 로드됨:", {
      currentURL: window.location.href,
      pathname: location.pathname,
      search: location.search,
      provider,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });

    // 페이지 내용이 JSON 토큰인지 확인
    const checkForDirectTokenResponse = () => {
      try {
        const bodyText =
          document.body.innerText || document.body.textContent || "";

        // JSON 형태의 토큰 응답이 있는지 확인
        if (
          bodyText.includes("accessToken") &&
          bodyText.includes("refreshToken")
        ) {
          console.log(
            "🎯 직접 토큰 응답 감지됨:",
            bodyText.substring(0, 100) + "..."
          );

          try {
            const tokenData = JSON.parse(bodyText) as TokenResponse;
            if (tokenData.accessToken && tokenData.refreshToken) {
              console.log("✅ 유효한 토큰 데이터 파싱 성공");
              handleDirectTokenResponse(tokenData);
              return true;
            }
          } catch (parseError) {
            console.error("❌ JSON 파싱 실패:", parseError);
          }
        }
      } catch (error) {
        console.error("❌ 토큰 응답 확인 중 오류:", error);
      }
      return false;
    };

    // 페이지 로드 후 잠시 대기 후 확인
    const timer = setTimeout(() => {
      if (!checkForDirectTokenResponse()) {
        console.log("🔄 백엔드 API 직접 호출로 처리");
        // 백엔드 API 직접 호출
        handleDirectAPICall();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location, provider]);

  // 직접 토큰 응답 처리
  const handleDirectTokenResponse = async (tokenData: TokenResponse) => {
    try {
      setIsProcessingDirectToken(true);
      console.log("🍪 직접 토큰을 쿠키에 저장 시작");

      // 쿠키에 토큰 저장
      setCookie("accessToken", tokenData.accessToken);
      setCookie("refreshToken", tokenData.refreshToken);

      // 사용자 정보 로드
      console.log("👤 사용자 정보 로드 시작");
      await getUserInfo();

      // 성공 토스트
      toast({
        title: "선생님, 어서오세요!",
      });

      // 홈으로 리다이렉트
      console.log("🏠 홈으로 리다이렉트");
      setTimeout(() => {
        navigate(URL_PATHS.HOME, { replace: true });
      }, 100);
    } catch (error) {
      console.error("❌ 직접 토큰 처리 중 오류:", error);
      toast({
        title: `${provider === "naver" ? "네이버" : "카카오"} 로그인 실패`,
        description: "토큰 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      navigate(URL_PATHS.ROOT, { replace: true });
    } finally {
      setIsProcessingDirectToken(false);
    }
  };

  // 백엔드 API 직접 호출하여 토큰 받아오기
  const handleDirectAPICall = async () => {
    const { code, state, error, error_description } = extractAuthParams();

    console.log(`${provider} 콜백 파라미터:`, {
      code: code ? code.substring(0, 20) + "..." : null,
      state,
      error,
      error_description,
      fullURL: window.location.href,
    });

    if (error) {
      console.error(`${provider} OAuth 에러:`, error, error_description);
      toast({
        title: `${provider === "naver" ? "네이버" : "카카오"} 로그인 실패`,
        description: error_description || "인증 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      navigate(URL_PATHS.ROOT, { replace: true });
      return;
    }

    if (!code || (provider === "naver" && !state)) {
      console.error(`${provider} 필수 파라미터 누락`);
      toast({
        title: "로그인 실패",
        description: "인증 정보가 올바르지 않습니다.",
        variant: "destructive",
      });
      navigate(URL_PATHS.ROOT, { replace: true });
      return;
    }

    try {
      setIsProcessingDirectToken(true);
      console.log(`🔗 ${provider} 백엔드 API 직접 호출 시작`);

      // 백엔드 API 직접 호출
      const apiUrl =
        provider === "naver"
          ? `${import.meta.env.VITE_API_URL}/users/naver/callback`
          : `${import.meta.env.VITE_API_URL}/users/kakao/callback`;

      const requestBody = provider === "naver" ? { code, state } : { code };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
        return;
      }

      const tokenData = (await response.json()) as TokenResponse;
      console.log(`✅ ${provider} 토큰 받기 성공`);

      // 토큰을 쿠키에 저장
      await handleDirectTokenResponse(tokenData);
    } catch (error) {
      console.error(`❌ ${provider} API 호출 실패:`, error);
      toast({
        title: `${provider === "naver" ? "네이버" : "카카오"} 로그인 실패`,
        description: "서버 통신 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      navigate(URL_PATHS.ROOT, { replace: true });
    } finally {
      setIsProcessingDirectToken(false);
    }
  };

  // 직접 토큰 처리 중일 때
  if (isProcessingDirectToken) {
    const providerName = provider === "naver" ? "네이버" : "카카오";
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-bold">
            {providerName} 로그인 성공!
          </h2>
          <p className="text-sm text-gray-600">토큰 처리 중...</p>
          <div className="mt-4">
            <LoadingSpinner />
          </div>
        </div>
        {import.meta.env.DEV && (
          <div className="bg-green-100 max-w-md rounded p-4 text-xs">
            <h3 className="mb-2 font-bold">직접 토큰 처리:</h3>
            <p>✅ 백엔드에서 직접 받은 토큰을 처리 중입니다.</p>
          </div>
        )}
      </div>
    );
  }

  // 성공 시 간단한 로딩 메시지만 표시 (리다이렉트는 useSocialAuth에서 처리)
  if (currentMutation.isSuccess) {
    const data = currentMutation.data;
    console.log(`${provider} 로그인 성공, 토큰 수신:`, data);

    // 쿠키 확인 - 더 정확한 검증
    const checkCookies = () => {
      const cookies = document.cookie.split("; ").reduce(
        (acc, cookie) => {
          const [name, value] = cookie.split("=");
          acc[name] = value;
          return acc;
        },
        {} as Record<string, string>
      );

      return {
        accessToken: cookies.accessToken,
        refreshToken: cookies.refreshToken,
        hasAccessToken: !!cookies.accessToken,
        hasRefreshToken: !!cookies.refreshToken,
      };
    };

    const cookieStatus = checkCookies();

    const providerName = provider === "naver" ? "네이버" : "카카오";

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-bold">
            {providerName} 로그인 성공!
          </h2>
          <p className="text-sm text-gray-600">홈으로 이동 중...</p>
          <div className="mt-4">
            <LoadingSpinner />
          </div>
          {/* 쿠키 저장 실패 경고 */}
          {!cookieStatus.hasAccessToken || !cookieStatus.hasRefreshToken ? (
            <div className="mt-4 rounded border border-yellow-400 bg-yellow-100 p-3 text-sm">
              <p className="text-yellow-800">
                ⚠️ 쿠키 저장에 문제가 있을 수 있습니다.
              </p>
              <p className="text-xs text-yellow-600">
                Access Token: {cookieStatus.hasAccessToken ? "✅" : "❌"} |
                Refresh Token: {cookieStatus.hasRefreshToken ? "✅" : "❌"}
              </p>
            </div>
          ) : (
            <p className="text-green-600 mt-2 text-xs">
              ✅ 토큰이 정상적으로 저장되었습니다.
            </p>
          )}
        </div>
        {/* 디버깅 정보는 개발 환경에서만 표시 */}
        {import.meta.env.DEV && (
          <div className="max-w-md rounded bg-gray-100 p-4 text-xs">
            <h3 className="mb-2 font-bold">디버그 정보:</h3>
            <p>현재 URL: {window.location.href}</p>
            <p>토큰 수신: ✅</p>
            <p>
              Access Token 쿠키: {cookieStatus.hasAccessToken ? "✅" : "❌"}
            </p>
            <p>
              Refresh Token 쿠키: {cookieStatus.hasRefreshToken ? "✅" : "❌"}
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-gray-600">
                토큰 미리보기
              </summary>
              <pre className="mt-2 overflow-hidden text-xs">
                {JSON.stringify(
                  {
                    accessToken: data.accessToken.substring(0, 30) + "...",
                    refreshToken: data.refreshToken.substring(0, 30) + "...",
                  },
                  null,
                  2
                )}
              </pre>
            </details>
          </div>
        )}
      </div>
    );
  }

  if (currentMutation.isError) {
    const providerName = provider === "naver" ? "네이버" : "카카오";
    console.error(`${provider} 로그인 에러:`, currentMutation.error);
    return (
      <Error type="page">{providerName} 로그인 중 오류가 발생했습니다.</Error>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <LoadingSpinner />
      {/* 디버깅 정보 */}
      {import.meta.env.DEV && (
        <div className="max-w-md rounded bg-gray-100 p-4 text-xs">
          <h3 className="mb-2 font-bold">현재 상태:</h3>
          <p>URL: {window.location.href}</p>
          <p>Provider: {provider}</p>
          <p>Loading: {currentMutation.isPending ? "✅" : "❌"}</p>
          <p>페이지 내용 검사 중...</p>
        </div>
      )}
    </div>
  );
}
