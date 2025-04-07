import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "@/services/authService";
import { Step1Form, Step1FormValues } from "@/components/sign-up/Step1Form";
import { Step2Form, Step2FormValues } from "@/components/sign-up/Step2Form";
import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";
import { SignUpRequest } from "@/types/auth";

export default function SignUp() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step1Data, setStep1Data] = useState<Step1FormValues | null>(null);
  const navigate = useNavigate();

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

  const handleStep2Submit = async (data: Step2FormValues) => {
    if (!step1Data) return;

    setIsLoading(true);
    setError(null);

    try {
      const signUpData: SignUpRequest = {
        email: step1Data.email,
        password: step1Data.password,
        provider: "LOCAL",
        providerId: 0,
        nickname: data.nickname,
        role: data.role,
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
            setStep(1);
          } else if (errorObj.status === 500) {
            setError(
              "서버 오류가 발생했습니다. 잠시 후 로그인을 시도해주세요."
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
            isLoading={isLoading}
            error={error}
          />
        )}
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
