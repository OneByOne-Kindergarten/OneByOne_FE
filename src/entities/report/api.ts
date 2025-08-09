import { API_PATHS } from "@/common/constants/api-path";
import { apiCall } from "@/common/utils/apiUtils";

import type { ReportRequest, ReportResponse } from "./DTO.d";

export const reportService = {
  // 신고 생성
  createReport: async (data: ReportRequest): Promise<ReportResponse> => {
    return await apiCall<ReportRequest, ReportResponse>({
      method: "POST",
      path: API_PATHS.REPORT.BASE,
      withAuth: true,
      withCredentials: true,
      data,
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
