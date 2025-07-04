import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { STATIC_CACHE_CONFIG } from "@/constants/query-config";
import { toast } from "@/hooks/useToast";
import {
  createNotice,
  getNotices,
  toggleNoticeStatus,
} from "@/services/noticeService";
import type { CreateNoticeRequest } from "@/types/noticeDTO";

export const useNotices = () => {
  return useSuspenseQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
    ...STATIC_CACHE_CONFIG,
  });
};

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoticeRequest) => createNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({
        title: "공지사항 작성 완료",
        description: "공지사항이 성공적으로 작성되었습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "공지사항 작성 실패",
        description: "공지사항 작성에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });
};

export const useToggleNoticeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeId: number) => toggleNoticeStatus(noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({
        title: "공지사항 상태 변경 완료",
        description: "공지사항 상태가 성공적으로 변경되었습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "공지사항 상태 변경 실패",
        description: "공지사항 상태 변경에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });
};
