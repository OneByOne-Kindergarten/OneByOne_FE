import ErrorMessage from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
간단하고 일관된 에러 메시지를 표시하는 컴포넌트입니다.

**Props:**
- \`error\`: 표시할 에러 메시지 텍스트

**특징:**
- 중앙 정렬된 에러 메시지
- 일관된 스타일링 (빨간색, 작은 폰트)
- 폼 유효성 검사 결과 표시에 최적화

**사용 시나리오:**
- 폼 유효성 검사 실패
- 로그인/회원가입 오류
- 입력 값 검증 실패
- API 요청 오류 표시
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
  parameters: {
    docs: {
      description: {
        story: "기본 에러 메시지입니다.",
      },
    },
  },
};

export const CommonErrorMessages: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">필수 입력 에러</h3>
        <ErrorMessage error="이 필드는 필수입니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">이메일 형식 에러</h3>
        <ErrorMessage error="올바른 이메일 형식을 입력해주세요" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">비밀번호 길이 에러</h3>
        <ErrorMessage error="비밀번호는 8자 이상이어야 합니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">비밀번호 불일치 에러</h3>
        <ErrorMessage error="비밀번호가 일치하지 않습니다" />
      </div>
    </div>
  ),
  args: {
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story: "자주 사용되는 에러 메시지들입니다.",
      },
    },
  },
};

export const ValidationErrors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">최소 길이 검증</h3>
        <ErrorMessage error="닉네임은 2자 이상이어야 합니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">최대 길이 검증</h3>
        <ErrorMessage error="내용은 500자를 초과할 수 없습니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">특수문자 검증</h3>
        <ErrorMessage error="특수문자는 사용할 수 없습니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">숫자 형식 검증</h3>
        <ErrorMessage error="올바른 전화번호 형식을 입력해주세요" />
      </div>
    </div>
  ),
  args: {
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 유효성 검사 실패 메시지들입니다.",
      },
    },
  },
};

export const ServerErrors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">중복 확인 에러</h3>
        <ErrorMessage error="이미 사용 중인 이메일입니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">인증 실패</h3>
        <ErrorMessage error="이메일 또는 비밀번호가 올바르지 않습니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">권한 에러</h3>
        <ErrorMessage error="접근 권한이 없습니다" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">서버 에러</h3>
        <ErrorMessage error="서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요" />
      </div>
    </div>
  ),
  args: {
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story: "서버에서 발생하는 에러 메시지들입니다.",
      },
    },
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
        story: "긴 에러 메시지가 어떻게 표시되는지 보여줍니다.",
      },
    },
  },
};

export const WithFormExample: Story = {
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
        story:
          "실제 폼에서 ErrorMessage가 어떻게 사용되는지 보여주는 예시입니다.",
      },
    },
  },
};
