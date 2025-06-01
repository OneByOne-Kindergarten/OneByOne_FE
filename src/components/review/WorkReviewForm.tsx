import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import Toggle from "@/components/@shared/buttons/base-toggle";
import AlertCard from "@/components/@shared/alert/alert-card";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import Textarea from "@/components/@shared/form/textarea";
import { BoxRatingGroup } from "@/components/@shared/rating/box-rating";

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
  const Step1Form = useMemo(() => {
    return (
      <>
        <FormField
          key="oneLineComment"
          control={form.control}
          name="oneLineComment"
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
                <Input
                  font="md"
                  placeholder="내용을 입력해주세요"
                  value={field.value}
                  onChange={field.onChange}
                  name="oneLineComment"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key="workYear"
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
                    value={1}
                    pressed={field.value === 1}
                    onPressedChange={() => field.onChange(1)}
                  >
                    2년 이내 근무
                  </Toggle>
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value={2}
                    pressed={field.value === 2}
                    onPressedChange={() => field.onChange(2)}
                  >
                    2-5년 전 근무
                  </Toggle>
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value={3}
                    pressed={field.value === 3}
                    onPressedChange={() => field.onChange(3)}
                  >
                    근무한지 오래됨
                  </Toggle>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key="workType"
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-dark01 font-semibold">
                근무 유형을 입력해주세요
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value="담임"
                    pressed={field.value === "담임"}
                    onPressedChange={() => field.onChange("담임")}
                  >
                    담임
                  </Toggle>
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value="부담임"
                    pressed={field.value === "부담임"}
                    onPressedChange={() => field.onChange("부담임")}
                  >
                    부담임
                  </Toggle>
                  <Toggle
                    variant="primary"
                    font="md"
                    size="lg"
                    shape="full"
                    value="비공개"
                    pressed={field.value === "비공개"}
                    onPressedChange={() => field.onChange("비공개")}
                  >
                    비공개
                  </Toggle>
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
        <div className="flex flex-col gap-2">
          <FormField
            key="benefitAndSalaryComment"
            control={form.control}
            name="benefitAndSalaryComment"
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    name="benefitAndSalaryComment"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="benefitAndSalaryScore"
            control={form.control}
            name="benefitAndSalaryScore"
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
        <div className="flex flex-col gap-2">
          <FormField
            key="workLifeBalanceComment"
            control={form.control}
            name="workLifeBalanceComment"
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    name="workLifeBalanceComment"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="workLifeBalanceScore"
            control={form.control}
            name="workLifeBalanceScore"
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
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            key="workEnvironmentComment"
            control={form.control}
            name="workEnvironmentComment"
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    name="workEnvironmentComment"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="workEnvironmentScore"
            control={form.control}
            name="workEnvironmentScore"
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
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            key="managerComment"
            control={form.control}
            name="managerComment"
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    name="managerComment"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="managerScore"
            control={form.control}
            name="managerScore"
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
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            key="customerComment"
            control={form.control}
            name="customerComment"
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    name="customerComment"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="customerScore"
            control={form.control}
            name="customerScore"
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
        </div>
        <AlertCard>
          <strong>익명성 보장을 위한 안내</strong> <br /> 확실한 익명 보장을
          위해 리뷰가 등록되면 리뷰에 익명 닉네임, 프로필 등 작성자에 대한
          정보가 표기되지 않습니다.
        </AlertCard>
      </>
    );
  }, [form]);

  // 현재 단계에 따라 렌더링할 폼 선택
  const currentStepForm = useMemo(() => {
    if (step === 2) {
      return Step2Form;
    }
    return Step1Form;
  }, [step, Step1Form, Step2Form]);

  return currentStepForm;
}
