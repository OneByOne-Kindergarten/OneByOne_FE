import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/common/constants/url-path";
import { toast } from "@/common/hooks/useToast";
import { withdrawUser } from "@/entities/user/api";

/**
 * 회원 탈퇴 API 호출
 * - 에러 처리
 * - 토스트 관리
 * - 성공 시 로그인 페이지로 이동
 */
export const useWithdrawUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => withdrawUser(),
    onSuccess: () => {
      toast({
        title: "회원 탈퇴 완료",
        description: "그동안 이용해주셔서 감사합니다. 🥲",
        variant: "default",
      });
      navigate(URL_PATHS.ROOT);
    },
    onError: (error) => {
      let errorMessage = "회원 탈퇴에 실패했습니다. 다시 시도해주세요.";

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
        title: "회원 탈퇴 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
