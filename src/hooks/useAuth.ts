import { useMutation } from "@tanstack/react-query";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/authDTO";
import { signIn, signUp } from "@/services/authService";
import { toast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { URL_PATHS } from "@/constants/url-path";

interface SignupCallbacks {
  onComplete?: () => void; // 완료 시 추가 동작
}

/**
 * 로그인 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation<SignInResponse, Error, SignInRequest>({
    mutationFn: signIn,
    onSuccess: () => {
      toast({
        title: `선생님, 어서오세요!`,
        variant: "default",
      });

      navigate(URL_PATHS.SCHOOL);
    },
    onError: (error) => {
      let errorMessage = "이메일 또는 비밀번호를 다시 확인해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "로그인 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 회원가입 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useSignUp = (callbacks?: SignupCallbacks) => {
  const navigate = useNavigate();

  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
    onSuccess: (response) => {
      toast({
        title: `${response.nickname}님, 회원가입 완료`,
        description: "지금 바로 로그인해보세요!",
        variant: "default",
      });

      if (callbacks?.onComplete) {
        callbacks.onComplete();
      }

      navigate(URL_PATHS.SIGNIN);
    },
    onError: (error) => {
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          // 파싱 실패
          if (error.message && error.message !== "Failed to fetch") {
            // 응답 형식 오류지만 회원가입은 성공
            if (error.message.includes("Failed to parse JSON response")) {
              toast({
                title: "회원가입 성공",
                description: "회원가입이 완료되었습니다. 로그인해주세요.",
                variant: "default",
              });
              navigate(URL_PATHS.SIGNIN);
              return;
            }

            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "회원가입 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
