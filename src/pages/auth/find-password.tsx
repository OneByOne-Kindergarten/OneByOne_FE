import { useResetPassword } from "@/entities/auth/hooks";
import AuthStepper from "@/features/auth-form/ui/AuthStepper";
import { URL_PATHS } from "@/shared/constants/url-path";
import useFormData from "@/shared/hooks/useFormdata";
import { useStepNavigation } from "@/shared/hooks/useStepNavigation";
import { useStepRenderer } from "@/shared/hooks/useStepRenderer";
import PageLayout from "@/shared/ui/layout/page-layout";
import { EmailCertificationForm } from "@/widgets/auth/EmailCertificationForm";
import { EmailForm, EmailFormValues } from "@/widgets/auth/EmailForm";

type FindPasswordFormData = {
  email: string;
};

const FIND_PASSWORD_STEP_CONFIGS = {
  1: {
    title: "비밀번호 찾기",
    getSubtitle: () => (
      <p className="mt-2 text-sm text-primary-normal03">
        가입하신 이메일 주소를 입력해 주세요. <br />
        인증번호 메일을 보내드릴게요.
      </p>
    ),
  },
  2: {
    title: "인증번호 메일 발송 완료",
    getSubtitle: (data: Record<string, unknown>) => (
      <p className="mt-2 text-sm text-primary-normal03">
        {data.email as string}로 발송되었습니다. <br />
        인증 후 메일로 임시 비밀번호를 발급해드릴게요.
      </p>
    ),
  },
};

export default function FindPasswordPage() {
  const { mutate: resetPassword } = useResetPassword();

  const {
    currentStep: step,
    goToPreviousStep,
    goToNextStep,
  } = useStepNavigation({
    initStep: 1,
    maxStep: 2,
  });

  const { formData, updateFormData } = useFormData<FindPasswordFormData>({});

  const { getStepTitle, getStepSubtitle, renderStep } = useStepRenderer({
    stepConfigs: FIND_PASSWORD_STEP_CONFIGS,
  });

  const stepHandlers = {
    1: (data: EmailFormValues) => {
      updateFormData({ email: data.email });
      goToNextStep();
    },
    2: () => {
      resetPassword({ email: formData.email! });
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
  };

  const title = getStepTitle(step, formData);
  const subtitle = getStepSubtitle(step, formData);
  const content = renderStep(step, stepComponents);

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
      onBackButtonClick={goToPreviousStep}
    >
      <AuthStepper title={title} subtitle={subtitle} content={content} />
    </PageLayout>
  );
}
