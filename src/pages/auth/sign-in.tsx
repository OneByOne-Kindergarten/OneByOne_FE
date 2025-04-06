import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { URL_PATHS } from "@/constants/url-path";
import { SignInRequest } from "@/types/auth";
import { signIn } from "@/services/authService";
import PageLayout from "@/components/@shared/layout/page-layout";
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
import ErrorMessage from "@/components/@shared/form/error-message";

// 로그인 폼 유효성 검사 스키마
const signInSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자까지 가능합니다."),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: SignInFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // 웹에서는 fcmToken를 빈 문자열로 처리
      const signInData: SignInRequest = {
        ...values,
        fcmToken: "",
      };

      const response = await signIn(signInData);

      navigate(URL_PATHS.SCHOOL);
    } catch (error) {
      setError("유효하지 않은 이메일 또는 비밀번호입니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="원바원 | 로그인"
      headerTitle=" "
      headerHasBorder={false}
      currentPath={URL_PATHS.HOME}
      isGlobalNavBar={false}
      mainClassName="mt-16 flex flex-col gap-16"
      wrapperBg="white"
    >
      <h1 className="text-center text-lg">이메일로 로그인</h1>
      <section className="px-5 flex flex-col gap-9">
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

            {error && <ErrorMessage error={error} />}

            <Button
              variant="secondary"
              type="submit"
              size="lg"
              font="md"
              disabled={
                isLoading ||
                !form.formState.isValid ||
                Object.keys(form.formState.errors).length > 0
              }
            >
              로그인
            </Button>
          </form>
        </Form>
      </section>
      <section className="flex flex-col gap-2 items-center text-xs">
        <div className="flex gap-2">
          <p className="text-primary-dark03">비밀번호를 잊으셨나요?</p>
          <Link to="#" className="text-tertiary-3 font-semibold">
            비밀번호 찾기
          </Link>
        </div>
        <div className="flex gap-2">
          <p className="text-primary-dark03">아직 회원이 아니신가요?</p>
          <Link to={URL_PATHS.SIGNUP} className="text-tertiary-3 font-semibold">
            회원가입
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
