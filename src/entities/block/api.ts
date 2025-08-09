import { API_PATHS } from "@/common/constants/api-path";
import { apiCall } from "@/common/utils/apiUtils";

import type {
  BlockActionResponse,
  BlockUserRequest,
  BlockedUsersResponse,
  UnblockUserRequest,
} from "./DTO.d";

export const blockService = {
  // 사용자 차단
  blockUser: async (data: BlockUserRequest): Promise<BlockActionResponse> => {
    return apiCall<BlockUserRequest, BlockActionResponse>({
      method: "POST",
      path: API_PATHS.BLOCK.BASE,
      withAuth: true,
      data,
    });
  },

  // 차단된 사용자 목록 조회
  getBlockedUsers: async (): Promise<BlockedUsersResponse> => {
    return apiCall<void, BlockedUsersResponse>({
      method: "GET",
      path: API_PATHS.BLOCK.GET,
      withAuth: true,
    });
  },

  // 사용자 차단 해제
  unblockUser: async (
    data: UnblockUserRequest
  ): Promise<BlockActionResponse> => {
    return apiCall<void, BlockActionResponse>({
      method: "DELETE",
      path: API_PATHS.BLOCK.DELETE(data.targetUserEmail),
      withAuth: true,
    });
  },
};
