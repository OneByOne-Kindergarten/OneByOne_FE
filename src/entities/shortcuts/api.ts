import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";

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
