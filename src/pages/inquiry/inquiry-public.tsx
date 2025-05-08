import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import PageLayout from "@/components/@shared/layout/page-layout";
import Badge from "@/components/@shared/badge";
import Toggle from "@/components/@shared/buttons/base-toggle";
import Button from "@/components/@shared/buttons/base-button";
import Empty from "@/components/@shared/layout/empty";
import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS } from "@/constants/assets-path";
import { useAllInquiries, useInquiriesByStatus } from "@/hooks/useInquiry";
import { InquiryStatus } from "@/types/inquiryDTO";
import {
  getInquiryStatusLabel,
  formatInquiryDate,
} from "@/utils/getInquiryLabel";

type InquiryTab = "ALL" | InquiryStatus.ANSWERED | InquiryStatus.PENDING;

const TAB_OPTIONS: { type: InquiryTab; label: string }[] = [
  { type: "ALL", label: "전체" },
  { type: InquiryStatus.ANSWERED, label: "답변완료" },
  { type: InquiryStatus.PENDING, label: "미답변" },
];

export default function InquiryPublicPage() {
  const [activeTab, setActiveTab] = useState<InquiryTab>("ALL");
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(
    null
  );

  const { data: allInquiries } = useAllInquiries();
  const { data: statusInquiries } = useInquiriesByStatus(
    activeTab !== "ALL" ? activeTab : InquiryStatus.PENDING
  );

  const inquiries = activeTab === "ALL" ? allInquiries : statusInquiries;

  const handleToggleExpand = (inquiryId: number) => {
    setExpandedInquiryId(expandedInquiryId === inquiryId ? null : inquiryId);
  };

  return (
    <PageLayout
      title="원바원 | 공개 문의"
      description="공개 문의 내역 보기"
      headerTitle="공개 문의보기"
      currentPath={URL_PATHS.INQUIRY}
      wrapperBg="white"
      mainClassName="px-5 mt-14"
    >
      <div className="flex flex-col gap-4">
        <section className="flex justify-between items-center pt-4">
          <menu className="flex gap-2.5 items-center">
            {TAB_OPTIONS.map(({ type, label }) => {
              return (
                <Toggle key={type} size="sm" onClick={() => setActiveTab(type)}>
                  <span
                    className={clsx("font-semibold text-sm", {
                      "text-primary-dark01": activeTab === type,
                      "text-primary-normal02": activeTab !== type,
                    })}
                  >
                    {label}
                  </span>
                </Toggle>
              );
            })}
          </menu>
          <Link to={URL_PATHS.INQUIRY_MY}>
            <Button
              size="sm"
              font="sm_sb"
              variant="transparent"
              className="text-primary-normal02"
            >
              내 문의보기
            </Button>
          </Link>
        </section>

        <section className="flex flex-col gap-4">
          {inquiries?.data ? (
            inquiries.data.map((inquiry) => (
              <div key={inquiry.id} className="flex flex-col gap-2.5">
                <Badge className="text-sm">{inquiry.title}</Badge>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-primary-dark01">
                    {inquiry.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <ul className="flex gap-2 items-center text-xs">
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
                      className="flex gap-2 items-center"
                      onClick={() => handleToggleExpand(inquiry.id)}
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

                <div className="w-full h-[1px] my-1 bg-primary-light02" />

                {expandedInquiryId === inquiry.id && inquiry.answer && (
                  <div className="flex flex-col gap-1.5 p-5 bg-primary-foreground border-2 border-primary-light02 rounded-md">
                    <Badge variant="tertiary">원바원</Badge>
                    <p className="text-sm text-primary-dark01 flex flex-col gap-1">
                      <span>안녕하세요 선생님! 원바원입니다.</span>
                      <span>{inquiry.answer}</span>
                      <span className="mt-3">감사합니다.</span>
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-primary-normal02"></div>
              </div>
            ))
          ) : (
            <Empty type="page">
              <p>아직 공개된 문의가 없습니다.</p>
            </Empty>
          )}
        </section>
      </div>
    </PageLayout>
  );
}
