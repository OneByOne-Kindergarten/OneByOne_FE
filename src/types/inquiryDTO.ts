export enum InquiryStatus {
  PENDING = "PENDING",
  CLOSED = "CLOSED",
  ANSWERED = "ANSWERED",
}

export interface CreateInquiryRequest {
  title: "GENERAL" | "REPORT" | "SERVICE" | "ETC";
  content: string;
}

export interface AnswerInquiryRequest {
  answer: string;
}

export interface Inquiry {
  id: number;
  title: string;
  content: string;
  status: InquiryStatus;
  answer: string | null;
  createdAt: string;
  userId: number;
  userNickname: string;
  userRole: string;
}

export interface InquiryResponse {
  content: Inquiry[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
