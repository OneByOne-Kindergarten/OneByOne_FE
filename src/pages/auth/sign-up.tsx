import { useNavigate } from "react-router-dom";

import { SignUpRequest } from "@/entities/auth/DTO.d";
import { useSignUp } from "@/entities/auth/hooks";
import { URL_PATHS } from "@/shared/constants/url-path";
import useFormData from "@/shared/hooks/useFormdata";
import { useStepNavigation } from "@/shared/hooks/useStepNavigation";
import { useStepRenderer } from "@/shared/hooks/useStepRenderer";
import PageLayout from "@/shared/ui/layout/page-layout";
import AuthStepper from "@/widgets/auth/ui/AuthStepper";
import AuthTextLinks from "@/widgets/auth/ui/AuthTextLinks";
import { EmailCertificationForm } from "@/widgets/auth/ui/EmailCertificationForm";
import { EmailForm, EmailFormValues } from "@/widgets/auth/ui/EmailForm";
import {
  PasswordForm,
  PasswordFormValues,
} from "@/widgets/auth/ui/PasswordForm";
import { UserInfoForm, UserInfoFormValues } from "@/widgets/auth/ui/SignUpForm";

type SignUpFormData = {
  email: string;
  password: string;
  nickname: string;
  role: "TEACHER" | "PROSPECTIVE_TEACHER";
};

const SIGNUP_STEP_CONFIG = {
  1: {
    title: "이메일로 가입",
    showSignInLink: true,
  },
  2: {
    title: "이메일 인증",
    getSubtitle: (data: Record<string, unknown>) => (
      <p className="mt-2 text-sm text-primary-normal03">
        인증번호가 <strong>{data.email as string}</strong>로 <br />
        발송되었습니다. 메일함을 확인해주세요.
      </p>
    ),
  },
  3: {
    title: "비밀번호 설정",
  },
  4: {
    title: (
      <>
        반가워요! <br /> 선생님에 대해 알려주세요!
      </>
    ),
  },
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const { mutate: signUpMutate, isPending } = useSignUp();
  const {
    currentStep: step,
    goToPreviousStep,
    goToNextStep,
  } = useStepNavigation({
    initStep: 1,
    maxStep: 4,
  });
  const { formData, updateFormData } = useFormData<SignUpFormData>({});
  const { getStepTitle, getStepSubtitle, shouldShowSignInLink, renderStep } =
    useStepRenderer({
      stepConfigs: SIGNUP_STEP_CONFIG,
    });

  const handleBackNavigation = () => {
    if (step === 1) {
      navigate(URL_PATHS.ROOT);
    } else {
      goToPreviousStep();
    }
  };

  const stepHandlers = {
    1: (data: EmailFormValues) => {
      updateFormData({ email: data.email });
      goToNextStep();
    },
    2: () => goToNextStep(),
    3: (data: PasswordFormValues) => {
      updateFormData({ password: data.password });
      goToNextStep();
    },
    4: (data: UserInfoFormValues) => {
      const signUpData: SignUpRequest = {
        email: formData.email!,
        password: formData.password!,
        provider: "LOCAL",
        providerId: 0,
        nickname: data.nickname,
        role: data.role,
        profileImageUrl: "",
      };
      signUpMutate(signUpData);
    },
  };

  const stepComponents = {
    1: <EmailForm onNext={stepHandlers[1]} />,
    2: (
      <EmailCertificationForm
        email={formData.email!}
        onNext={stepHandlers[2]}
      />
    ),
    3: <PasswordForm onNext={stepHandlers[3]} />,
    4: <UserInfoForm onSubmit={stepHandlers[4]} isLoading={isPending} />,
  };

  const title = getStepTitle(step, formData);
  const subtitle = getStepSubtitle(step, formData);
  const content = renderStep(step, stepComponents);

  return (
    <PageLayout
      title="원바원 | 회원가입"
      currentPath={URL_PATHS.SIGNUP}
      headerTitle=" "
      headerHasBorder={false}
      isGlobalNavBar={false}
      mainClassName="my-auto flex flex-col gap-16"
      wrapperBg="white"
      hasBackButton={true}
      onBackButtonClick={handleBackNavigation}
    >
      <AuthStepper title={title} subtitle={subtitle} content={content} />
      {shouldShowSignInLink(step) && <AuthTextLinks types={["로그인"]} />}
    </PageLayout>
  );
}
