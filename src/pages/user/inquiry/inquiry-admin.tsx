import clsx from "clsx";
import { useState } from "react";

import AutoFetchSentinel from "@/common/components/AutoFetchSentinel";
import { INQUIRY_TAB_OPTIONS } from "@/common/constants/inquiry";
import { URL_PATHS } from "@/common/constants/url-path";
import Toggle from "@/common/ui/buttons/base-toggle";
import PageLayout from "@/common/ui/layout/page-layout";
import { useInfiniteAllInquiries } from "@/entities/inquiry/hooks";
import InquiryList from "@/features/inquiry/InquiryList";

type InquiryTab = (typeof INQUIRY_TAB_OPTIONS)[number]["type"];

export default function InquiryAdminPage() {
  const [activeTab, setActiveTab] = useState<InquiryTab>("ALL");
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(
    null
  );

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteAllInquiries({ pageSize: 10 });

  const handleToggleExpand = (inquiryId: number) => {
    setExpandedInquiryId(expandedInquiryId === inquiryId ? null : inquiryId);
  };

  const allPages = data?.pages as
    | Array<import("@/entities/inquiry/DTO.d").InquiryResponse>
    | undefined;
  const allInquiries = (allPages ?? []).flatMap((p) => p.content);
  const inquiries =
    activeTab === "ALL"
      ? allInquiries
      : allInquiries.filter((inq) => inq.status === activeTab);

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
        <section className="flex items-center justify-between pt-4">
          <menu className="flex items-center gap-2.5">
            {INQUIRY_TAB_OPTIONS.map(({ type, label }) => (
              <Toggle key={type} size="sm" onClick={() => setActiveTab(type)}>
                <span
                  className={clsx("text-sm font-semibold", {
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
          inquiries={inquiries}
          onToggleExpand={handleToggleExpand}
          expandedInquiryId={expandedInquiryId}
        />

        <AutoFetchSentinel
          hasNext={Boolean(hasNextPage)}
          loading={Boolean(isFetchingNextPage)}
          fetchNext={() => fetchNextPage()}
        />
      </div>
    </PageLayout>
  );
}
