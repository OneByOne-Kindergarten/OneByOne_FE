import Button from "@/shared/ui/buttons/base-button";

interface StepButtonsProps {
  stepIndex: number; // 0-based
  totalSteps: number;
  isSubmitting?: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function StepButtons({
  stepIndex,
  totalSteps,
  isSubmitting = false,
  onBack,
  onNext,
}: StepButtonsProps) {
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  return (
    <div
      className={isFirst ? "ml-auto mt-6 flex" : "mt-6 flex justify-between"}
    >
      {!isFirst && (
        <Button size="lg" onClick={onBack} disabled={isSubmitting}>
          이전
        </Button>
      )}
      <Button
        variant={isLast ? "secondary" : "primary"}
        size="lg"
        font="md_sb"
        onClick={onNext}
        disabled={isSubmitting}
      >
        {isLast ? "등록" : "다음"}
      </Button>
    </div>
  );
}
