import { action } from "@storybook/addon-actions";

import ToggleInput from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/ToggleInput",
  component: ToggleInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
표시/숨김 토글 기능이 있는 입력 컴포넌트입니다.

**Props:**
- \`iconClassName\`: 아이콘 커스텀
- \`error\`: 에러 상태 여부
- \`disabled\`: 비활성화 상태
- \`placeholder\`
- \`onChange\`: 값 변경 핸들러

**기능:**
- 표시/숨김 토글 버튼
- 한글 입력 필터링 (IME 지원)
- 접근성 지원 (aria-label)

**사용 시나리오:**
- 로그인/회원가입 폼
- 비밀번호 변경
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
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
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
          <ToggleInput
            placeholder="비밀번호를 입력해보세요"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "상호작용할 수 있는 인터랙티브 필드입니다. Actions 패널에서 이벤트를 확인할 수 있습니다.",
      },
    },
  },
};

export const States: Story = {
  args: {
    placeholder: "비밀번호를 입력하세요",
    error: true,
    defaultValue: "123",
  },
  parameters: {
    docs: {
      description: {
        story: "정상, 에러, 비활성화 상태를 지원합니다.",
      },
    },
  },
};
