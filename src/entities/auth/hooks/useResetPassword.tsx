import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "@/entities/auth/api";
import { URL_PATHS } from "@/shared/constants/url-path";
import { toast } from "@/shared/hooks/useToast";

import { ResetPasswordRequest, ResetPasswordResponse } from "../type";

/**
 * 임시 비밀번호 요청 API 호출
 * - 에러 처리
 * - 토스트 관리
 * - 성공 시 로그인 페이지로 이동
 */
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        title: "임시 비밀번호 발송 완료",
        description: "로그인 후 비밀번호를 변경해주세요.",
        variant: "default",
      });
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
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "임시 비밀번호 발송 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
