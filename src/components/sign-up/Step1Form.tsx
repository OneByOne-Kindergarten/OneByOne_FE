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
import ToggleInput from "@/components/@shared/form/toggle-input";
import Button from "@/components/@shared/buttons/base-button";

// 이메일, 비밀번호
const step1Schema = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
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

export type Step1FormValues = z.infer<typeof step1Schema>;

export function Step1Form({
  onNext,
}: {
  onNext: (data: Step1FormValues) => void;
}) {
  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const isFormValid = () => {
    const { email, password, confirmPassword } = form.getValues();
    const emailError = form.formState.errors.email;
    const passwordError = form.formState.errors.password;
    const confirmPasswordError = form.formState.errors.confirmPassword;

    return (
      email &&
      password &&
      confirmPassword &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      password === confirmPassword
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      onNext(form.getValues());
    } else {
      form.trigger(["email", "password", "confirmPassword"]);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6">
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
          type="button"
          size="lg"
          font="md"
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          가입하기
        </Button>
      </form>
    </Form>
  );
}
