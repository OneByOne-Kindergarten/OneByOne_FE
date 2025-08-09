import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/common/hooks/useToast";

import { answerInquiry } from "../api";
import { AnswerInquiryRequest, InquiryResponse } from "../DTO.d";

export function useAnswerInquiry() {
  const queryClient = useQueryClient();

  return useMutation<
    InquiryResponse,
    Error,
    { id: number; data: AnswerInquiryRequest }
  >({
    mutationFn: ({ id, data }) => answerInquiry(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["myInquiries"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["inquiry", variables.id] });
      }
      toast({
        title: "답변이 등록되었습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "답변 등록에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
}
