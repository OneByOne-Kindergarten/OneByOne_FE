import { useState } from "react";
import clsx from "clsx";

import PageLayout from "@/components/@shared/layout/page-layout";
import Toggle from "@/components/@shared/buttons/base-toggle";
import InquiryList from "@/components/@shared/inquiry/InquiryList";
import { URL_PATHS } from "@/constants/url-path";
import { useAllInquiries, useInquiriesByStatus } from "@/hooks/useInquiry";
import { InquiryStatus } from "@/types/inquiryDTO";
import { INQUIRY_TAB_OPTIONS } from "@/constants/inquiry";

type InquiryTab = (typeof INQUIRY_TAB_OPTIONS)[number]["type"];

export default function InquiryAdminPage() {
  const [activeTab, setActiveTab] = useState<InquiryTab>("ALL");
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(
    null
  );

  const { data: allInquiries } = useAllInquiries();
  const { data: statusInquiries } = useInquiriesByStatus(
    activeTab !== "ALL" ? activeTab : InquiryStatus.PENDING
  );

  const handleToggleExpand = (inquiryId: number) => {
    setExpandedInquiryId(expandedInquiryId === inquiryId ? null : inquiryId);
  };

  const inquiries = activeTab === "ALL" ? allInquiries : statusInquiries;

  return (
    <PageLayout
      title="원바원 | 문의 내역 관리"
      description="문의 내역 관리"
      headerTitle="문의 내역 관리"
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
        </section>

        <InquiryList
          inquiries={inquiries?.content || []}
          onToggleExpand={handleToggleExpand}
          expandedInquiryId={expandedInquiryId}
        />
      </div>
    </PageLayout>
  );
}
