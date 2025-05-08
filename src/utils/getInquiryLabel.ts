import { InquiryStatus } from "@/types/inquiryDTO";
import { INQUIRY_STATUS_LABEL, INQUIRY_TITLE_LABEL } from "@/constants/inquiry";

export function getInquiryStatusLabel(status: InquiryStatus): string {
  return INQUIRY_STATUS_LABEL[status];
}

export function getInquiryTitleLabel(title: string): string {
  return INQUIRY_TITLE_LABEL[title] || title;
}

export function formatInquiryDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}
