import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@/components/@shared/buttons/base-button";
import PageLayout from "@/components/@shared/layout/page-layout";
import { RadioGroup, RadioGroupItem } from "@/components/@shared/radio-group";
import { URL_PATHS } from "@/constants/url-path";
import { useToast } from "@/hooks/useToast";
import { reportService } from "@/services/reportService";
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

const TARGET_TYPE_LABELS: Record<ReportTargetType, string> = {
  POST: "게시글을",
  COMMENT: "댓글을",
  REVIEW: "리뷰를",
  USER: "사용자를",
};

const isValidReportTargetType = (
  type: string | null
): type is ReportTargetType => {
  return type !== null && Object.keys(TARGET_TYPE_LABELS).includes(type);
};

export default function ReportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const rawTargetId = searchParams.get("targetId");
  const rawTargetType = searchParams.get("type");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetId = rawTargetId ? Number(rawTargetId) : null;
  const targetType = isValidReportTargetType(rawTargetType)
    ? rawTargetType
    : null;

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (!targetId || !targetType || !selectedReason || Number.isNaN(targetId)) {
      toast({
        title: "신고 처리 중 오류가 발생했습니다",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const selectedReasonData = REPORT_REASONS.find(
        (reason) => reason.value === selectedReason
      );

      const reportData: ReportRequest = {
        targetId,
        targetType,
        reason:
          selectedReason === "OTHER"
            ? otherReason
            : selectedReasonData?.label || "",
      };

      await reportService.createReport(reportData);
      toast({
        title: "신고가 접수되었습니다",
      });
      navigate(-1);
    } catch (error) {
      toast({
        title: "신고 처리 중 오류가 발생했습니다",
        variant: "destructive",
      });
      console.error("신고 처리 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 유효하지 않은 파라미터로 접근 시 이전 페이지로 리다이렉트
  if (!targetId || !targetType || Number.isNaN(targetId)) {
    toast({
      title: "잘못된 접근입니다",
      variant: "destructive",
    });
    navigate(-1);
    return null;
  }

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
      <h2 className="text-center font-semibold">
        {targetType && `${TARGET_TYPE_LABELS[targetType]} 신고하시겠어요?`}
      </h2>
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
      {selectedReason === "OTHER" && (
        <textarea
          value={otherReason}
          onChange={(e) => setOtherReason(e.target.value)}
          className="h-32 w-full rounded-lg border p-3 text-sm"
          placeholder="신고 사유를 자세히 설명해주세요."
        />
      )}
      <div className="flex flex-1 gap-3">
        <Button
          font="sm_sb"
          onClick={handleBackButtonClick}
          className="w-full"
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button
          size="lg"
          font="sm_sb"
          variant="primary"
          className="w-full"
          disabled={
            isSubmitting ||
            !selectedReason ||
            (selectedReason === "OTHER" && !otherReason)
          }
          onClick={handleSubmit}
        >
          {isSubmitting ? "처리중..." : "확인"}
        </Button>
      </div>
    </PageLayout>
  );
}
