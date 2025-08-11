import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import OneLineCommentField from "@/features/form/ui/fields/OneLineCommentField";
import ScoredCommentField from "@/features/form/ui/fields/ScoredCommentField";
import AlertCard from "@/shared/ui/alert/alert-card";

export interface LearningReviewFormValues {
  oneLineComment: string;
  workEnvironmentComment?: string;
  workEnvironmentScore: number;
  learningSupportComment?: string;
  learningSupportScore: number;
  instructionTeacherComment?: string;
  instructionTeacherScore: number;
}

interface LearningReviewFormProps {
  form: UseFormReturn<LearningReviewFormValues>;
  step: number;
}

export default function LearningReviewForm({
  form,
  step,
}: LearningReviewFormProps) {
  const steps = useMemo(
    () => [
      <>
        <OneLineCommentField control={form.control} />
      </>,
      <>
        <div className="flex flex-col gap-2">
          <ScoredCommentField
            control={form.control}
            commentName="workEnvironmentComment"
            scoreName="workEnvironmentScore"
            label="분위기"
          />
        </div>
        <div className="flex flex-col gap-2">
          <ScoredCommentField
            control={form.control}
            commentName="learningSupportComment"
            scoreName="learningSupportScore"
            label="학습 도움"
          />
        </div>
        <div className="flex flex-col gap-2">
          <ScoredCommentField
            control={form.control}
            commentName="instructionTeacherComment"
            scoreName="instructionTeacherScore"
            label="지도 교사"
          />
        </div>
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
