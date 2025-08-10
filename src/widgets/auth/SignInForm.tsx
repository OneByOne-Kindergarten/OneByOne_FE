import SubmitButton from "@/features/auth-form/ui/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import Input from "@/shared/ui/form/input";
import ToggleInput from "@/shared/ui/form/toggle-input";

import type { UseFormReturn } from "react-hook-form";

type SignInValues = {
  email: string;
  password: string;
};

interface SignInFormProps {
  form: UseFormReturn<SignInValues>;
  onSubmit: (values: SignInValues) => void;
  isPending?: boolean;
}

export default function SignInForm({
  form,
  onSubmit,
  isPending = false,
}: SignInFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3.5">
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <SubmitButton
          label="로그인"
          isLoading={isPending}
          disabled={
            isPending ||
            !form.formState.isValid ||
            Object.keys(form.formState.errors).length > 0
          }
        />
      </form>
    </Form>
  );
}
