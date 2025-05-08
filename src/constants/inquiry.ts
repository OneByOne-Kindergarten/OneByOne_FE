import { InquiryStatus } from "@/types/inquiryDTO";

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  [InquiryStatus.PENDING]: "미답변",
  [InquiryStatus.CLOSED]: "마감",
  [InquiryStatus.ANSWERED]: "답변완료",
};

export const INQUIRY_TITLE_LABEL: Record<string, string> = {
  GENERAL: "이용문의",
  REPORT: "오류문의",
  SERVICE: "서비스 제안",
  ETC: "기타",
};

export const INQUIRY_TAB_OPTIONS = [
  { type: "ALL" as const, label: "전체" },
  {
    type: InquiryStatus.ANSWERED,
    label: INQUIRY_STATUS_LABEL[InquiryStatus.ANSWERED],
  },
  {
    type: InquiryStatus.PENDING,
    label: INQUIRY_STATUS_LABEL[InquiryStatus.PENDING],
  },
] as const;

export type InquiryTab = (typeof INQUIRY_TAB_OPTIONS)[number]["type"];
