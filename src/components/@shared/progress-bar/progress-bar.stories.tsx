import { useEffect, useState } from "react";

import ProgressBar from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
도트 오버레이가 적용된 프로그레스 바 컴포넌트입니다.

**기능:**
- 진행률에 따른 애니메이션
- 도트 오버레이 표시
- 단계 커스텀 가능

**사용 시나리오:**
- 리뷰 작성 진행률 표시
        `,
      },
    },
  },
  argTypes: {
    value: {
      description: "현재 진행 값",
      control: { type: "number", min: 0, max: 10 },
    },
    max: {
      description: "최대값",
      control: { type: "number", min: 1, max: 20 },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>진행률</span>
          <span>
            {args.value}/{args.max}
          </span>
        </div>
        <ProgressBar value={args.value} max={args.max} />
      </div>
    </div>
  ),
  args: {
    value: 3,
    max: 5,
  },
};

export const Progress: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>시작</span>
          <span>0%</span>
        </div>
        <ProgressBar value={0} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>20% 완료</span>
          <span>1/5</span>
        </div>
        <ProgressBar value={1} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>50% 완료</span>
          <span>2.5/5</span>
        </div>
        <ProgressBar value={2.5} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>80% 완료</span>
          <span>4/5</span>
        </div>
        <ProgressBar value={4} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>완료</span>
          <span>100%</span>
        </div>
        <ProgressBar value={5} max={5} />
      </div>
    </div>
  ),
  args: {
    value: 2.5,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 진행률을 보여줍니다.",
      },
    },
  },
};

const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0);
  const max = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= max) {
          return 0; // 리셋
        }
        return prev + 0.2;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [max]);

  return (
    <div className="w-80 space-y-4">
      <div className="text-center">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>진행률</span>
            <span>{Math.round((progress / max) * 100)}%</span>
          </div>
          <ProgressBar value={progress} max={max} />
        </div>
      </div>
    </div>
  );
};

export const AnimatedProgressBar: Story = {
  render: () => <AnimatedProgress />,
  args: {
    value: 2,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "자동 진행되는 애니메이션 프로그레스 바입니다.",
      },
    },
  },
};

const SignupProgressForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = ["개인 정보 작성", "리뷰 작성", "리뷰 작성", "주의사항 확인"];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetSteps = () => {
    setCurrentStep(1);
  };

  return (
    <div className="w-96 space-y-6 rounded-lg border p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">리뷰 작성 진행률</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{steps[currentStep - 1]}</span>
            <span>
              {currentStep}/{totalSteps}
            </span>
          </div>
          <ProgressBar value={currentStep} max={totalSteps} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex-1 rounded bg-gray-200 px-4 py-2 text-sm disabled:opacity-50"
          >
            이전
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="flex-1 rounded bg-blue-500 px-4 py-2 text-sm text-white"
            >
              다음
            </button>
          ) : (
            <button
              onClick={resetSteps}
              className="flex-1 rounded bg-green-500 px-4 py-2 text-sm text-white"
            >
              완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const ReviewUserScenario: Story = {
  render: () => <SignupProgressForm />,
  args: {
    value: 1,
    max: 4,
  },
  parameters: {
    docs: {
      description: {
        story: "리뷰 작성 과정에서의 프로그레스 바 사용 시나리오입니다.",
      },
    },
  },
};

const SurveyProgressForm = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const totalQuestions = 5;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const resetSurvey = () => {
    setAnswers({});
  };

  return (
    <div className="w-96 space-y-6 rounded-lg border p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">설문조사</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>응답 완료</span>
            <span>
              {answeredCount}/{totalQuestions}
            </span>
          </div>
          <ProgressBar value={answeredCount} max={totalQuestions} />
        </div>

        <div className="space-y-3">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
            (questionId) => (
              <div key={questionId} className="space-y-2">
                <div className="text-sm">
                  질문 {questionId}: 서비스에 만족하시나요?
                </div>
                <div className="flex gap-2">
                  {["매우 불만", "불만", "보통", "만족", "매우 만족"].map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(questionId, option)}
                        className={`rounded px-2 py-1 text-xs ${
                          answers[questionId] === option
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>

        <button
          onClick={resetSurvey}
          className="w-full rounded bg-gray-500 px-4 py-2 text-sm text-white"
        >
          설문 초기화
        </button>
      </div>
    </div>
  );
};

export const SurveyUserScenario: Story = {
  render: () => <SurveyProgressForm />,
  args: {
    value: 0,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "설문조사 작성에서 프로그레스 바 사용 시나리오입니다.",
      },
    },
  },
};
