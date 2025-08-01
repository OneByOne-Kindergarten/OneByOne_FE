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
          variant: "default",
        });
      },
      onError: (err) => {
        toast({
          title: "차단 실패",
          description: parseErrorMessage(err),
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
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: "차단 해제 실패",
          description: parseErrorMessage(error),
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
