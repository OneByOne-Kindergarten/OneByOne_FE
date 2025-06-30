import clsx from "clsx";

import Badge from "@/components/@shared/badge";
import Empty from "@/components/@shared/layout/empty";
import { SVG_PATHS } from "@/constants/assets-path";
import {
  getInquiryStatusLabel,
  getInquiryTitleLabel,
  formatInquiryDate,
} from "@/utils/getInquiryLabel";
import type { Inquiry } from "@/types/inquiryDTO";

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
              <button
                className="flex items-center gap-2"
                onClick={() => onToggleExpand(inquiry.id)}
              >
                <img
                  src={SVG_PATHS.ARROW.right}
                  width={24}
                  height={24}
                  alt="더보기"
                  className={clsx("rotate-90", {
                    "rotate-90": expandedInquiryId === inquiry.id,
                  })}
                />
              </button>
            </div>
          </div>

          <div className="my-1 h-[1px] w-full bg-primary-light02" />

          {expandedInquiryId === inquiry.id && inquiry.answer && (
            <div className="flex flex-col gap-1.5 rounded-lg border-2 border-primary-light02 bg-primary-foreground p-5">
              <Badge variant="tertiary">원바원</Badge>
              <p className="flex flex-col gap-1 text-sm text-primary-dark01">
                <span>안녕하세요 선생님! 원바원입니다.</span>
                <span>{inquiry.answer}</span>
                <span className="mt-3">감사합니다.</span>
              </p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
