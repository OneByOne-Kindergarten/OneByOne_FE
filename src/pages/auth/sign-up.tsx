import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SignUpRequest } from "@/types/authDTO";
import { Step1Form, Step1FormValues } from "@/components/sign-up/Step1Form";
import { Step2Form, Step2FormValues } from "@/components/sign-up/Step2Form";
import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";
import { useSignUp } from "@/hooks/useAuth";

export default function SignUp() {
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState<string | null>(null);
  const [step1Data, setStep1Data] = useState<Step1FormValues | null>(null);
  const navigate = useNavigate();

  const { mutate: signUpMutate, isPending } = useSignUp();

  const handleCustomBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  const handleStep1Complete = (data: Step1FormValues) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleStep2Submit = (data: Step2FormValues) => {
    if (!step1Data) return;

    setError(null);

    const signUpData: SignUpRequest = {
      email: step1Data.email,
      password: step1Data.password,
      provider: "LOCAL",
      providerId: 0,
      nickname: data.nickname,
      role: data.role,
      profileImageUrl: "",
    };

    signUpMutate(signUpData);
  };

  return (
    <PageLayout
      title="원바원 | 회원가입"
      currentPath={URL_PATHS.HOME}
      headerTitle=" "
      headerHasBorder={false}
      isGlobalNavBar={false}
      mainClassName="my-auto flex flex-col gap-16"
      wrapperBg="white"
      hasBackButton={true}
      onBackButtonClick={handleCustomBack}
    >
      <h1 className="text-center text-lg">
        {step === 1 ? (
          "이메일로 가입"
        ) : (
          <>
            {"반가워요!"} <br /> {"선생님에 대해 알려주세요!"}
          </>
        )}
      </h1>
      <section className="px-5 flex flex-col gap-9">
        {step === 1 ? (
          <Step1Form onNext={handleStep1Complete} />
        ) : (
          <Step2Form
            onSubmit={handleStep2Submit}
            isLoading={isPending}
            error={error}
          />
        )}
      </section>
      {step === 1 && (
        <section className="flex justify-center gap-2 text-xs">
          <p className="text-primary-dark03">이미 회원이신가요?</p>
          <Link to={URL_PATHS.SIGNIN} className="text-tertiary-3 font-semibold">
            로그인
          </Link>
        </section>
      )}
    </PageLayout>
  );
}
