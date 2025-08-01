import { API_PATHS } from "@/constants/api-path";
import type {
  BlockActionResponseDTO,
  BlockUserRequestDTO,
  BlockedUsersResponseDTO,
  UnblockUserRequestDTO,
} from "@/types/blockDTO";
import { apiCall } from "@/utils/apiUtils";

export const blockService = {
  // 사용자 차단
  blockUser: async (
    data: BlockUserRequestDTO
  ): Promise<BlockActionResponseDTO> => {
    return apiCall<BlockUserRequestDTO, BlockActionResponseDTO>({
      method: "POST",
      path: API_PATHS.BLOCK.BASE,
      withAuth: true,
      data,
    });
  },

  // 차단된 사용자 목록 조회
  getBlockedUsers: async (): Promise<BlockedUsersResponseDTO> => {
    return apiCall<void, BlockedUsersResponseDTO>({
      method: "GET",
      path: API_PATHS.BLOCK.GET,
      withAuth: true,
    });
  },

  // 사용자 차단 해제
  unblockUser: async (
    data: UnblockUserRequestDTO
  ): Promise<BlockActionResponseDTO> => {
    return apiCall<void, BlockActionResponseDTO>({
      method: "DELETE",
      path: API_PATHS.BLOCK.DELETE(data.targetUserEmail),
      withAuth: true,
    });
  },
};
