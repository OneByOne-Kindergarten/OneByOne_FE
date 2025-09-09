import { useMutation } from "@tanstack/react-query";

import { sendEmailCertification } from "@/entities/user/api";
import { toast } from "@/shared/hooks/useToast";

/**
 * 이메일 인증 번호 발송 API 호출
 */
export const useSendEmailCertification = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: (email) => sendEmailCertification(email),
    onError: (error) => {
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error && error.message) {
        if (error.message !== "Failed to fetch") {
          errorMessage = error.message;
        }
      }

      toast({
        title: "인증번호 발송 오류",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
