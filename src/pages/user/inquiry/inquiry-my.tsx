import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useInfiniteMyInquiries } from "@/entities/inquiry/hooks";
import AutoFetchSentinel from "@/shared/components/AutoFetchSentinel";
import { INQUIRY_TAB_OPTIONS } from "@/shared/constants/inquiry";
import { URL_PATHS } from "@/shared/constants/url-path";
import Button from "@/shared/ui/buttons/base-button";
import Toggle from "@/shared/ui/buttons/base-toggle";
import PageLayout from "@/shared/ui/layout/page-layout";
import InquiryList from "@/widgets/user-dashboard/inquiry-list";

type InquiryTab = (typeof INQUIRY_TAB_OPTIONS)[number]["type"];

export default function InquiryMyPage() {
  const [activeTab, setActiveTab] = useState<InquiryTab>("ALL");
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(
    null
  );

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteMyInquiries({ pageSize: 10 });

  const myInquiries = data?.pages.flatMap((p) => p.content) ?? [];

  const handleToggleExpand = (inquiryId: number) => {
    setExpandedInquiryId(expandedInquiryId === inquiryId ? null : inquiryId);
  };

  // 프론트엔드에서 status에 따라 문의 내역 필터링
  const filteredInquiries =
    activeTab === "ALL"
      ? myInquiries
      : myInquiries.filter((inquiry) => inquiry.status === activeTab);

  return (
    <PageLayout
      title="원바원 | 문의 내역"
      description="나의 문의 내역 보기"
      headerTitle="문의 내역"
      currentPath={URL_PATHS.INQUIRY}
      wrapperBg="white"
      mainClassName="px-5 mt-14"
      isGlobalNavBar={false}
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
        <AutoFetchSentinel
          hasNext={Boolean(hasNextPage)}
          loading={Boolean(isFetchingNextPage)}
          fetchNext={() => fetchNextPage()}
        />
      </div>
    </PageLayout>
  );
}
