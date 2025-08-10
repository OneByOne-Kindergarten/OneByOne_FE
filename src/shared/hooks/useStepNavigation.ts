import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface StepNavigationConfig<T extends number> {
  initStep: T;
  maxStep: T;
  onExit?: () => void;
}

export function useStepNavigation<T extends number>({
  initStep,
  maxStep,
  onExit,
}: StepNavigationConfig<T>) {
  const [currentStep, setCurrentStep] = useState<number>(initStep);
  const navigate = useNavigate();

  const goToNextStep = () => {
    if (currentStep < maxStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > initStep) {
      setCurrentStep((prev) => prev - 1);
    } else {
      if (onExit) {
        onExit();
      } else {
        navigate(-1);
      }
    }
  };

  const goToStep = (step: number) => {
    if (step >= initStep && step <= maxStep) {
      setCurrentStep(step);
    }
  };

  const isFirstStep = currentStep === initStep;
  const isLastStep = currentStep === maxStep;

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep,
    isLastStep,
  };
}
