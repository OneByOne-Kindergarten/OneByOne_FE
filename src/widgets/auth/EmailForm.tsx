import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useSendEmailCertification } from "@/entities/auth/hooks";
import EmailField from "@/features/auth-form/ui/fields/EmailField";
import SubmitButton from "@/features/auth-form/ui/SubmitButton";
import { Form } from "@/shared/ui/form";

const step1Schema = z.object({
  email: z.string().email("유효한 메일주소를 입력해주세요."),
});

export type EmailFormValues = z.infer<typeof step1Schema>;

export function EmailForm({
  onNext,
}: {
  onNext: (data: EmailFormValues) => void;
}) {
  const { mutate: sendEmail, isPending } = useSendEmailCertification();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = (data: EmailFormValues) => {
    sendEmail(data.email, {
      onSuccess: (success: boolean) => {
        if (success) onNext(data);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <EmailField control={form.control} disabled={isPending} />
        <SubmitButton
          label={isPending ? "발송 중" : "인증번호 발송"}
          disabled={!form.formState.isValid || isPending}
        />
      </form>
    </Form>
  );
}
