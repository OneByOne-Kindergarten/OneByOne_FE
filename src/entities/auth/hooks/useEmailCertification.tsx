import { useMutation } from "@tanstack/react-query";

import { toast } from "@/common/hooks/useToast";
import { sendEmailCertification } from "@/entities/user/api";

/**
 * 이메일 인증 번호 발송 API 호출
 */
export const useSendEmailCertification = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: (email) => sendEmailCertification(email),
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
        title: "인증번호 발송 오류",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("이메일 인증번호 발송 실패:", error);
    },
  });
};
