import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";
import AlertCard from "@/components/@shared/alert/alert-card";
import Toggle from "@/components/@shared/buttons/base-toggle";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import Textarea from "@/components/@shared/form/textarea";
import { setReviewState, getReviewState } from "@/utils/sessionStorage";
import { BoxRatingGroup } from "@/components/@shared/rating/box-rating";
import { StarRating } from "@/components/@shared/rating/star-rating";

// 폼 필드 및 유효성 검사 인터페이스
interface ReviewFormValues {
  title: string;
  content: string;
  workYear: "less_than_2_years" | "between_2_and_5_years" | "more_than_5_years";

  // 1단계: 복지/급여
  salaryContent: string;
  salaryRating: number;

  // 1단계: 워라벨
  workLifeBalanceContent: string;
  workLifeBalanceRating: number;

  // 2단계: 분위기
  atmosphereContent: string;
  atmosphereRating: number;

  // 2단계: 관리자
  managerContent: string;
  managerRating: number;

  // 2단계: 고객
  clientContent: string;
  clientRating: number;

  // 3단계: 총점
  overallRating: number;
}

export default function ReviewEditor() {
  // 현재 단계 상태 관리
  const [step, setStep] = useState<number>(1);

  const form = useForm<ReviewFormValues>({
    defaultValues: {
      title: "",
      content: "",
      workYear: "less_than_2_years",
      salaryContent: "",
      salaryRating: 3,
      workLifeBalanceContent: "",
      workLifeBalanceRating: 3,
      // 2 depth
      atmosphereContent: "",
      atmosphereRating: 3,
      managerContent: "",
      managerRating: 3,
      clientContent: "",
      clientRating: 3,
      // 3 depth
      overallRating: 4,
    },
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";
  const [searchParams] = useSearchParams();

  const [reviewType, setReviewType] = useState<"work" | "learning">(
    searchParams.get("type") === "learning" ? "learning" : "work"
  );

  // lastVisitedPaths 저장
  useEffect(() => {
    const reviewState = getReviewState();
    console.log("이전 리뷰 상태:", reviewState);

    setReviewState({
      type: reviewType,
    });
  }, [reviewType]);

  const handleNext = () => {
    const nextStep = step + 1;

    if (nextStep > 3) {
      handleSubmit();
      return;
    }

    setStep(nextStep);
  };

  const handlePrev = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    console.log("최종 폼 데이터:", formData);

    navigate(`/school/${safeId}/review/next?type=${reviewType}`);
  };

  const Step1Form = useMemo(() => {
    return (
      <>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  한 줄 평가를 작성해주세요
                </FormLabel>
                <span className="font-semibold text-primary-normal02 text-xs">
                  *200자 이내
                </span>
              </div>
              <FormControl>
                <Input font="md" placeholder="내용을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                근무 기간을 체크해주세요
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value="less_than_2_years"
                    pressed={field.value === "less_than_2_years"}
                    onPressedChange={() => field.onChange("less_than_2_years")}
                  >
                    2년 이내 근무
                  </Toggle>
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value="between_2_and_5_years"
                    pressed={field.value === "between_2_and_5_years"}
                    onPressedChange={() =>
                      field.onChange("between_2_and_5_years")
                    }
                  >
                    2-5년 전 근무
                  </Toggle>
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value="more_than_5_years"
                    pressed={field.value === "more_than_5_years"}
                    onPressedChange={() => field.onChange("more_than_5_years")}
                  >
                    근무한지 오래됨
                  </Toggle>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-1.5">
          <FormField
            control={form.control}
            name="salaryContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  복지/급여에 대해서 알려주세요
                </FormLabel>
                <FormControl>
                  <Textarea
                    padding="sm"
                    font="md"
                    size="auto"
                    placeholder="점수만 입력하고 내용은 생략 가능해요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salaryRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  복지/급여 점수
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <BoxRatingGroup
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      size="md"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="workLifeBalanceContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                워라벨에 대해서 알려주세요
              </FormLabel>
              <FormControl>
                <Textarea
                  padding="sm"
                  font="md"
                  size="auto"
                  placeholder="점수만 입력하고 내용은 생략 가능해요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workLifeBalanceRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                워라벨 점수
              </FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <BoxRatingGroup
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    size="md"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }, [form]);

  const Step2Form = useMemo(() => {
    return (
      <>
        <FormField
          control={form.control}
          name="atmosphereContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                분위기에 대해서 알려주세요
              </FormLabel>
              <FormControl>
                <Textarea
                  padding="sm"
                  font="md"
                  size="auto"
                  placeholder="점수만 입력하고 내용은 생략 가능해요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="atmosphereRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                분위기 점수
              </FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <BoxRatingGroup
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    size="md"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="managerContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                관리자에 대해서 알려주세요
              </FormLabel>
              <FormControl>
                <Textarea
                  padding="sm"
                  font="md"
                  size="auto"
                  placeholder="점수만 입력하고 내용은 생략 가능해요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="managerRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                관리자 점수
              </FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <BoxRatingGroup
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    size="md"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                고객에 대해서 알려주세요
              </FormLabel>
              <FormControl>
                <Textarea
                  padding="sm"
                  font="md"
                  size="auto"
                  placeholder="점수만 입력하고 내용은 생략 가능해요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                고객 점수
              </FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <BoxRatingGroup
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    size="md"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }, [form]);

  const Step3Form = useMemo(() => {
    return (
      <section className="flex flex-col gap-10">
        <FormField
          control={form.control}
          name="overallRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-dark01 font-semibold mb-3">
                총점을 평가해주세요
              </FormLabel>
              <FormControl>
                <div className="flex justify-center my-10">
                  <StarRating
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    size="lg"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertCard>
          <strong>익명성 보장을 위한 안내</strong> <br /> 확실한 익명 보장을
          위해 리뷰가 등록되면 리뷰에 익명 닉네임, 프로필 등 작성자에 대한
          정보가 표기되지 않습니다.
        </AlertCard>
      </section>
    );
  }, [form]);

  // 현재 단계에 따라 렌더링할 폼 선택
  const currentStepForm = useMemo(() => {
    switch (step) {
      case 1:
        return Step1Form;
      case 2:
        return Step2Form;
      case 3:
        return Step3Form;
      default:
        return Step1Form;
    }
  }, [step, Step1Form, Step2Form, Step3Form]);

  // 단계 진행 상태 표시 컴포넌트
  const StepIndicator = useMemo(() => {
    return (
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full ${
              s === step ? "bg-tertiary-2" : "bg-primary-light02"
            }`}
          />
        ))}
      </div>
    );
  }, [step]);

  return (
    <PageLayout
      title="원바원 | 리뷰 작성"
      headerTitle=" "
      headerType="save"
      description="유치원 리뷰 작성"
      currentPath={`/school/${safeId}/review/new?type=${reviewType}`}
      hasBackButton
      wrapperBg="white"
      mainClassName="h-full bg-white flex flex-col gap-6 p-5 pb-5 mb-24"
    >
      {StepIndicator}

      <Form {...form}>
        <div className="flex flex-col gap-5">
          {currentStepForm}

          <div className="flex justify-between mt-4">
            {step > 1 ? (
              <Button onClick={handlePrev} size="md" className="w-20">
                이전
              </Button>
            ) : (
              <div className="w-20" />
            )}

            <Button onClick={handleNext} size="md" className="w-20">
              {step === 3 ? "등록" : "다음"}
            </Button>
          </div>
        </div>
      </Form>
    </PageLayout>
  );
}
