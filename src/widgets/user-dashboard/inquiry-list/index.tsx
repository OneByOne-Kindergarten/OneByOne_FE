import type { Inquiry } from "@/entities/inquiry/DTO.d";
import { InquiryStatus } from "@/entities/inquiry/DTO.d";
import Empty from "@/shared/ui/layout/empty";
import InquiryAnswer from "@/widgets/user-dashboard/inquiry-list/ui/InquiryAnswer";
import InquiryExpandButton from "@/widgets/user-dashboard/inquiry-list/ui/InquiryExpandButton";
import InquiryItem from "@/widgets/user-dashboard/inquiry-list/ui/InquiryItem";

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
    <section className="mb-12 flex flex-col gap-4">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="flex max-w-full flex-col gap-2.5">
          <InquiryItem inquiry={inquiry} />
          {inquiry.status === InquiryStatus.ANSWERED && (
            <InquiryExpandButton
              expanded={expandedInquiryId === inquiry.id}
              onClick={() => onToggleExpand(inquiry.id)}
            />
          )}

          <div className="my-1 h-[1px] w-full bg-primary-light02" />

          {inquiry.answer && (
            <InquiryAnswer
              answer={inquiry.answer}
              expanded={expandedInquiryId === inquiry.id}
            />
          )}
        </div>
      ))}
    </section>
  );
}
