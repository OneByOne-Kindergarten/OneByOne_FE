import PageLayout from "@/components/@shared/layout/page-layout";
import { EmailCertificationForm } from "@/components/sign-up/EmailCertificationForm";
import { EmailForm, EmailFormValues } from "@/components/sign-up/EmailForm";
import { URL_PATHS } from "@/constants/url-path";
import { useResetPassword } from "@/hooks/useAuth";
import { useFormData } from "@/hooks/useFormData";
import { useStepNavigation } from "@/hooks/useStepNavigation";
import { useStepRenderer } from "@/hooks/useStepRenderer";

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
        인증 후 임시 비밀번호를 발급해드릴게요.
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
      <section className="text-center text-lg">
        <h1>{getStepTitle(step, formData)}</h1>
        {getStepSubtitle(step, formData)}
      </section>
      <section className="flex flex-col gap-9 px-5">
        {renderStep(step, stepComponents)}
      </section>
    </PageLayout>
  );
}
