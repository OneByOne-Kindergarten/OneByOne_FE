import { InquiryStatus } from "@/types/inquiryDTO";
import { INQUIRY_STATUS_LABEL } from "@/constants/inquiry";

export function getInquiryStatusLabel(status: InquiryStatus): string {
  return INQUIRY_STATUS_LABEL[status];
}

export function formatInquiryDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}
