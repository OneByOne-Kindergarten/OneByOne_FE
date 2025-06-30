import { URL_PATHS } from "@/constants/url-path";
import {
  appleCallback,
  kakaoCallback,
  naverCallback,
} from "@/services/authService";
import {
  AppleCallbackRequest,
  KakaoCallbackRequest,
  NaverCallbackRequest,
  SignInResponse,
} from "@/types/authDTO";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";

export const useNaverAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<SignInResponse, Error, NaverCallbackRequest>({
    mutationFn: naverCallback,
    onSuccess: () => {
      setTimeout(() => {
        toast({
          title: "선생님, 어서오세요!",
        });
        navigate(URL_PATHS.HOME, { replace: true });
      }, 100);
    },
    onError: () => {
      toast({
        title: "네이버 로그인 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
      navigate(URL_PATHS.ROOT, { replace: true });
    },
  });
};

export const useKakaoAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<SignInResponse, Error, KakaoCallbackRequest>({
    mutationFn: kakaoCallback,
    onSuccess: () => {
      setTimeout(() => {
        toast({
          title: "선생님, 어서오세요!",
        });
        navigate(URL_PATHS.HOME, { replace: true });
      }, 100);
    },
    onError: () => {
      toast({
        title: "카카오 로그인 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
      navigate(URL_PATHS.ROOT, { replace: true });
    },
  });
};

export const useAppleAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<SignInResponse, Error, AppleCallbackRequest>({
    mutationFn: appleCallback,
    onSuccess: () => {
      setTimeout(() => {
        toast({
          title: "선생님, 어서오세요!",
        });
        navigate(URL_PATHS.HOME, { replace: true });
      }, 100);
    },
    onError: () => {
      toast({
        title: "애플 로그인 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });
};

export const extractAuthParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    code: urlParams.get("code"),
    state: urlParams.get("state"),
  };
};

export const getSocialLoginUrl = {
  naver: (state: string) => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      import.meta.env.VITE_PUBLIC_NAVER_REDIRECT_URI
    );

    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  },

  kakao: () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      import.meta.env.VITE_PUBLIC_KAKAO_REDIRECT_URI
    );

    return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  },

  apple: () => {
    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
    // 애플 로그인 리다이렉트 == 서버 주소
    const redirectUri = encodeURIComponent(
      `${import.meta.env.VITE_API_URL}/users/apple/callback`
    );
    return `https://appleid.apple.com/auth/authorize?response_type=code%20id_token&response_mode=form_post&client_id=${clientId}&redirect_uri=${redirectUri}&scope=name%20email`;
  },
};
