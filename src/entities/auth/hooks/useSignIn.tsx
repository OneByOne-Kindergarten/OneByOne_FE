import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signIn } from "@/entities/auth/api";
import { SignInRequest, SignInResponse } from "@/entities/auth/DTO.d";
import { URL_PATHS } from "@/shared/constants/url-path";
import { toast } from "@/shared/hooks/useToast";

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
        title: `선생님, 어서오세요! 🤗`,
        variant: "default",
      });

      navigate(URL_PATHS.HOME);
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
