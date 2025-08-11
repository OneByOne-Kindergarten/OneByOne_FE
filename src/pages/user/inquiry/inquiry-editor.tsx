import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import type { CreateInquiryRequest } from "@/entities/inquiry/DTO";
import { useCreateInquiry } from "@/entities/inquiry/hooks";
import TextareaField from "@/features/form/ui/fields/TextareaField";
import ToggleChoicesField from "@/features/form/ui/fields/ToggleChoicesField";
import SubmitButton from "@/features/form/ui/SubmitButton";
import { INQUIRY_TITLE_LABEL } from "@/shared/constants/inquiry";
import { URL_PATHS } from "@/shared/constants/url-path";
import { Form } from "@/shared/ui/form";
import PageLayout from "@/shared/ui/layout/page-layout";

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
            <ToggleChoicesField
              control={form.control}
              name="title"
              label="문의 유형"
              options={Object.entries(INQUIRY_TITLE_LABEL).map(
                ([value, label]) => ({
                  label,
                  value,
                })
              )}
            />
            <TextareaField
              control={form.control}
              name="content"
              label="내용"
              placeholder="문의 내용을 자유롭게 작성해주세요"
              showCounter
              maxLength={200}
            />
            <SubmitButton
              label="문의하기"
              disabled={!form.formState.isValid || isPending}
              isLoading={isPending}
            />
          </form>
        </Form>
      </section>
    </PageLayout>
  );
}
