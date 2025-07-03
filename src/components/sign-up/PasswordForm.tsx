import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/components/@shared/buttons/base-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@shared/form";
import ToggleInput from "@/components/@shared/form/toggle-input";
import { passwordWithConfirmSchema } from "@/utils/validationSchemas";

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
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <ToggleInput
                    placeholder="비밀번호를 입력해주세요."
                    error={!!fieldState.error}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <ToggleInput
                    placeholder="비밀번호를 다시 한번 입력해주세요."
                    error={!!fieldState.error}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          variant="secondary"
          type="submit"
          size="lg"
          font="md"
          disabled={!form.formState.isValid || isLoading}
        >
          확인
        </Button>
      </form>
    </Form>
  );
}
