import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCookie } from "@/entities/auth/api";
import { SignInRequest } from "@/entities/auth/DTO.d";
import { useSignIn } from "@/entities/auth/hooks";
import { URL_PATHS } from "@/shared/constants/url-path";
import PageLayout from "@/shared/ui/layout/page-layout";
import AuthTextLinks from "@/widgets/auth/ui/AuthTextLinks";
import SignInForm from "@/widgets/auth/ui/SignInForm";

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

export default function SignInPage() {
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
      fcmToken: getCookie("fcmToken") || "",
    };

    signInMutate(signInData);
  };

  return (
    <PageLayout
      title="원바원 | 로그인"
      headerTitle=" "
      headerHasBorder={false}
      currentPath={URL_PATHS.SIGNIN}
      isGlobalNavBar={false}
      mainClassName="flex flex-col gap-16 my-auto"
      wrapperBg="white"
    >
      <h1 className="text-center text-lg">이메일로 로그인</h1>
      <section className="flex flex-col gap-9 px-5">
        <SignInForm form={form} onSubmit={onSubmit} isPending={isPending} />
      </section>
      <AuthTextLinks types={["비밀번호 찾기", "회원가입"]} />
    </PageLayout>
  );
}
