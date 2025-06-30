import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import type { AlarmResponse } from "@/types/alarmDTO";

/**
 * 알림 목록 조회
 * @returns 알림 목록
 */
export const getAlarms = async (): Promise<AlarmResponse> => {
  try {
    return await apiCall<null, AlarmResponse>({
      method: "GET",
      path: API_PATHS.ALARM.BASE,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("알림 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 읽지 않은 알림 개수 조회
 * @returns 읽지 않은 알림 개수
 */
export const getUnreadAlarmCount = async (): Promise<{ data: number }> => {
  try {
    return await apiCall<null, { data: number }>({
      method: "GET",
      path: API_PATHS.ALARM.UNREAD_COUNT,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("읽지 않은 알림 개수 조회 실패:", error);
    throw error;
  }
};

/**
 * 알림 읽음 처리
 * @param alarmId 알림 ID
 * @returns 처리 결과
 */
export const readAlarm = async (alarmId: number): Promise<{ message: string }> => {
  try {
    return await apiCall<null, { message: string }>({
      method: "PATCH",
      path: API_PATHS.ALARM.READ(alarmId),
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("알림 읽기 처리 실패:", error);
    throw error;
  }
};

/**
 * 모든 알림 읽음 처리
 * @returns 처리 결과
 */
export const readAllAlarms = async (): Promise<{ message: string }> => {
  try {
    return await apiCall<null, { message: string }>({
      method: "PATCH",
      path: API_PATHS.ALARM.READ_ALL,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("모든 알림 읽기 처리 실패:", error);
    throw error;
  }
}; 