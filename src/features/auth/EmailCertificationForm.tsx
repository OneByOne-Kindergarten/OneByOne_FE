import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/common/ui/buttons/base-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/common/ui/form";
import Input from "@/common/ui/form/input";
import { useCheckEmailCertification } from "@/entities/auth/hooks";

const step2Schema = z.object({
  certification: z.string().min(1, "인증번호를 입력해주세요."),
});

export type EmailCertificationFormValues = z.infer<typeof step2Schema>;

interface EmailCertificationFormProps {
  email: string;
  onNext: () => void;
}

export function EmailCertificationForm({
  email,
  onNext,
}: EmailCertificationFormProps) {
  const { mutate: checkEmail, isPending } = useCheckEmailCertification();

  const form = useForm<EmailCertificationFormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: { certification: "" },
    mode: "onChange",
  });

  const onSubmit = (data: EmailCertificationFormValues) => {
    checkEmail(
      { email, certification: data.certification },
      {
        onSuccess: (success: boolean) => {
          if (success) onNext();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="certification"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="인증번호를 입력해주세요."
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
          font="md"
          disabled={!form.formState.isValid || isPending}
        >
          확인
        </Button>
      </form>
    </Form>
  );
}
