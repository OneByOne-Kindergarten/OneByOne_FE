import { useMutation } from "@tanstack/react-query";

import { updateNickname } from "@/entities/user/api";
import { toast } from "@/shared/hooks/useToast";

/**
 * 닉네임 변경 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useUpdateNickname = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: (newNickname: string) => updateNickname(newNickname),
    onSuccess: () => {
      toast({
        title: "닉네임 설정 완료",
        description: "새로운 닉네임으로 활동해보세요. 🤗",
        variant: "default",
      });
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
        title: "닉네임 변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
