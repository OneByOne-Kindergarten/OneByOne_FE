export type ReportStatus = "PENDING" | "PROCESSED" | "REJECTED" | "YET";

export interface ReportRequest {
  targetId: number;
  targetType: ReportTargetType;
  reason: string;
}

export interface Report {
  id: number;
  reporterNickname: string;
  targetId: number;
  targetType: ReportTargetType;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

export interface ReportResponse {
  success: boolean;
  data: Report;
  message: string;
}
