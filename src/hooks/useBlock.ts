import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { blockService } from "@/services/blockService";
import type {
  BlockUserRequestDTO,
  UnblockUserRequestDTO,
} from "@/types/blockDTO";
import { parseErrorMessage } from "@/utils/parseErrorMessage";

import { useToast } from "./useToast";

export const useBlock = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const useGetBlockedUsers = () => {
    return useQuery({
      queryKey: ["blockedUsers"],
      queryFn: blockService.getBlockedUsers,
    });
  };

  const useBlockUser = () => {
    return useMutation({
      mutationFn: (data: BlockUserRequestDTO) => blockService.blockUser(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blockedUsers"] });
        queryClient.invalidateQueries({ queryKey: ["communityPosts"] });
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast({
          title: "차단 완료",
          description: "해당 사용자의 게시글, 댓글이 보이지 않게 됩니다.",
          variant: "default",
        });
      },
      onError: (err) => {
        toast({
          title: "차단 실패",
          description: parseErrorMessage(err) || "존재하지 않는 사용자입니다.",
          variant: "destructive",
        });
      },
    });
  };

  // 사용자 차단 해제
  const useUnblockUser = () => {
    return useMutation({
      mutationFn: (data: UnblockUserRequestDTO) =>
        blockService.unblockUser(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blockedUsers"] });
        queryClient.invalidateQueries({ queryKey: ["communityPosts"] });
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast({
          title: "차단 해제 완료",
          description: "해당 사용자의 게시글, 댓글을 다시 볼 수 있습니다.",
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: "차단 해제 실패",
          description:
            parseErrorMessage(error) || "존재하지 않는 사용자입니다.",
          variant: "destructive",
        });
      },
    });
  };

  return {
    useGetBlockedUsers,
    useBlockUser,
    useUnblockUser,
  };
};
