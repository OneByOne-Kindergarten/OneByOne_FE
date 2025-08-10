import clsx from "clsx";

import type { Inquiry } from "@/entities/inquiry/DTO.d";
import { InquiryStatus } from "@/entities/inquiry/DTO.d";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import Badge from "@/shared/ui/badge";
import Empty from "@/shared/ui/layout/empty";
import {
  formatInquiryDate,
  getInquiryStatusLabel,
  getInquiryTitleLabel,
} from "@/shared/utils/getInquiryLabel";

interface InquiryListProps {
  inquiries: Inquiry[];
  onToggleExpand: (inquiryId: number) => void;
  expandedInquiryId: number | null;
}

export default function InquiryList({
  inquiries,
  onToggleExpand,
  expandedInquiryId,
}: InquiryListProps) {
  if (!inquiries?.length) {
    return <Empty type="page" title="문의 내역이 없습니다." />;
  }

  return (
    <section className="flex flex-col gap-4">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="flex max-w-full flex-col gap-2.5">
          <Badge className="text-sm">
            {getInquiryTitleLabel(inquiry.title)}
          </Badge>
          <div className="flex max-w-full flex-col gap-1">
            <p className="whitespace-pre-wrap break-words text-sm text-primary-dark01">
              {inquiry.content}
            </p>
            <div className="flex items-center justify-between">
              <ul className="flex items-center gap-2 text-xs">
                <li className="font-bold text-tertiary-3">
                  {getInquiryStatusLabel(inquiry.status)}
                </li>
                <li
                  aria-hidden="true"
                  className="text-xxs text-primary-normal03"
                >
                  |
                </li>
                <li className="text-primary-normal03">
                  {formatInquiryDate(inquiry.createdAt)}
                </li>
              </ul>
              {inquiry.status === InquiryStatus.ANSWERED && (
                <button
                  className="flex items-center gap-2"
                  onClick={() => onToggleExpand(inquiry.id)}
                  aria-label="문의 펼치기"
                >
                  <img
                    src={SVG_PATHS.ARROW.right}
                    width={24}
                    height={24}
                    alt="더보기"
                    className={clsx(
                      "transform-gpu transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none",
                      expandedInquiryId === inquiry.id
                        ? "rotate-90"
                        : "rotate-0"
                    )}
                  />
                </button>
              )}
            </div>
          </div>

          <div className="my-1 h-[1px] w-full bg-primary-light02" />

          {inquiry.answer && (
            <div
              className={clsx(
                "grid transition-all duration-200 ease-out",
                expandedInquiryId === inquiry.id
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1.5 rounded-lg border-2 border-primary-light02 bg-primary-foreground p-5">
                  <Badge variant="tertiary">원바원</Badge>
                  <p className="flex flex-col gap-1 text-sm text-primary-dark01">
                    <span>안녕하세요 선생님! 원바원입니다.</span>
                    <span>{inquiry.answer}</span>
                    <span className="mt-3">감사합니다.</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
