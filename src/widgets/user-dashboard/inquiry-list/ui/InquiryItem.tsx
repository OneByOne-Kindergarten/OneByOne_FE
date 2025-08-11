import type { Inquiry } from "@/entities/inquiry/DTO.d";
import Badge from "@/shared/ui/badge";
import {
  formatInquiryDate,
  getInquiryStatusLabel,
  getInquiryTitleLabel,
} from "@/widgets/user-dashboard/inquiry-list/lib/getInquiryLabel";

interface InquiryItemProps {
  inquiry: Inquiry;
}

export default function InquiryItem({ inquiry }: InquiryItemProps) {
  return (
    <>
      <Badge className="text-sm">{getInquiryTitleLabel(inquiry.title)}</Badge>
      <div className="flex max-w-full flex-col gap-1">
        <p className="whitespace-pre-wrap break-words text-sm text-primary-dark01">
          {inquiry.content}
        </p>
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-2 text-xs">
            <li className="font-bold text-tertiary-3">
              {getInquiryStatusLabel(inquiry.status)}
            </li>
            <li aria-hidden="true" className="text-xxs text-primary-normal03">
              |
            </li>
            <li className="text-primary-normal03">
              {formatInquiryDate(inquiry.createdAt)}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
