import { useMutation } from "@tanstack/react-query";

import { updateUserRole } from "@/entities/user/api";
import { toast } from "@/shared/hooks/useToast";

/**
 * 사용자 권한 변경 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useUpdateUserRole = () => {
  return useMutation<
    boolean,
    Error,
    "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN" | "GENERAL"
  >({
    mutationFn: (role) => updateUserRole(role),
    onError: (error) => {
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error && error.message) {
        if (error.message !== "Failed to fetch") {
          errorMessage = error.message;
        }
      }

      toast({
        title: "변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
