// 알림 타입 (서버 기준)
export type AlarmType = 'REVIEW' | 'COMMENT' | 'LIKE' | 'SYSTEM' | 'NOTICE';

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
export interface AlarmResponse {
  status: string;
  message: string;
  data: Alarm[];
}

// 알림 읽기 처리 요청
export interface ReadAlarmRequest {
  alarmId: number;
}

// 알림 읽기 처리 응답
export interface ReadAlarmResponse {
  status: string;
  message: string;
}

// 모든 알림 읽기 처리 응답
export interface ReadAllAlarmsResponse {
  status: string;
  message: string;
} 