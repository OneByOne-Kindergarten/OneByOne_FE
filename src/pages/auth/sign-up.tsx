import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { URL_PATHS } from "@/constants/url-path";
import { SignUpRequest } from "@/types/auth";
import { signUp } from "@/services/authService";
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
import PageLayout from "@/components/@shared/layout/page-layout";
import ErrorMessage from "@/components/@shared/form/error-message";

// 회원가입 폼 유효성 검사 스키마
const signUpSchema = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 가능합니다."),
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
      .max(8, "닉네임은 최대 8자까지 가능합니다."),
    role: z.enum(["TEACHER", "PRE_TEACHER"], {
      errorMap: () => ({ message: "회원 유형을 선택해주세요." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      role: "TEACHER",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const signUpData: SignUpRequest = {
        email: values.email,
        password: values.password,
        provider: "LOCAL",
        providerId: 0,
        nickname: values.nickname,
        role: values.role,
        profileImageUrl: "",
      };

      if (error?.includes("이미 사용 중인 이메일")) {
        setError("이미 가입된 이메일입니다. 로그인을 시도해주세요.");
        return;
      }

      const response = await signUp(signUpData);

      alert("회원가입이 완료되었습니다.");
      navigate(URL_PATHS.SIGNIN);
    } catch (error) {
      console.error("회원가입 오류:", error);

      if (
        error instanceof Error &&
        error.message.includes("Failed to parse JSON response")
      ) {
        alert("회원가입이 완료되었습니다.");
        navigate(URL_PATHS.SIGNIN);
        return;
      }

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (
            errorObj.data?.message?.includes("이미 사용 중인 이메일") ||
            errorObj.data?.message?.includes("duplicate") ||
            errorObj.data?.message?.includes("already exists")
          ) {
            setError("이미 가입된 이메일입니다. 로그인을 시도해주세요.");
          } else if (errorObj.status === 500) {
            setError(
              "서버 오류가 발생했습니다. 로그인을 시도해보세요. 계속 문제가 발생하면 관리자에게 문의하세요."
            );
          } else {
            setError(
              errorObj.data?.message ||
                "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
            );
          }
        } catch {
          setError(`회원가입 중 오류가 발생했습니다: ${error.message}`);
        }
      } else {
        setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="원바원 | 회원가입"
      currentPath={URL_PATHS.HOME}
      headerTitle=" "
      headerHasBorder={false}
      isGlobalNavBar={false}
      mainClassName="my-16 flex flex-col gap-16"
      wrapperBg="white"
    >
      <h1 className="text-center text-lg">회원가입</h1>
      <section className="px-5 flex flex-col gap-9">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3.5">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <Button
                        size="md"
                        font="sm"
                        shape="full"
                        type="button"
                        variant={
                          field.value === "TEACHER" ? "secondary" : "default"
                        }
                        onClick={() => form.setValue("role", "TEACHER")}
                      >
                        교사
                      </Button>
                      <Button
                        size="md"
                        font="sm"
                        shape="full"
                        type="button"
                        variant={
                          field.value === "PRE_TEACHER"
                            ? "secondary"
                            : "default"
                        }
                        onClick={() => form.setValue("role", "PRE_TEACHER")}
                      >
                        예비교사
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="닉네임을 입력해주세요."
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
              회원가입
            </Button>
          </form>
        </Form>
      </section>
      <section className="flex flex-col gap-2 items-center text-xs">
        <div className="flex gap-2">
          <p className="text-primary-dark03">이미 회원이신가요?</p>
          <Link to={URL_PATHS.SIGNIN} className="text-tertiary-3 font-semibold">
            로그인
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
