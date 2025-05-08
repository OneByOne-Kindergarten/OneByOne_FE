import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";
import Toggle from "@/components/@shared/buttons/base-toggle";
import InquiryList from "@/components/@shared/inquiry/InquiryList";
import { URL_PATHS } from "@/constants/url-path";
import { useMyInquiries } from "@/hooks/useInquiry";
import { INQUIRY_TAB_OPTIONS } from "@/constants/inquiry";

type InquiryTab = (typeof INQUIRY_TAB_OPTIONS)[number]["type"];

export default function InquiryMyPage() {
  const [activeTab, setActiveTab] = useState<InquiryTab>("ALL");
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(
    null
  );

  const { data: myInquiries } = useMyInquiries();

  const handleToggleExpand = (inquiryId: number) => {
    setExpandedInquiryId(expandedInquiryId === inquiryId ? null : inquiryId);
  };

  // 프론트엔드에서 status에 따라 문의 내역 필터링
  const filteredInquiries = myInquiries?.content
    ? activeTab === "ALL"
      ? myInquiries.content
      : myInquiries.content.filter((inquiry) => inquiry.status === activeTab)
    : [];

  return (
    <PageLayout
      title="원바원 | 문의 내역"
      description="나의 문의 내역 보기"
      headerTitle="문의 내역"
      currentPath={URL_PATHS.INQUIRY}
      wrapperBg="white"
      mainClassName="px-5 mt-14"
    >
      <div className="flex flex-col gap-4">
        <section className="flex justify-between items-center pt-4">
          <menu className="flex gap-2.5 items-center">
            {INQUIRY_TAB_OPTIONS.map(({ type, label }) => (
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
            ))}
          </menu>
          <Link to={URL_PATHS.INQUIRY_EDITOR}>
            <Button
              size="sm"
              font="sm_sb"
              variant="transparent"
              className="text-primary-normal02"
            >
              1:1 문의하기
            </Button>
          </Link>
        </section>

        <InquiryList
          inquiries={filteredInquiries}
          onToggleExpand={handleToggleExpand}
          expandedInquiryId={expandedInquiryId}
        />
      </div>
    </PageLayout>
  );
}
