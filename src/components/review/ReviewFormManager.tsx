import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Form } from "@/components/@shared/form";
import Button from "@/components/@shared/buttons/base-button";
import WorkReviewForm, {
  WorkReviewFormValues,
} from "@/components/review/WorkReviewForm";
import LearningReviewForm, {
  LearningReviewFormValues,
} from "@/components/review/LearningReviewForm";
import ProgressBar from "@/components/@shared/progress-bar";
import { REVIEW_TYPES } from "@/constants/review";
import {
  workReviewFormSchema,
  learningReviewFormSchema,
} from "@/utils/validationSchemas";

/**
 * 리뷰 타입에 따른 폼 렌더링 및 폼 유효성 검증
 *
 * @param schoolId 학교 ID
 * @param type 리뷰 타입 (work, learning)
 * @param onSubmitSuccess 리뷰 제출 성공 시 콜백
 */

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
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // type이 유효하지 않은 경우 리다이렉트
  if (!Object.values(REVIEW_TYPES).includes(type as any)) {
    navigate(`/school/${schoolId}/review?type=work`);
    return null;
  }

  const totalSteps = type === REVIEW_TYPES.WORK ? 3 : 2;

  // 근무 리뷰 폼
  const workReviewForm = useForm<WorkReviewFormValues>({
    resolver: zodResolver(workReviewFormSchema) as any,
    defaultValues: {
      title: "",
      content: "",
      workYear: "less_than_2_years",
      salaryContent: "",
      salaryRating: 0,
      workLifeBalanceContent: "",
      workLifeBalanceRating: 0,
      atmosphereContent: "",
      atmosphereRating: 0,
      managerContent: "",
      managerRating: 0,
      clientContent: "",
      clientRating: 0,
      overallRating: 0,
    },
  });

  // 실습 리뷰 폼
  const learningReviewForm = useForm<LearningReviewFormValues>({
    resolver: zodResolver(learningReviewFormSchema) as any,
    defaultValues: {
      title: "",
      content: "",
      atmosphereContent: "",
      atmosphereRating: 0,
      educationEnvContent: "",
      educationEnvRating: 0,
      teacherSupportContent: "",
      teacherSupportRating: 0,
      overallRating: 0,
    },
  });

  // 단계별 필드 매핑 및 타입 지정
  const workStepFields: Record<number, Array<keyof WorkReviewFormValues>> = {
    1: [
      "title",
      "workYear",
      "salaryContent",
      "salaryRating",
      "workLifeBalanceContent",
      "workLifeBalanceRating",
    ],
    2: [
      "atmosphereContent",
      "atmosphereRating",
      "managerContent",
      "managerRating",
      "clientContent",
      "clientRating",
    ],
    3: ["overallRating"],
  };

  const learningStepFields: Record<
    number,
    Array<keyof LearningReviewFormValues>
  > = {
    1: [
      "title",
      "atmosphereContent",
      "atmosphereRating",
      "educationEnvContent",
      "educationEnvRating",
      "teacherSupportContent",
      "teacherSupportRating",
    ],
    2: ["overallRating"],
  };

  const handleNext = async () => {
    let isValid = false;

    if (type === REVIEW_TYPES.WORK) {
      isValid = await workReviewForm.trigger(workStepFields[step]);
    } else {
      isValid = await learningReviewForm.trigger(learningStepFields[step]);
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
      navigate(`/school/${schoolId}/review?type=${type}`);
    }
  };

  const handleSubmit = async () => {
    try {
      if (type === REVIEW_TYPES.WORK) {
        const values = workReviewForm.getValues();
        console.log("Work review submitted:", values);
        // TODO: API 호출
      } else {
        const values = learningReviewForm.getValues();
        console.log("Learning review submitted:", values);
        // TODO: API 호출
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        navigate(`/school/${schoolId}/review?type=${type}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // 하단 영역: 이전 및 다음 버튼
  const renderButtons = () => (
    <div
      className={step > 1 ? "flex mt-6 justify-between" : "flex ml-auto mt-6"}
    >
      {step > 1 && (
        <Button size="lg" onClick={handleBack}>
          이전
        </Button>
      )}
      <Button
        variant={step === totalSteps ? "secondary" : "primary"}
        size="lg"
        onClick={handleNext}
      >
        {step === totalSteps ? "등록" : "다음"}
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-5 bg-white rounded-lg">
      <ProgressBar value={step} max={totalSteps} />

      {type === REVIEW_TYPES.WORK ? (
        <Form {...workReviewForm}>
          <form className="flex flex-col gap-6">
            <WorkReviewForm
              form={workReviewForm}
              step={step}
              schoolId={schoolId}
            />
          </form>
        </Form>
      ) : (
        <Form {...learningReviewForm}>
          <form className="flex flex-col gap-6">
            <LearningReviewForm form={learningReviewForm} step={step} />
          </form>
        </Form>
      )}

      {renderButtons()}
    </div>
  );
}
