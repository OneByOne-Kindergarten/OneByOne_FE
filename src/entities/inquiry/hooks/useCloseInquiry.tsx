import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/shared/hooks/useToast";

import { closeInquiry } from "../api";
import { InquiryResponse } from "../DTO.d";

export function useCloseInquiry() {
  const queryClient = useQueryClient();

  return useMutation<InquiryResponse, Error, number>({
    mutationFn: closeInquiry,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["myInquiries"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["inquiry", id] });
      }
      toast({
        title: "문의가 마감되었습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "문의 마감에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
}
