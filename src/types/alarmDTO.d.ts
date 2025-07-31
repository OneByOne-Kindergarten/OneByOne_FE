// 알림 타입 (서버 기준)
export type AlarmType = "REVIEW" | "COMMENT" | "LIKE" | "SYSTEM" | "NOTICE";

export interface BaseResponse {
  status: string;
  message: string;
}

// 알림 아이템
export interface Alarm {
  id: number;
  userId: number;
  type: AlarmType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  targetId?: number;
  groupKey?: string;
  groupCount?: number;
}

// 알림 목록 응답
export interface AlarmResponse extends BaseResponse {
  data: Alarm[];
}

// 알림 읽기 처리
export interface ReadAlarmRequest {
  alarmId: number;
}

export type ReadAlarmResponse = BaseResponse;

export type ReadAllAlarmsResponse = BaseResponse;

// 알림 설정
export interface AlarmSetting {
  allNotificationsEnabled: boolean;
  communityNotificationsEnabled: boolean;
  eventNotificationsEnabled: boolean;
}

export interface AlarmSettingResponse extends BaseResponse {
  data: AlarmSetting;
}
