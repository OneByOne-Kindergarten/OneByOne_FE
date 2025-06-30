import { API_PATHS } from "@/constants/api-path";
import type { ReportRequest, ReportResponse } from "@/types/reportDTO";
import { apiCall } from "@/utils/apiUtils";

export const reportService = {
  // 신고 생성
  createReport: async (data: ReportRequest): Promise<ReportResponse> => {
    return await apiCall<ReportRequest, ReportResponse>({
      method: "POST",
      path: API_PATHS.REPORT.BASE,
      data,
      withAuth: true,
      withCredentials: true,
    });
  },

  // 내 신고 목록 조회
  getMyReports: async (): Promise<ReportResponse[]> => {
    return await apiCall<null, ReportResponse[]>({
      method: "GET",
      path: API_PATHS.REPORT.MY_REPORT,
      withAuth: true,
      withCredentials: true,
    });
  },
};
