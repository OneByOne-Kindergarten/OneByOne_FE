import ErrorMessage from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
폼 유효성 검사 시 에러 메시지를 표시하는 컴포넌트입니다.

**Props:**
- \`error\`: 표시할 에러 메시지 텍스트

**특징:**
- 중앙 정렬된 에러 메시지
- 일관된 스타일링 (빨간색, 작은 폰트)
- 폼 유효성 검사 결과 표시에 최적화

**사용 시나리오:**
- 폼 유효성 검사 실패
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md space-y-2 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    error: {
      description: "에러 메시지 텍스트",
      control: "text",
    },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: "이 필드는 필수입니다",
  },
};

export const LongErrorMessage: Story = {
  args: {
    error:
      "입력하신 정보에 문제가 있습니다. 이메일 형식을 확인하시고, 비밀번호는 8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.",
  },
  parameters: {
    docs: {
      description: {
        story: "긴 문자열이 어떻게 표시되는지 보여줍니다.",
      },
    },
  },
};

export const UserScenario: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="mb-4 text-sm font-semibold">폼과 함께 사용하는 예시</h3>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">이메일</label>
        <input
          type="email"
          className="w-full rounded-md border border-red-500 px-3 py-2"
          placeholder="이메일 주소"
          defaultValue="invalid-email"
        />
        <ErrorMessage error="올바른 이메일 형식을 입력해주세요" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">비밀번호</label>
        <input
          type="password"
          className="w-full rounded-md border border-red-500 px-3 py-2"
          placeholder="비밀번호"
          defaultValue="123"
        />
        <ErrorMessage error="비밀번호는 8자 이상이어야 합니다" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">닉네임</label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="닉네임"
          defaultValue="올바른닉네임"
        />
        <p className="text-xs text-gray-500">에러가 없는 정상 상태</p>
      </div>
    </div>
  ),
  args: {
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story: "ErrorMessage 사용 예시입니다.",
      },
    },
  },
};
