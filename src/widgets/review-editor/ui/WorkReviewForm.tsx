import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import OneLineCommentField from "@/features/form/ui/fields/OneLineCommentField";
import ScoredCommentField from "@/features/form/ui/fields/ScoredCommentField";
import ToggleChoicesField from "@/features/form/ui/fields/ToggleChoicesField";
import AlertCard from "@/shared/ui/alert/alert-card";

export interface WorkReviewFormValues {
  // 1 step: 근무 기간, 근무 유형, 한 줄 평가
  workYear: number;
  workType?: string;
  oneLineComment: string;

  // 2 step: 복지/급여, 워라벨, 관리자, 고객
  benefitAndSalaryComment?: string;
  benefitAndSalaryScore: number;
  workLifeBalanceComment?: string;
  workLifeBalanceScore: number;
  workEnvironmentComment?: string;
  workEnvironmentScore: number;
  managerComment?: string;
  managerScore: number;
  customerComment?: string;
  customerScore: number;
}

interface WorkReviewFormProps {
  form: UseFormReturn<WorkReviewFormValues>;
  step: number;
  schoolId: string;
}

export default function WorkReviewForm({ form, step }: WorkReviewFormProps) {
  const steps = useMemo(
    () => [
      <>
        <OneLineCommentField control={form.control} />
        <ToggleChoicesField
          control={form.control}
          name="workYear"
          label="근무 기간을 체크해주세요"
          options={[
            { label: "2년 이내 근무", value: 1 },
            { label: "2-5년 전 근무", value: 2 },
            { label: "근무한지 오래됨", value: 3 },
          ]}
        />
        <ToggleChoicesField
          control={form.control}
          name="workType"
          label="근무 유형을 입력해주세요"
          options={[
            { label: "담임", value: "담임" },
            { label: "부담임", value: "부담임" },
            { label: "비공개", value: "비공개" },
          ]}
        />
      </>,
      <>
        <ScoredCommentField
          control={form.control}
          commentName="benefitAndSalaryComment"
          scoreName="benefitAndSalaryScore"
          label="복지/급여"
        />
        <ScoredCommentField
          control={form.control}
          commentName="workLifeBalanceComment"
          scoreName="workLifeBalanceScore"
          label="워라벨"
        />
        <ScoredCommentField
          control={form.control}
          commentName="workEnvironmentComment"
          scoreName="workEnvironmentScore"
          label="분위기"
        />
        <ScoredCommentField
          control={form.control}
          commentName="managerComment"
          scoreName="managerScore"
          label="관리자"
        />
        <ScoredCommentField
          control={form.control}
          commentName="customerComment"
          scoreName="customerScore"
          label="고객"
        />
        <AlertCard>
          <strong>익명성 보장을 위한 안내</strong> <br /> 확실한 익명 보장을
          위해 리뷰가 등록되면 리뷰에 익명 닉네임, 프로필 등 작성자에 대한
          정보가 표기되지 않습니다.
        </AlertCard>
      </>,
    ],
    [form]
  );

  const index = Math.max(0, Math.min(steps.length - 1, step - 1));
  return steps[index];
}
