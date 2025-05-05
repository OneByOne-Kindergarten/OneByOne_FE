import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

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

// 실습 리뷰 폼 필드 인터페이스
export interface LearningReviewFormValues {
  title: string;
  content: string;

  // 1 step: 분위기, 학습도움, 지도교사
  atmosphereContent: string;
  atmosphereRating: number;
  educationEnvContent: string;
  educationEnvRating: number;
  teacherSupportContent: string;
  teacherSupportRating: number;

  // 2 step: 총점
  overallRating: number;
}

interface LearningReviewFormProps {
  form: UseFormReturn<LearningReviewFormValues>;
  step: number;
}

export default function LearningReviewForm({
  form,
  step,
}: LearningReviewFormProps) {
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
        <div className="flex flex-col gap-1.5">
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
            name="educationEnvContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  학습 도움에 대해서 알려주세요
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
            name="educationEnvRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  학습 도움 점수
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
            name="teacherSupportContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  지도 교사에 대해서 알려주세요
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
            name="teacherSupportRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  지도 교사 점수
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
      </>
    );
  }, [form]);

  const Step2Form = useMemo(() => {
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
    if (step === 2) {
      return Step2Form;
    }
    return Step1Form;
  }, [step, Step1Form, Step2Form]);

  return currentStepForm;
}
