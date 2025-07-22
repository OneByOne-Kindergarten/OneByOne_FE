import {
  ColorSwatch,
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";
import { useToast } from "@/hooks/useToast";

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../index";

import { Toaster } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Feedback/Toaster",
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component: "토스트 메시지 관리 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj;

// 정적 토스트 UI 표시용 컴포넌트들
const StaticToastContainer = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <div className="mt-16">{children}</div>
    <ToastViewport />
  </ToastProvider>
);

const StaticToast = ({
  title,
  description,
  variant = "default",
  action,
  open = true,
}: {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
  open?: boolean;
}) => (
  <Toast variant={variant} open={open} onOpenChange={() => {}}>
    <div className="flex flex-col gap-1">
      <ToastTitle variant={variant}>{title}</ToastTitle>
      {description && <ToastDescription>{description}</ToastDescription>}
    </div>
    {action}
    <ToastClose />
  </Toast>
);

const ToasterDemo = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "성공",
      description: "완료된 작업을 확인해보세요.",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "오류",
      description: "잠시 후 다시 시도해주세요.",
      variant: "destructive",
    });
  };

  const showActionToast = () => {
    toast({
      title: "새로운 알림 도착",
      description: "확인 버튼을 눌러 알림을 처리하세요.",
      action: (
        <button
          onClick={() => alert("확인됨")}
          className="rounded bg-white px-3 py-1 text-sm text-primary-dark01"
        >
          확인
        </button>
      ),
    });
  };

  const showTitleOnlyToast = () => {
    toast({
      title: "북마크 추가 완료",
    });
  };

  return (
    <div className="mb-28 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={showSuccessToast}
          className="bg-tertiary-3 p-4 text-white transition-colors"
        >
          성공 토스트
        </button>
        <button
          onClick={showErrorToast}
          className="bg-destructive p-4 text-white transition-colors"
        >
          에러 토스트
        </button>
        <button
          onClick={showActionToast}
          className="bg-secondary-main p-4 text-primary transition-colors"
        >
          액션 토스트
        </button>
        <button
          onClick={showTitleOnlyToast}
          className="bg-primary-normal03 p-4 text-white transition-colors"
        >
          타이틀 토스트
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export const Playground: Story = {
  render: () => <ToasterDemo />,
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          {/* Component Structure */}
          <SpecTable
            title="Component Structure"
            headers={["component", "purpose", "required"]}
            data={[
              ["Toaster", "토스트 컨테이너", "Yes"],
              ["ToastProvider", "Context Provider", "Yes"],
              ["Toast", "개별 토스트", "Yes"],
              ["ToastTitle", "토스트 제목", "Yes"],
              ["ToastDescription", "토스트 설명", "No"],
              ["ToastAction", "액션 버튼", "No"],
              ["ToastClose", "닫기 버튼", "Yes"],
              ["ToastViewport", "표시 영역", "Yes"],
            ]}
            codeColumns={[0, 2]}
          />

          {/* Variants */}
          <SpecTable
            title="Variants"
            headers={["variant", "background", "text", "usage"]}
            data={[
              [
                "default",
                <ColorSwatch color="bg-white" label="white" />,
                "gray-900",
                "일반 알림",
              ],
              [
                "destructive",
                <ColorSwatch color="bg-destructive" label="destructive" />,
                "white",
                "에러, 삭제 등",
              ],
            ]}
            codeColumns={[0, 2, 3]}
          />

          {/* Layout Specifications */}
          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["position", "fixed", "fixed"],
              ["location", "bottom-right", "bottom-4 right-4"],
              ["width", "400px", "w-96"],
              ["padding", "16px", "p-4"],
              ["border radius", "8px", "rounded-lg"],
              ["animation", "slide-in-up", "animate-slide-in-up"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          {/* Timing */}
          <SpecTable
            title="Timing"
            headers={["type", "duration", "behavior"]}
            data={[
              ["default", "5000ms", "자동 사라짐"],
              ["with action", "∞", "사용자 액션 대기"],
              ["hover", "pause", "호버 시 타이머 정지"],
              ["animation", "200ms", "나타남/사라짐 애니메이션"],
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
                title: "콘텐츠 가이드라인",
                items: [
                  "제목은 간결하고 명확하게 (1-2줄)",
                  "설명은 구체적이고 도움이 되는 정보",
                  "액션 버튼은 1개만 사용",
                  "긴 메시지는 모달로 대체 고려",
                  "사용자가 이해하기 쉬운 언어 사용",
                ],
              },
              {
                title: "타이밍 전략",
                items: [
                  "성공 메시지: 3-5초",
                  "에러 메시지: 5-7초 또는 수동 닫기",
                  "액션이 있는 경우: 사용자 액션까지",
                  "중요한 정보: 수동 닫기 필수",
                  "연속 토스트는 큐로 관리",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "폼 제출 성공/실패",
                  "데이터 저장/삭제 완료",
                  "파일 업로드 상태",
                  "네트워크 연결 상태",
                  "북마크 추가/제거",
                  "알림 설정 변경",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "스크린 리더 지원 (aria-live)",
                  "키보드로 닫기 가능 (ESC)",
                  "모바일에서 적절한 크기",
                  "다른 UI 요소 가리지 않게 배치",
                  "색상뿐만 아니라 아이콘으로도 구분",
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
        story: "토스트 시스템의 상세 스펙과 사용 가이드라인입니다.",
      },
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Toast Types">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Default Toast</h4>
            <StaticToastContainer>
              <StaticToast
                title="성공"
                description="완료된 작업을 확인해보세요."
              />
            </StaticToastContainer>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Destructive Toast</h4>
            <StaticToastContainer>
              <StaticToast
                title="오류"
                description="잠시 후 다시 시도해주세요."
                variant="destructive"
              />
            </StaticToastContainer>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">With Action</h4>
            <StaticToastContainer>
              <StaticToast
                title="새로운 알림 도착"
                description="확인 버튼을 눌러 알림을 처리하세요."
                action={
                  <ToastAction asChild altText="알림 확인">
                    <button className="rounded bg-white px-3 py-1 text-sm text-primary-dark01">
                      확인
                    </button>
                  </ToastAction>
                }
              />
            </StaticToastContainer>
          </div>
        </div>
      </Section>
    </main>
  ),
  parameters: {
    docs: {
      description: {
        story: "다양한 토스트 유형들을 확인할 수 있습니다.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Toast States</h3>
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              Success State
            </h4>
            <StaticToastContainer>
              <StaticToast
                title="성공"
                description="완료된 작업을 확인해보세요."
              />
            </StaticToastContainer>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              Error State
            </h4>
            <StaticToastContainer>
              <StaticToast
                title="오류"
                description="잠시 후 다시 시도해주세요."
                variant="destructive"
              />
            </StaticToastContainer>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              Title Only
            </h4>
            <StaticToastContainer>
              <StaticToast title="북마크 추가 완료" />
            </StaticToastContainer>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              With Action Button
            </h4>
            <StaticToastContainer>
              <StaticToast
                title="새로운 알림 도착"
                description="확인 버튼을 눌러 알림을 처리하세요."
                action={
                  <ToastAction asChild altText="알림 확인">
                    <button className="rounded bg-white px-3 py-1 text-sm text-primary-dark01">
                      확인
                    </button>
                  </ToastAction>
                }
              />
            </StaticToastContainer>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "토스트의 다양한 상태와 구성을 확인할 수 있습니다.",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => <ToasterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "실제 애플리케이션에서의 토스트 사용 예시입니다. 각 버튼을 클릭해보세요.",
      },
    },
  },
};
