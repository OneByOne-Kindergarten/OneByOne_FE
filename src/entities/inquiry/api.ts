import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";

import type {
  AnswerInquiryRequest,
  CreateInquiryRequest,
  InquiryResponse,
} from "./DTO.d";

interface PaginationParams {
  page: number;
  size: number;
  sort: string;
}

/**
 * 모든 문의 목록 조회
 */
export const getAllInquiries = async (params: PaginationParams) => {
  const queryString = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
    sort: params.sort,
  }).toString();

  return apiCall<null, InquiryResponse>({
    method: "GET",
    path: `${API_PATHS.INQUIRY.ALL}?${queryString}`,
    withAuth: true,
  });
};

/**
 * 내 문의 목록 조회
 */
export const getMyInquiries = async (params: PaginationParams) => {
  const queryString = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
    sort: params.sort,
  }).toString();

  return apiCall<null, InquiryResponse>({
    method: "GET",
    path: `${API_PATHS.INQUIRY.MY}?${queryString}`,
    withAuth: true,
  });
};

/**
 * 상태별 문의 목록 조회 (관리자 전용)
 * @param status
 */
export const getInquiriesByStatus = async (
  status: string,
  params?: PaginationParams
) => {
  const queryString = params
    ? `?${new URLSearchParams({
        page: params.page.toString(),
        size: params.size.toString(),
        sort: params.sort,
      }).toString()}`
    : "";

  return apiCall<null, InquiryResponse>({
    method: "GET",
    path: `${API_PATHS.INQUIRY.STATUS(status)}${queryString}`,
    withAuth: true,
  });
};

/**
 * 문의 상세 조회
 * @param id
 */
export const getInquiryById = async (id: number) => {
  return apiCall<null, InquiryResponse>({
    method: "GET",
    path: API_PATHS.INQUIRY.DETAIL(id),
    withAuth: true,
  });
};

/**
 * 문의 생성
 * @param data
 */
export const createInquiry = async (data: CreateInquiryRequest) => {
  return apiCall<CreateInquiryRequest, InquiryResponse>({
    method: "POST",
    path: API_PATHS.INQUIRY.BASE,
    data,
    withAuth: true,
  });
};

/**
 * 문의 마감 (관리자 전용)
 * @param id
 */
export const closeInquiry = async (id: number) => {
  return apiCall<null, InquiryResponse>({
    method: "POST",
    path: API_PATHS.INQUIRY.CLOSE(id),
    withAuth: true,
  });
};

/**
 * 문의 답변 (관리자 전용)
 * @param id
 */
export const answerInquiry = async (id: number, data: AnswerInquiryRequest) => {
  return apiCall<AnswerInquiryRequest, InquiryResponse>({
    method: "POST",
    path: API_PATHS.INQUIRY.ANSWER(id),
    data,
    withAuth: true,
  });
};
