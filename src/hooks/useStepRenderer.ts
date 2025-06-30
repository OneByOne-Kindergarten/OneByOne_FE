import React from "react";

export interface StepConfig {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  showSignInLink?: boolean;
  getSubtitle?: (data: Record<string, unknown>) => React.ReactNode;
}

export interface StepRendererConfig {
  stepConfigs: Record<number, StepConfig>;
}

export function useStepRenderer({ stepConfigs }: StepRendererConfig) {
  const getStepConfig = (step: number): StepConfig => {
    return stepConfigs[step] || { title: "" };
  };

  const getStepTitle = (step: number, formData?: Record<string, unknown>) => {
    const config = getStepConfig(step);

    if (config.getSubtitle && formData) {
      return React.createElement(
        React.Fragment,
        null,
        config.title,
        config.getSubtitle(formData)
      );
    }

    return config.title;
  };

  const getStepSubtitle = (
    step: number,
    formData?: Record<string, unknown>
  ) => {
    const config = getStepConfig(step);

    if (config.getSubtitle && formData) {
      return config.getSubtitle(formData);
    }

    return config.subtitle;
  };

  const shouldShowSignInLink = (step: number) => {
    return getStepConfig(step).showSignInLink;
  };

  const renderStep = (
    step: number,
    stepComponents: Record<number, React.ReactNode>
  ) => {
    return stepComponents[step] || null;
  };

  return {
    getStepConfig,
    getStepTitle,
    getStepSubtitle,
    shouldShowSignInLink,
    renderStep,
  };
}
