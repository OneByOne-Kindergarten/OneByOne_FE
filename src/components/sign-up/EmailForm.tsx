import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import Button from "@/components/@shared/buttons/base-button";
import { useSendEmailCertification } from "@/hooks/useAuth";

const step1Schema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
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
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="이메일을 입력해주세요."
                  error={!!fieldState.error}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="secondary"
          type="submit"
          size="lg"
          font="md"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? "발송 중..." : "인증번호 발송"}
        </Button>
      </form>
    </Form>
  );
}
