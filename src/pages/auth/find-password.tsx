import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmailForm, EmailFormValues } from "@/components/sign-up/EmailForm";
import { EmailCertificationForm } from "@/components/sign-up/EmailCertificationForm";
import {
  PasswordForm,
  PasswordFormValues,
} from "@/components/sign-up/PasswordForm";
import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";
import { useUpdatePassword } from "@/hooks/useAuth";

const FIND_PASSWORD_STEPS = {
  1: { title: "비밀번호 찾기" },
  2: { title: "이메일 인증" },
  3: { title: "비밀번호 재설정" },
} as const;

export default function FindPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const handleCustomBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else {
      navigate(-1);
    }
  };

  const stepHandlers = {
    1: (data: EmailFormValues) => {
      setEmail(data.email);
      setStep(2);
    },
    2: () => setStep(3),
    3: (data: PasswordFormValues) => {
      updatePassword({
        currentPassword: "",
        newPassword: data.password,
      });
    },
  };

  const getStepTitle = () => FIND_PASSWORD_STEPS[step].title;

  const renderCurrentStep = () => {
    const stepComponents = {
      1: <EmailForm onNext={stepHandlers[1]} />,
      2: <EmailCertificationForm email={email} onNext={stepHandlers[2]} />,
      3: <PasswordForm onNext={stepHandlers[3]} isLoading={isPending} />,
    };
    return stepComponents[step];
  };

  return (
    <PageLayout
      title="원바원 | 비밀번호 찾기"
      currentPath={URL_PATHS.FIND_PASSWORD}
      headerTitle=" "
      headerHasBorder={false}
      isGlobalNavBar={false}
      mainClassName="my-auto flex flex-col gap-16"
      wrapperBg="white"
      hasBackButton={true}
      onBackButtonClick={handleCustomBack}
    >
      <h1 className="text-center text-lg">{getStepTitle()}</h1>
      <section className="flex flex-col gap-9 px-5">
        {renderCurrentStep()}
      </section>
    </PageLayout>
  );
}
