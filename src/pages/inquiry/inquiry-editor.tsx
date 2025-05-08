import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/@shared/form";
import Textarea from "@/components/@shared/form/textarea";
import { URL_PATHS } from "@/constants/url-path";
import { INQUIRY_TITLE_LABEL } from "@/constants/inquiry";
import { useCreateInquiry } from "@/hooks/useInquiry";
import type { CreateInquiryRequest } from "@/types/inquiryDTO";

const inquirySchema = z.object({
  title: z.enum(["GENERAL", "REPORT", "SERVICE", "ETC"]),
  content: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(200, "200자 이내로 입력해주세요"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function InquiryEditorPage() {
  const navigate = useNavigate();
  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      title: "GENERAL",
      content: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: InquiryFormData) => {
    createInquiry(data as CreateInquiryRequest, {
      onSuccess: () => {
        navigate(URL_PATHS.INQUIRY_MY);
      },
    });
  };

  return (
    <PageLayout
      title="원바원 | 문의 작성"
      description="문의 작성하기"
      headerTitle="문의 작성"
      currentPath={URL_PATHS.INQUIRY}
      wrapperBg="white"
      mainClassName="px-5 py-8 mt-14"
    >
      <section className="flex flex-col gap-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary-dark01 font-semibold">
                    문의 유형
                  </FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(INQUIRY_TITLE_LABEL).map(([key, label]) => (
                      <Button
                        key={key}
                        variant={field.value === key ? "secondary" : "default"}
                        size="lg"
                        font="md"
                        shape="full"
                        type="button"
                        onClick={() => field.onChange(key)}
                        className="font-normal"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base text-primary-dark01 font-semibold">
                      내용
                    </FormLabel>
                    <span className="font-semibold text-primary-normal02 text-xs">
                      *200자 이내
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      font="md"
                      padding="sm"
                      placeholder="문의 내용을 자유롭게 작성해주세요"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      error={!!fieldState.error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="secondary"
              type="submit"
              className="flex-1"
              disabled={!form.formState.isValid || isPending}
            >
              문의하기
            </Button>
          </form>
        </Form>
      </section>
    </PageLayout>
  );
}
