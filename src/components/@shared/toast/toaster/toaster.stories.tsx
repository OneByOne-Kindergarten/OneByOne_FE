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
        component: "토스트 메시지들을 관리하고 표시하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Interaction: Story = {
  render: () => <ToasterDemo />,
  parameters: {
    docs: {
      description: {
        story: "버튼을 클릭하여 토스트의 인터렉션을 확인할 수 있습니다.",
      },
    },
  },
};

// 개별 토스트 타입 스토리들
export const SuccessToast: Story = {
  render: () => (
    <StaticToastContainer>
      <StaticToast title="성공" description="완료된 작업을 확인해보세요." />
    </StaticToastContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "성공 상태를 나타내는 토스트입니다. 체크 아이콘과 함께 표시됩니다.",
      },
    },
  },
};

export const ErrorToast: Story = {
  render: () => (
    <StaticToastContainer>
      <StaticToast
        title="오류"
        description="잠시 후 다시 시도해주세요."
        variant="destructive"
      />
    </StaticToastContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "오류 상태를 나타내는 토스트입니다. 에러 아이콘과 함께 표시됩니다.",
      },
    },
  },
};

export const ActionToast: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          "액션 버튼이 포함된 토스트입니다. 사용자가 추가 작업을 수행할 수 있습니다.",
      },
    },
  },
};

export const TitleOnlyToast: Story = {
  render: () => (
    <StaticToastContainer>
      <StaticToast title="북마크 추가 완료" />
    </StaticToastContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "제목만 있는 간단한 토스트입니다. 짧은 알림에 적합합니다.",
      },
    },
  },
};
