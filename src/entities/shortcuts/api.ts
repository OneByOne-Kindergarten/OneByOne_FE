import { API_PATHS } from "@/common/constants/api-path";
import { apiCall } from "@/common/utils/apiUtils";

import {
  Shortcut,
  UpdateShortcutsRequest,
  UpdateShortcutsResponse,
} from "./type";

/**
 * 사용자 단축키 업데이트
 * @requestBody shortcuts 배열
 * @returns
 */
export const updateUserShortcuts = async (
  shortcuts: Shortcut[]
): Promise<UpdateShortcutsResponse> => {
  return apiCall<UpdateShortcutsRequest, UpdateShortcutsResponse>({
    method: "PUT",
    path: API_PATHS.USER.SHORTCUTS,
    data: { shortcuts },
    withAuth: true,
    withCredentials: true,
  });
};
