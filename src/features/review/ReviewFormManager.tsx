import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { REVIEW_TYPES } from "@/common/constants/review";
import Button from "@/common/ui/buttons/base-button";
import { Form } from "@/common/ui/form";
import ProgressBar from "@/common/ui/progress-bar";
import {
  learningReviewFormSchema,
  workReviewFormSchema,
} from "@/common/utils/validationSchemas";
import {
  useCreateInternshipReview,
  useCreateWorkReview,
} from "@/entities/review/hooks";
import LearningReviewForm, {
  LearningReviewFormValues,
} from "@/features/review/LearningReviewForm";
import WorkReviewForm, {
  WorkReviewFormValues,
} from "@/features/review/WorkReviewForm";

interface ReviewFormManagerProps {
  schoolId: string;
  type: string;
  onSubmitSuccess?: () => void;
}

/**
 * 리뷰 타입에 따른 폼 렌더링 및 폼 유효성 검증
 *
 * @param schoolId 학교 ID
 * @param type 리뷰 타입 (work, learning)
 * @param onSubmitSuccess 리뷰 제출 성공 시 콜백
 */
export default function ReviewFormManager({
  schoolId,
  type,
  onSubmitSuccess,
}: ReviewFormManagerProps) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const createWorkReviewMutation = useCreateWorkReview();
  const createInternshipReviewMutation = useCreateInternshipReview();

  const workReviewForm = useForm<WorkReviewFormValues>({
    resolver: zodResolver(workReviewFormSchema),
    defaultValues: {
      workYear: 1,
      workType: "비공개",
      oneLineComment: "",
      benefitAndSalaryComment: "",
      benefitAndSalaryScore: 0,
      workLifeBalanceComment: "",
      workLifeBalanceScore: 0,
      workEnvironmentComment: "",
      workEnvironmentScore: 0,
      managerComment: "",
      managerScore: 0,
      customerComment: "",
      customerScore: 0,
    },
  });

  const learningReviewForm = useForm<LearningReviewFormValues>({
    resolver: zodResolver(learningReviewFormSchema),
    defaultValues: {
      oneLineComment: "",
      workEnvironmentComment: "",
      workEnvironmentScore: 0,
      learningSupportComment: "",
      learningSupportScore: 0,
      instructionTeacherComment: "",
      instructionTeacherScore: 0,
    },
  });

  // type이 유효하지 않은 경우 리다이렉트
  if (!Object.values(REVIEW_TYPES).includes(type as "work" | "learning")) {
    navigate(`/kindergarten/${schoolId}/review?type=work`);
    return null;
  }

  const totalSteps = type === REVIEW_TYPES.WORK ? 2 : 2;

  const handleNext = async () => {
    let isValid = false;

    if (type === REVIEW_TYPES.WORK) {
      const step1Fields: (keyof WorkReviewFormValues)[] = [
        "workYear",
        "workType",
        "oneLineComment",
      ];
      const step2Fields: (keyof WorkReviewFormValues)[] = [
        "benefitAndSalaryScore",
        "workLifeBalanceScore",
        "workEnvironmentScore",
        "managerScore",
        "customerScore",
      ];

      const fieldsToValidate = step === 1 ? step1Fields : step2Fields;
      isValid = await workReviewForm.trigger(fieldsToValidate);
    } else {
      const step1Fields: (keyof LearningReviewFormValues)[] = [
        "oneLineComment",
      ];
      const step2Fields: (keyof LearningReviewFormValues)[] = [
        "workEnvironmentScore",
        "learningSupportScore",
        "instructionTeacherScore",
      ];

      const fieldsToValidate = step === 1 ? step1Fields : step2Fields;
      isValid = await learningReviewForm.trigger(fieldsToValidate);
    }

    if (!isValid) return;

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate(`/kindergarten/${schoolId}/review?type=${type}`);
    }
  };

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
          workType: "실습생", // 실습생은 고정값
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

  // 하단 영역: 이전 및 다음 버튼
  const renderButtons = () => {
    const isSubmitting =
      type === REVIEW_TYPES.WORK
        ? createWorkReviewMutation.isPending
        : createInternshipReviewMutation.isPending;

    return (
      <div
        className={step > 1 ? "mt-6 flex justify-between" : "ml-auto mt-6 flex"}
      >
        {step > 1 && (
          <Button size="lg" onClick={handleBack} disabled={isSubmitting}>
            이전
          </Button>
        )}
        <Button
          variant={step === totalSteps ? "secondary" : "primary"}
          size="lg"
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {step === totalSteps ? "등록" : "다음"}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-white p-5">
      <ProgressBar value={step} max={totalSteps} />

      {type === REVIEW_TYPES.WORK ? (
        <Form {...workReviewForm}>
          <form className="flex flex-col gap-10">
            <WorkReviewForm
              key={`work-review-step-${step}`}
              form={workReviewForm}
              step={step}
              schoolId={schoolId}
            />
          </form>
        </Form>
      ) : (
        <Form {...learningReviewForm}>
          <form className="flex flex-col gap-10">
            <LearningReviewForm
              key={`learning-review-step-${step}`}
              form={learningReviewForm}
              step={step}
            />
          </form>
        </Form>
      )}

      {renderButtons()}
    </div>
  );
}
