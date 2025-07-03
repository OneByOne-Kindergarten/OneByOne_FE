import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/components/@shared/buttons/base-button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import ToggleInput from "@/components/@shared/form/toggle-input";

const step3Schema = z
  .object({
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 가능합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof step3Schema>;

export function PasswordForm({
  onNext,
  isLoading = false,
}: {
  onNext: (data: PasswordFormValues) => void;
  isLoading?: boolean;
}) {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(step3Schema),
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
