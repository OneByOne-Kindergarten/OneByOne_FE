import { useMutation } from "@tanstack/react-query";

import { updatePassword } from "@/entities/user/api";
import { toast } from "@/shared/hooks/useToast";

interface PasswordUpdateParams {
  currentPassword: string;
  newPassword: string;
}

/**
 * 비밀번호 변경 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useUpdatePassword = () => {
  return useMutation<boolean, Error, PasswordUpdateParams>({
    mutationFn: ({ currentPassword, newPassword }) =>
      updatePassword(currentPassword, newPassword),
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "비밀번호 변경 완료",
          description: "새로운 비밀번호로 로그인해보세요. 🔓",
          variant: "default",
        });
      } else {
        toast({
          title: "비밀번호 변경 실패",
          description: "현재 비밀번호가 일치하지 않습니다.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      let errorMessage = "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";

      if (error instanceof Error && error.message) {
        if (error.message !== "Failed to fetch") {
          errorMessage = error.message;
        }
      }

      toast({
        title: "비밀번호 변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
