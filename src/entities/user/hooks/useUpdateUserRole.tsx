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
      const errorMessage =
        (() => {
          try {
            return JSON.parse(error.message).data?.message;
          } catch {
            return error.message;
          }
        })() || "잠시 후 다시 시도해주세요.";

      toast({
        title: "변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
