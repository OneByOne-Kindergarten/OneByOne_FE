import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import { toast } from "@/common/hooks/useToast";

import { createInquiry } from "../api";
import { CreateInquiryRequest, InquiryResponse } from "../DTO.d";

export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation<InquiryResponse, Error, CreateInquiryRequest>({
    mutationFn: createInquiry,
    onSuccess: (created) => {
      const createdItem = created?.content?.[0];

      if (createdItem) {
        // 내 문의 목록에 즉시 반영
        queryClient.setQueryData<InquiryResponse>(["myInquiries"], (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            content: [createdItem, ...prev.content],
            totalElements: (prev.totalElements ?? 0) + 1,
          };
        });

        // 전체 문의 목록에도 즉시 반영(필요 시)
        queryClient.setQueryData<InquiryResponse>(["inquiries"], (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            content: [createdItem, ...prev.content],
            totalElements: (prev.totalElements ?? 0) + 1,
          };
        });

        // 무한 쿼리 캐시에도 즉시 반영 (첫 페이지 앞에 prepend)
        const myInfinite = queryClient.getQueriesData<
          InfiniteData<InquiryResponse>
        >({
          queryKey: ["myInquiries", "infinite"],
        });
        myInfinite.forEach(([key, data]) => {
          if (!data) return;
          const updated: InfiniteData<InquiryResponse> = {
            pageParams: data.pageParams,
            pages: data.pages.map((page, idx) =>
              idx === 0
                ? {
                    ...page,
                    content: [createdItem, ...page.content],
                    totalElements: (page.totalElements ?? 0) + 1,
                  }
                : page
            ),
          };
          queryClient.setQueryData(key, updated);
        });

        const allInfinite = queryClient.getQueriesData<
          InfiniteData<InquiryResponse>
        >({
          queryKey: ["inquiries", "infinite"],
        });
        allInfinite.forEach(([key, data]) => {
          if (!data) return;
          const updated: InfiniteData<InquiryResponse> = {
            pageParams: data.pageParams,
            pages: data.pages.map((page, idx) =>
              idx === 0
                ? {
                    ...page,
                    content: [createdItem, ...page.content],
                    totalElements: (page.totalElements ?? 0) + 1,
                  }
                : page
            ),
          };
          queryClient.setQueryData(key, updated);
        });
      }

      // 백그라운드 검증을 위해 리패치 트리거
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["myInquiries"] });
      toast({
        title: "문의가 등록되었습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "문의 등록에 실패했습니다.",
        variant: "destructive",
      });
    },
  });
}
