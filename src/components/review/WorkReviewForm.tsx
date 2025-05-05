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
import { StarRating } from "@/components/@shared/rating/star-rating";

// 근무 리뷰 폼 필드 인터페이스
export interface WorkReviewFormValues {
  title: string;
  content: string;
  workYear: "less_than_2_years" | "between_2_and_5_years" | "more_than_5_years";

  // 1 step: 복지/급여, 워라벨
  salaryContent: string;
  salaryRating: number;
  workLifeBalanceContent: string;
  workLifeBalanceRating: number;

  // 2 step: 분위기, 관리자, 고객
  atmosphereContent: string;
  atmosphereRating: number;
  managerContent: string;
  managerRating: number;
  clientContent: string;
  clientRating: number;

  // 3 step: 총점
  overallRating: number;
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

  return currentStepForm;
}
