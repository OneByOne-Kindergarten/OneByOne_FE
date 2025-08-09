import { API_PATHS } from "@/common/constants/api-path";
import { apiCall } from "@/common/utils/apiUtils";

import { CreateNoticeRequest, NoticeResponse } from "./DTO.d";

/**
 * 공지사항 조회
 * @returns 공지사항 목록
 */
export const getNotices = async (): Promise<NoticeResponse> => {
  try {
    return await apiCall<null, NoticeResponse>({
      method: "GET",
      path: API_PATHS.NOTICE.BASE,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("공지사항 조회 실패:", error);
    throw error;
  }
};

/**
 * 공지사항 생성
 * @param data 공지사항 정보
 * @returns
 */
export const createNotice = async (
  data: CreateNoticeRequest
): Promise<NoticeResponse> => {
  try {
    return await apiCall<CreateNoticeRequest, NoticeResponse>({
      method: "POST",
      path: API_PATHS.NOTICE.ADMIN,
      data,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("공지사항 생성 실패:", error);
    throw error;
  }
};

/**
 * 공지사항 상태 변경
 * @param noticeId
 * @returns
 */
export const toggleNoticeStatus = async (
  noticeId: number
): Promise<NoticeResponse> => {
  try {
    return await apiCall<null, NoticeResponse>({
      method: "PATCH",
      path: API_PATHS.NOTICE.STATUS(noticeId),
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("공지사항 상태 변경 실패:", error);
    throw error;
  }
};
