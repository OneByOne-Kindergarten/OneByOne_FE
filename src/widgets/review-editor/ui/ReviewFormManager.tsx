import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  useCreateInternshipReview,
  useCreateWorkReview,
} from "@/entities/review/hooks";
import StepButtons from "@/features/form/ui/StepButtons";
import { REVIEW_TYPES } from "@/shared/constants/review";
import { Form } from "@/shared/ui/form";
import ProgressBar from "@/shared/ui/progress-bar";
import {
  learningReviewFormSchema,
  workReviewFormSchema,
} from "@/shared/utils/validationSchemas";
import {
  LEARNING_REVIEW_DEFAULT_VALUES,
  WORK_REVIEW_DEFAULT_VALUES,
} from "@/widgets/review-editor/lib/defaultValues";
import {
  LEARNING_VALIDATION_FIELDS_BY_STEP,
  WORK_VALIDATION_FIELDS_BY_STEP,
} from "@/widgets/review-editor/lib/validationFields";
import LearningReviewForm, {
  LearningReviewFormValues,
} from "@/widgets/review-editor/ui/LearningReviewForm";
import WorkReviewForm, {
  WorkReviewFormValues,
} from "@/widgets/review-editor/ui/WorkReviewForm";

interface ReviewFormManagerProps {
  schoolId: string;
  type: string;
  onSubmitSuccess?: () => void;
}

export default function ReviewFormManager({
  schoolId,
  type,
  onSubmitSuccess,
}: ReviewFormManagerProps) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0); // 0-based index
  const createWorkReviewMutation = useCreateWorkReview();
  const createInternshipReviewMutation = useCreateInternshipReview();
  const workReviewForm = useForm<WorkReviewFormValues>({
    resolver: zodResolver(workReviewFormSchema),
    defaultValues: WORK_REVIEW_DEFAULT_VALUES,
  });
  const learningReviewForm = useForm<LearningReviewFormValues>({
    resolver: zodResolver(learningReviewFormSchema),
    defaultValues: LEARNING_REVIEW_DEFAULT_VALUES,
  });

  // 타입 유효성 검증: type이 유효하지 않은 경우 리다이렉트
  const isTypeValid = useMemo(
    () => Object.values(REVIEW_TYPES).includes(type as "work" | "learning"),
    [type]
  );

  useEffect(() => {
    if (!isTypeValid) {
      navigate(`/kindergarten/${schoolId}/review?type=work`);
    }
  }, [isTypeValid, navigate, schoolId]);

  // 리뷰 타입별 전체 스텝 수
  const totalSteps = useMemo(() => {
    return type === REVIEW_TYPES.WORK ? 2 : 2;
  }, [type]);

  // 전송 중 버튼 비활성화 상태
  const isSubmitting =
    type === REVIEW_TYPES.WORK
      ? createWorkReviewMutation.isPending
      : createInternshipReviewMutation.isPending;

  // 현재 스텝이 마지막 스텝인지 여부
  const isLastStep = stepIndex === totalSteps - 1;

  // 현재 스텝에 필요한 필드만 부분 검증
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    if (type === REVIEW_TYPES.WORK) {
      const fields = WORK_VALIDATION_FIELDS_BY_STEP[
        stepIndex
      ] as (keyof WorkReviewFormValues)[];
      return workReviewForm.trigger(fields);
    }
    const fields = LEARNING_VALIDATION_FIELDS_BY_STEP[
      stepIndex
    ] as (keyof LearningReviewFormValues)[];
    return learningReviewForm.trigger(fields);
  }, [type, stepIndex, workReviewForm, learningReviewForm]);

  // 폼 제출: 리뷰 타입별 payload 생성 후 제출 및 후속 이동
  const handleSubmit = async () => {
    try {
      if (type === REVIEW_TYPES.WORK) {
        const values = workReviewForm.getValues();

        await createWorkReviewMutation.mutateAsync({
          ...values,
          kindergartenId: Number(schoolId),
        });
      } else {
        const values = learningReviewForm.getValues();

        await createInternshipReviewMutation.mutateAsync({
          ...values,
          kindergartenId: Number(schoolId),
          workType: "실습생", // 고정값
        });
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        navigate(`/kindergarten/${schoolId}/review?type=${type}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-white p-5">
      {isTypeValid && (
        <>
          <ProgressBar value={stepIndex + 1} max={totalSteps} />

          {type === REVIEW_TYPES.WORK ? (
            <Form {...workReviewForm}>
              <form className="flex flex-col gap-10">
                <WorkReviewForm
                  form={workReviewForm}
                  step={stepIndex + 1}
                  schoolId={schoolId}
                />
              </form>
            </Form>
          ) : (
            <Form {...learningReviewForm}>
              <form className="flex flex-col gap-10">
                <LearningReviewForm
                  form={learningReviewForm}
                  step={stepIndex + 1}
                />
              </form>
            </Form>
          )}

          <StepButtons
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            isSubmitting={isSubmitting}
            onBack={() => {
              if (stepIndex > 0) setStepIndex((prev) => prev - 1);
              else navigate(`/kindergarten/${schoolId}/review?type=${type}`);
            }}
            onNext={async () => {
              const valid = await validateCurrentStep();
              if (!valid) return;
              if (isLastStep) await handleSubmit();
              else setStepIndex((prev) => prev + 1);
            }}
          />
        </>
      )}
    </div>
  );
}
