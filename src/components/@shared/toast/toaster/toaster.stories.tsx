import { useToast } from "@/hooks/useToast";

import { Toaster } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feedback/Toast/Toaster",
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component:
          "토스트 메시지들을 관리하고 표시하는 컨테이너 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToasterDemo = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "성공!",
      description: "작업이 완료되었습니다.",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "오류 발생",
      description: "문제가 발생했습니다. 다시 시도해주세요.",
      variant: "destructive",
    });
  };

  const showActionToast = () => {
    toast({
      title: "새 메시지",
      description: "새로운 알림이 도착했습니다.",
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">토스트 테스트</h3>
      <div className="flex gap-4">
        <button
          onClick={showSuccessToast}
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          성공 토스트
        </button>
        <button
          onClick={showErrorToast}
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          에러 토스트
        </button>
        <button
          onClick={showActionToast}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          액션 토스트
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export const Default: Story = {
  render: () => <ToasterDemo />,
  parameters: {
    docs: {
      description: {
        story: "useToast 훅과 함께 사용되는 토스터의 기본 예시입니다.",
      },
    },
  },
};

const MultipleToastsDemo = () => {
  const { toast } = useToast();

  const showMultipleToasts = () => {
    toast({ title: "첫 번째 알림", description: "첫 번째 메시지입니다." });
    setTimeout(() => {
      toast({ title: "두 번째 알림", description: "두 번째 메시지입니다." });
    }, 500);
    setTimeout(() => {
      toast({
        title: "세 번째 알림",
        description: "세 번째 메시지입니다.",
        variant: "destructive",
      });
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={showMultipleToasts}
        className="rounded-lg bg-purple-500 px-4 py-2 text-white"
      >
        여러 토스트 연속 표시
      </button>
      <Toaster />
    </div>
  );
};

export const MultipleToasts: Story = {
  render: () => <MultipleToastsDemo />,
  parameters: {
    docs: {
      description: {
        story: "여러 토스트가 순차적으로 표시되는 예시입니다.",
      },
    },
  },
};
