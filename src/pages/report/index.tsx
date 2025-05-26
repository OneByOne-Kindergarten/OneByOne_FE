import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";
import { RadioGroup, RadioGroupItem } from "@/components/@shared/radio-group";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";

import { URL_PATHS } from "@/constants/url-path";
import type { ReportRequest, ReportTargetType } from "@/types/reportDTO";

const REPORT_REASONS = [
  {
    value: "INAPPROPRIATE_LANGUAGE",
    label: "부적절한 언어 또는 폭언이 포함되어 있어요.",
  },
  { value: "COMMERCIAL", label: "상업적인 광고 또는 홍보성 정보예요." },
  { value: "FALSE_INFORMATION", label: "허위 정보 또는 명예훼손이 의심돼요." },
  {
    value: "PERSONAL_INFORMATION",
    label: "민감한 개인정보가 포함되어 있어요.",
  },
  {
    value: "INAPPROPRIATE_CONTENT",
    label: "불건전한 내용(음란성)이 포함되어 있어요.",
  },
  { value: "OTHER", label: "기타" },
];

export default function ReportPage() {
  const [searchParams] = useSearchParams();
  const [selectedReason, setSelectedReason] = useState<string>("");
  const { toast } = useToast();

  const targetId = searchParams.get("targetId");
  const targetType = searchParams.get("targetType") as ReportTargetType;

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const handleSubmit = async () => {
    if (!targetId || !targetType || !selectedReason) {
      toast({
        title: "신고 처리 중 오류가 발생했습니다",
        variant: "destructive",
      });
      return;
    }

    try {
      const reportData: ReportRequest = {
        targetId: parseInt(targetId),
        targetType,
        reason: selectedReason,
      };

      // TODO: API 호출
      console.log("신고 데이터:", reportData);

      toast({
        title: "신고가 접수되었습니다",
      });
      window.history.back();
    } catch (error) {
      toast({
        title: "신고 처리 중 오류가 발생했습니다",
        variant: "destructive",
      });
      console.error("신고 처리 실패:", error);
    }
  };

  return (
    <PageLayout
      title="신고하기"
      description="신고하기"
      headerTitle="신고하기"
      wrapperBg="white"
      currentPath={URL_PATHS.REPORT}
      isGlobalNavBar={false}
      onBackButtonClick={handleBackButtonClick}
      mainClassName="flex flex-col gap-8 py-8 px-5 mt-14 mb-24"
    >
      <h2 className="text-center font-semibold">게시글을 신고하시겠어요?</h2>
      <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
        {REPORT_REASONS.map((reason) => (
          <li key={reason.value} className="flex items-center gap-3">
            <RadioGroupItem value={reason.value} id={reason.value} />
            <label
              htmlFor={reason.value}
              className="flex-1 cursor-pointer text-sm text-primary-dark01"
            >
              {reason.label}
            </label>
          </li>
        ))}
      </RadioGroup>
      <div className="flex flex-1 gap-3">
        <Button font="sm_sb" onClick={handleBackButtonClick} className="w-full">
          취소
        </Button>
        <Button
          size="lg"
          font="sm_sb"
          variant="primary"
          className="w-full"
          disabled={!selectedReason}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </PageLayout>
  );
}
