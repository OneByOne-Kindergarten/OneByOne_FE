import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageLayout from "@/components/@shared/layout/page-layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import ToggleInput from "@/components/@shared/form/toggle-input";
import Button from "@/components/@shared/buttons/base-button";
import { URL_PATHS } from "@/constants/url-path";
import { SignInRequest } from "@/types/authDTO";
import { useSignIn } from "@/hooks/useAuth";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자까지 가능합니다."),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { mutate: signInMutate, isPending } = useSignIn();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: SignInFormValues) => {
    const signInData: SignInRequest = {
      ...values,
      fcmToken: "",
    };

    signInMutate(signInData);
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
            <Button
              variant="secondary"
              type="submit"
              size="lg"
              font="md"
              disabled={
                isPending ||
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
