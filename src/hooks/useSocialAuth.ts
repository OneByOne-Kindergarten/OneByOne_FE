import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { naverCallback, kakaoCallback } from "@/services/authService";
import {
  NaverCallbackRequest,
  KakaoCallbackRequest,
  SignInResponse,
} from "@/types/authDTO";
import { URL_PATHS } from "@/constants/url-path";
import { useToast } from "./useToast";

export const useNaverAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<SignInResponse, Error, NaverCallbackRequest>({
    mutationFn: naverCallback,
    onSuccess: () => {
      toast({
        title: "네이버 로그인 성공",
        description: "어서오세요. 선생님!",
      });
      navigate(URL_PATHS.HOME);
    },
    onError: (error) => {
      console.error("네이버 로그인 실패:", error);
      toast({
        title: "네이버 로그인 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });
};

export const useKakaoAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<SignInResponse, Error, KakaoCallbackRequest>({
    mutationFn: kakaoCallback,
    onSuccess: () => {
      toast({
        title: "카카오 로그인 성공",
        description: "어서오세요. 선생님!",
      });
      navigate(URL_PATHS.HOME);
    },
    onError: (error) => {
      console.error("카카오 로그인 실패:", error);
      toast({
        title: "카카오 로그인 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });
};

export const extractAuthParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    // 네이버 콜백용
    code: urlParams.get("code"),
    state: urlParams.get("state"),
    // 에러 처리용
    error: urlParams.get("error"),
    error_description: urlParams.get("error_description"),
  };
};

export const getSocialLoginUrl = {
  naver: (state: string) => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const baseUrl =
      import.meta.env.VITE_REDIRECT_BASE_URL || window.location.origin;
    const redirectUri = encodeURIComponent(
      `${baseUrl}${URL_PATHS.NAVER_CALLBACK}`
    );

    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  },

  kakao: () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const baseUrl =
      import.meta.env.VITE_REDIRECT_BASE_URL || window.location.origin;
    const redirectUri = encodeURIComponent(
      `${baseUrl}${URL_PATHS.KAKAO_CALLBACK}`
    );

    return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  },
};
