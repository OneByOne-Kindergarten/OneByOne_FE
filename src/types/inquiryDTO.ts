export enum InquiryStatus {
  PENDING = "PENDING",
  CLOSED = "CLOSED",
  ANSWERED = "ANSWERED",
}

export interface CreateInquiryRequest {
  title: string;
  content: string;
}

export interface AnswerInquiryRequest {
  answer: string;
}

export interface Inquiry {
  id: number;
  title: string;
  content: string;
  answer: string;
  status: InquiryStatus;
  createdAt: string;
  userId: number;
  userNickname: string;
  userRole: string;
}

export interface InquiryResponse {
  success: boolean;
  data: Inquiry[];
  message: string;
}
