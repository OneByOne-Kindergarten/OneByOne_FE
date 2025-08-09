import { useMutation } from "@tanstack/react-query";

import { toast } from "@/common/hooks/useToast";
import { checkEmailCertification } from "@/entities/user/api";

/**
 * 이메일 인증 번호 검증 API 호출
 */
export const useCheckEmailCertification = () => {
  return useMutation<boolean, Error, { email: string; certification: string }>({
    mutationFn: ({ email, certification }) =>
      checkEmailCertification(email, certification),
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
        title: "인증번호 검증 오류",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
