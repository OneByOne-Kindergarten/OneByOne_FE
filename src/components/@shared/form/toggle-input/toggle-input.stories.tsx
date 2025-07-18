import { action } from "@storybook/addon-actions";

import ToggleInput from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/ToggleInput",
  component: ToggleInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
비밀번호 표시/숨김 토글 기능이 있는 입력 컴포넌트입니다.

**Props:**
- \`iconClassName\`: 아이콘 커스텀 클래스
- \`error\`: 에러 상태 여부
- \`disabled\`: 비활성화 상태
- \`placeholder\`: 플레이스홀더 텍스트
- \`onChange\`: 값 변경 핸들러

**특징:**
- 비밀번호 표시/숨김 토글 버튼
- 한글 입력 필터링 (IME 지원)
- 에러 상태 스타일링
- 접근성 지원 (aria-label)

**사용 시나리오:**
- 로그인 폼
- 회원가입 폼
- 비밀번호 변경
- 보안 설정
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
      description: "에러 상태",
      control: "boolean",
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
    },
    placeholder: {
      description: "플레이스홀더 텍스트",
      control: "text",
    },
    iconClassName: {
      description: "아이콘 커스텀 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof ToggleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "비밀번호를 입력하세요",
    error: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 비밀번호 입력 필드입니다. 눈 아이콘을 클릭하여 비밀번호를 표시하거나 숨길 수 있습니다.",
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "비밀번호를 입력하세요",
    defaultValue: "mypassword123",
    error: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "이미 입력된 비밀번호가 있는 상태입니다. 토글 버튼으로 비밀번호를 확인할 수 있습니다.",
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: "비밀번호를 입력하세요",
    error: true,
    defaultValue: "123",
  },
  parameters: {
    docs: {
      description: {
        story:
          "에러 상태의 비밀번호 입력 필드입니다. 빨간색 테두리로 표시됩니다.",
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    placeholder: "비활성화된 상태",
    disabled: true,
    defaultValue: "disabledpassword",
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화된 상태의 비밀번호 입력 필드입니다.",
      },
    },
  },
};

export const DifferentPlaceholders: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">로그인</h3>
        <ToggleInput placeholder="비밀번호" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">회원가입</h3>
        <ToggleInput placeholder="8자 이상 입력해주세요" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">비밀번호 확인</h3>
        <ToggleInput placeholder="비밀번호를 다시 입력하세요" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">현재 비밀번호</h3>
        <ToggleInput placeholder="현재 비밀번호를 입력하세요" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">새 비밀번호</h3>
        <ToggleInput placeholder="새 비밀번호를 입력하세요" />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "다양한 상황에서 사용되는 비밀번호 입력 필드들입니다.",
      },
    },
  },
};

export const WithCustomIconStyle: Story = {
  args: {
    placeholder: "커스텀 아이콘 스타일",
    iconClassName: "size-6 text-blue-500",
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 아이콘 스타일을 적용한 비밀번호 입력 필드입니다.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      action("값 변경")(e.target.value);
    };

    const handleFocus = () => {
      action("포커스")();
    };

    const handleBlur = () => {
      action("블러")();
    };

    return (
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold">
            Interactive Password Input
          </h3>
          <ToggleInput
            placeholder="비밀번호를 입력해보세요"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <p className="mt-1 text-xs text-gray-500">
            Actions 패널에서 이벤트를 확인할 수 있습니다
          </p>
        </div>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "실제로 입력하고 상호작용할 수 있는 인터랙티브 비밀번호 입력 필드입니다.",
      },
    },
  },
};

export const ValidationExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">로그인 폼</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <ToggleInput placeholder="비밀번호를 입력하세요" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">회원가입 폼</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              비밀번호 *
            </label>
            <ToggleInput
              placeholder="8자 이상, 영문/숫자/특수문자 포함"
              defaultValue="weak123"
              error
            />
            <p className="mt-1 text-xs text-red-600">
              비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야
              합니다
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              비밀번호 확인 *
            </label>
            <ToggleInput
              placeholder="비밀번호를 다시 입력하세요"
              defaultValue="different123"
              error
            />
            <p className="mt-1 text-xs text-red-600">
              비밀번호가 일치하지 않습니다
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">비밀번호 변경 폼</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              현재 비밀번호
            </label>
            <ToggleInput
              placeholder="현재 비밀번호를 입력하세요"
              defaultValue="currentpass"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              새 비밀번호
            </label>
            <ToggleInput
              placeholder="새 비밀번호를 입력하세요"
              defaultValue="StrongP@ssw0rd!"
            />
            <p className="mt-1 text-xs text-green-600">
              ✓ 강력한 비밀번호입니다
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              새 비밀번호 확인
            </label>
            <ToggleInput
              placeholder="새 비밀번호를 다시 입력하세요"
              defaultValue="StrongP@ssw0rd!"
            />
            <p className="mt-1 text-xs text-green-600">
              ✓ 비밀번호가 일치합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "실제 폼에서 사용되는 다양한 비밀번호 입력 시나리오와 유효성 검사 예시입니다.",
      },
    },
  },
};
