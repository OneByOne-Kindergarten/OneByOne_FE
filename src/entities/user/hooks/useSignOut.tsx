import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signOut } from "@/entities/auth/api";
import { URL_PATHS } from "@/shared/constants/url-path";
import { toast } from "@/shared/hooks/useToast";

/**
 * 로그아웃 API 호출
 * - 에러 처리
 * - 토스트 관리
 * - 성공 시 로그인 페이지로 이동
 */
export const useSignOut = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast({
        title: "로그아웃 완료",
        description: "다음에 또 만나요! 🤗",
        variant: "default",
      });
      navigate(URL_PATHS.ROOT);
    },
    onError: (error) => {
      let errorMessage = "로그아웃에 실패했습니다. 다시 시도해주세요.";

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
        title: "로그아웃 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
