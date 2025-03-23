import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/button";
import { Toggle } from "@/components/@shared/buttons/toggle-button";
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
import { SquareRatingGroup } from "@/components/@shared/rating/square-rating";

interface ReviewFormValues {
  title: string;
  content: string;
  workYear: "less_than_2_years" | "between_2_and_5_years" | "more_than_5_years";
  welfare: "good" | "average" | "poor";
  welfareRating: number;
}

export default function ReviewEditor() {
  const form = useForm<ReviewFormValues>({
    defaultValues: {
      title: "",
      content: "",
      workYear: "less_than_2_years",
      welfare: "average",
      welfareRating: 3,
    },
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";
  const [searchParams] = useSearchParams();

  const [reviewType, setReviewType] = useState<"work" | "learning">(
    searchParams.get("type") === "learning" ? "learning" : "work"
  );
  const [ratings, setRatings] = useState({
    welfare: 3,
    workLifeBalance: 3,
    atmosphere: 3,
    manager: 3,
    client: 3,
  });

  // lastVisitedPaths 저장
  useEffect(() => {
    const reviewState = getReviewState();
    console.log("이전 리뷰 상태:", reviewState);

    setReviewState({
      type: reviewType,
    });
  }, [reviewType]);

  // 다음 리뷰로 이동
  const handleNextReview = () => {
    const formData = form.getValues();
    console.log("저장된 폼 데이터:", formData);

    navigate(`/school/${safeId}/review/next?type=${reviewType}`);
  };

  // 평점 변경
  const handleRatingChange = (
    category: keyof typeof ratings,
    value: number
  ) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <PageLayout
      title="원바원 | 리뷰 작성"
      headerTitle="리뷰 작성"
      description="유치원 리뷰 작성"
      currentPath={`/school/${safeId}/review/new?type=${reviewType}`}
      hasBackButton
      wrapperBg="white"
      mainClassName="h-full bg-white flex flex-col gap-6 p-5 pb-5 mb-24"
    >
      <Form {...form}>
        <div className="flex flex-col gap-5">
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
                  <Input placeholder="내용을 입력해주세요" {...field} />
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
                  <div className="flex gap-2">
                    <Toggle
                      value="less_than_2_years"
                      pressed={field.value === "less_than_2_years"}
                      onPressedChange={() =>
                        field.onChange("less_than_2_years")
                      }
                    >
                      2년 이내 근무
                    </Toggle>
                    <Toggle
                      value="between_2_and_5_years"
                      pressed={field.value === "between_2_and_5_years"}
                      onPressedChange={() =>
                        field.onChange("between_2_and_5_years")
                      }
                    >
                      2-5년 전 근무
                    </Toggle>
                    <Toggle
                      value="more_than_5_years"
                      pressed={field.value === "more_than_5_years"}
                      onPressedChange={() =>
                        field.onChange("more_than_5_years")
                      }
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
            control={form.control}
            name="welfare"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  복지/급여에 대해서 알려주세요{" "}
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="내용을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="welfareRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-primary-dark01 font-semibold">
                  복지/급여 점수
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <SquareRatingGroup
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
          <div className="ml-auto">
            <Button onClick={handleNextReview} size="md" className="w-20">
              다음
            </Button>
          </div>
        </div>
      </Form>
    </PageLayout>
  );
}
