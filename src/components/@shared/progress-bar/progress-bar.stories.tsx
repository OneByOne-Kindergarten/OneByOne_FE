import { useEffect, useState } from "react";

import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

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
        component: "도트 오버레이가 적용된 프로그레스 바 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      description: "현재 진행 값",
      control: { type: "number", min: 0, max: 10, step: 0.1 },
      table: {
        defaultValue: { summary: "3" },
      },
    },
    max: {
      description: "최대값",
      control: { type: "number", min: 1, max: 20 },
      table: {
        defaultValue: { summary: "5" },
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 3,
    max: 5,
  },
};

export const Specs: Story = {
  args: {
    value: 3,
    max: 5,
  },
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Props"
            headers={["prop", "type", "description"]}
            data={[
              ["value", "number", "현재 진행 값 (필수)"],
              ["max", "number", "최대값 (기본: 5)"],
            ]}
            codeColumns={[0, 1]}
          />
          <SpecTable
            title="Visual Design"
            headers={["property", "value", "token"]}
            data={[
              ["width", "100%", "w-full"],
              ["height", "12px", "h-3"],
              ["border radius", "6px", "rounded-md"],
              ["background", "gray-200", "bg-gray-200"],
              ["progress color", "primary gradient", "bg-gradient-to-r"],
              ["dots overlay", "radial pattern", "background-image"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          {/* Animation & Interaction */}
          <SpecTable
            title="Animation"
            headers={["property", "duration", "easing"]}
            data={[
              ["width transition", "0.3s", "ease-out"],
              ["progress fill", "smooth", "linear"],
              ["dot pattern", "static", "-"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          {/* Use Cases */}
          <SpecTable
            title="Common Use Cases"
            headers={["scenario", "max value", "purpose"]}
            data={[
              ["리뷰 작성", "4-5", "단계별 진행률"],
              ["설문조사", "5-10", "응답 완료도"],
              ["프로필 완성", "3-6", "정보 입력률"],
              ["온보딩", "3-5", "튜토리얼 진행"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>

        {/* Usage Guidelines */}
        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "진행률 표시 원칙",
                items: [
                  "명확한 단계 구분으로 사용자 혼란 방지",
                  "현재 위치와 전체 단계 정보 함께 제공",
                  "되돌아가기 가능한 단계는 별도 표시",
                  "완료 단계는 시각적으로 구분",
                  "로딩과 진행률의 차이점 명확화",
                ],
              },
              {
                title: "도트 패턴 활용",
                items: [
                  {
                    label: "시각적 깊이감",
                    description: "단조로운 바 디자인 개선",
                  },
                  {
                    label: "브랜드 아이덴티티",
                    description: "일관된 디자인 언어",
                  },
                  { label: "단계 구분", description: "각 단계의 경계 암시" },
                  { label: "텍스처 효과", description: "촉각적 시각 경험" },
                ],
              },
              {
                title: "접근성 고려사항",
                items: [
                  "aria-valuenow로 현재 값 제공",
                  "aria-valuemin/max로 범위 명시",
                  "role='progressbar' 명시적 지정",
                  "색상 외 텍스트로 진행률 표시",
                  "키보드 네비게이션 지원",
                ],
              },
              {
                title: "사용 시나리오별 가이드",
                items: [
                  "단계별 양식: 3-5단계가 적절",
                  "설문조사: 질문 수만큼 max 설정",
                  "프로필 완성: 필수/선택 항목 구분",
                  "온보딩: 간단명료한 3-4단계",
                  "파일 업로드: 실시간 진행률 표시",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "ProgressBar 컴포넌트의 상세 스펙과 사용 가이드라인입니다.",
      },
    },
  },
};

export const Gallery: Story = {
  args: {
    value: 3,
    max: 5,
  },
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Value">
        <div className="w-80 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>시작</span>
              <span>0/5</span>
            </div>
            <ProgressBar value={0} max={5} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>20% </span>
              <span>1/5</span>
            </div>
            <ProgressBar value={1} max={5} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>50% </span>
              <span>2.5/5</span>
            </div>
            <ProgressBar value={2.5} max={5} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>80% </span>
              <span>4/5</span>
            </div>
            <ProgressBar value={4} max={5} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>100%</span>
              <span>5/5</span>
            </div>
            <ProgressBar value={5} max={5} />
          </div>
        </div>
      </Section>
      <Section title="Max">
        <div className="w-80 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>시작</span>
              <span>0/2</span>
            </div>
            <ProgressBar value={0} max={2} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>시작</span>
              <span>0/3</span>
            </div>
            <ProgressBar value={0} max={3} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>시작</span>
              <span>0/4</span>
            </div>
            <ProgressBar value={0} max={4} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>시작</span>
              <span>0/5</span>
            </div>
            <ProgressBar value={0} max={5} />
          </div>
        </div>
      </Section>
    </main>
  ),
  parameters: {
    docs: {
      description: {
        story: "ProgressBar의 다양한 진행률   .",
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
          <div className="flex justify-end text-sm">
            <span>{Math.round((progress / max) * 100)}%</span>
          </div>
          <ProgressBar value={progress} max={max} />
        </div>
      </div>
    </div>
  );
};

export const States: Story = {
  args: {
    value: 3,
    max: 5,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Auto</h3>
        <AnimatedProgress />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Complete</h3>
        <div className="w-80 space-y-3">
          <ProgressBar value={5} max={5} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "ProgressBar의 다양한 상태와 애니메이션입니다.",
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

export const UseCases: Story = {
  args: {
    value: 3,
    max: 5,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">리뷰 작성</h3>
        <SignupProgressForm />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">설문조사</h3>
        <SurveyProgressForm />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서 사용 예시",
      },
    },
  },
};
