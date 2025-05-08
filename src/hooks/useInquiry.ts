import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInquiry,
  closeInquiry,
  answerInquiry,
  getMyInquiries,
  getInquiriesByStatus,
  getInquiryById,
  getAllInquiries,
} from "@/services/inquiryService";
import type {
  CreateInquiryRequest,
  AnswerInquiryRequest,
  InquiryResponse,
  InquiryStatus,
} from "@/types/inquiryDTO";
import { useToast } from "./useToast";

export function useAllInquiries() {
  return useQuery<InquiryResponse>({
    queryKey: ["inquiries"],
    queryFn: () =>
      getAllInquiries({
        page: 0,
        size: 1,
        sort: "",
      }),
  });
}

export function useMyInquiries() {
  return useQuery<InquiryResponse>({
    queryKey: ["myInquiries"],
    queryFn: () =>
      getMyInquiries({
        page: 0,
        size: 1,
        sort: "",
      }),
  });
}

export function useInquiriesByStatus(status: InquiryStatus) {
  return useQuery<InquiryResponse>({
    queryKey: ["inquiries", "status", status],
    queryFn: () => getInquiriesByStatus(status),
  });
}

export function useInquiryById(id: number) {
  return useQuery<InquiryResponse>({
    queryKey: ["inquiry", id],
    queryFn: () => getInquiryById(id),
    enabled: !!id,
  });
}

export function useCreateInquiry() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<InquiryResponse, Error, CreateInquiryRequest>({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
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

export function useCloseInquiry() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<InquiryResponse, Error, number>({
    mutationFn: closeInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
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

export function useAnswerInquiry() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    InquiryResponse,
    Error,
    { id: number; data: AnswerInquiryRequest }
  >({
    mutationFn: ({ id, data }) => answerInquiry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
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
