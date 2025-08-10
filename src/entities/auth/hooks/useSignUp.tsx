import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signUp } from "@/entities/auth/api";
import { URL_PATHS } from "@/shared/constants/url-path";
import { toast } from "@/shared/hooks/useToast";

import { SignUpRequest, SignUpResponse } from "../type";

interface SignupCallbacks {
  onComplete?: () => void; // 완료 시 추가 동작
}

/**
 * 회원가입 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useSignUp = (callbacks?: SignupCallbacks) => {
  const navigate = useNavigate();

  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
    onSuccess: () => {
      toast({
        title: "회원가입 완료",
        description: "지금 바로 로그인해보세요! 🎉",
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
                title: "회원가입 완료",
                description: "지금 바로 로그인해보세요! 🎉",
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
