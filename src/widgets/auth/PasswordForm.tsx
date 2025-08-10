import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import ConfirmPasswordField from "@/features/auth-form/ui/fields/ConfirmPasswordField";
import PasswordField from "@/features/auth-form/ui/fields/PasswordField";
import SubmitButton from "@/features/auth-form/ui/SubmitButton";
import { Form } from "@/shared/ui/form";
import { passwordWithConfirmSchema } from "@/shared/utils/validationSchemas";

export type PasswordFormValues = z.infer<typeof passwordWithConfirmSchema>;
export function PasswordForm({
  onNext,
  isLoading = false,
}: {
  onNext: (data: PasswordFormValues) => void;
  isLoading?: boolean;
}) {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordWithConfirmSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const onSubmit = (data: PasswordFormValues) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3.5">
          <PasswordField control={form.control} />
          <ConfirmPasswordField control={form.control} />
        </div>
        <SubmitButton
          label="확인"
          disabled={!form.formState.isValid || isLoading}
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
}
