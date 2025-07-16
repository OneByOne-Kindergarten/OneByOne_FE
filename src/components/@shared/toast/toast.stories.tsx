import { useState } from "react";

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: "사용자에게 알림 메시지를 표시하는 토스트 컴포넌트입니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const SuccessToast = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-lg bg-primary-normal01 px-4 py-2 text-white"
      >
        성공 토스트 표시
      </button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>저장 완료</ToastTitle>
        <ToastDescription>
          변경사항이 성공적으로 저장되었습니다.
        </ToastDescription>
        <ToastClose />
      </Toast>
    </div>
  );
};

export const Success: Story = {
  render: () => <SuccessToast />,
  parameters: {
    docs: {
      description: {
        story: "성공 메시지를 표시하는 기본 토스트입니다.",
      },
    },
  },
};

const ErrorToast = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        에러 토스트 표시
      </button>
      <Toast open={open} onOpenChange={setOpen} variant="destructive">
        <ToastTitle variant="destructive">오류 발생</ToastTitle>
        <ToastDescription>
          파일 업로드에 실패했습니다. 다시 시도해주세요.
        </ToastDescription>
        <ToastClose />
      </Toast>
    </div>
  );
};

export const Error: Story = {
  render: () => <ErrorToast />,
  parameters: {
    docs: {
      description: {
        story: "에러 메시지를 표시하는 destructive 토스트입니다.",
      },
    },
  },
};

const ActionToast = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-lg bg-primary-normal01 px-4 py-2 text-white"
      >
        액션 토스트 표시
      </button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>알림</ToastTitle>
        <ToastDescription>새로운 댓글이 등록되었습니다.</ToastDescription>
        <ToastAction onClick={() => alert("확인됨")} altText="확인">
          확인
        </ToastAction>
        <ToastClose />
      </Toast>
    </div>
  );
};

export const WithAction: Story = {
  render: () => <ActionToast />,
  parameters: {
    docs: {
      description: {
        story: "사용자 액션 버튼이 포함된 토스트입니다.",
      },
    },
  },
};

const TitleOnlyToast = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-lg bg-primary-normal01 px-4 py-2 text-white"
      >
        간단한 토스트 표시
      </button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>북마크에 추가되었습니다</ToastTitle>
        <ToastClose />
      </Toast>
    </div>
  );
};

export const TitleOnly: Story = {
  render: () => <TitleOnlyToast />,
  parameters: {
    docs: {
      description: {
        story: "제목만 표시하는 토스트입니다.",
      },
    },
  },
};
