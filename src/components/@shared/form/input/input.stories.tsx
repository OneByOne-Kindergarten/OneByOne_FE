import { action } from "@storybook/addon-actions";

import Input from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
다양한 스타일과 크기를 지원하는 입력 컴포넌트입니다.

**Props:**
- \`variant\`: 스타일 (default, outline)
- \`font\`: 폰트 크기 (xs, sm, md, lg + semibold 옵션)
- \`inputSize\`: 입력 필드 크기 (default, sm, xs)
- \`error\`: 에러 상태 여부
- \`disabled\`: 비활성화 상태

**사용 시나리오:**
- 닉네임/비밀번호 입력 필드
- 검색 필드
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
    variant: {
      description: "입력 필드 스타일",
      control: { type: "select" },
      options: ["default", "outline"],
    },
    font: {
      description: "폰트 크기 및 굵기",
      control: { type: "select" },
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
    },
    inputSize: {
      description: "입력 필드 크기",
      control: { type: "select" },
      options: ["default", "sm", "xs"],
    },
    error: {
      description: "에러 상태",
      control: "boolean",
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

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
          <Input
            placeholder="입력해보세요"
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
          "상호작용할 수 있는 인터랙티브 입력 필드입니다. Actions 패널에서 이벤트를 확인할 수 있습니다.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Default Variant</h3>
        <Input placeholder="기본 스타일" variant="default" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Outline Variant</h3>
        <Input placeholder="아웃라인 스타일" variant="outline" />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "outline, default 스타일을 지원합니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Default Size</h3>
        <Input placeholder="기본 크기" inputSize="default" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Small Size</h3>
        <Input placeholder="작은 크기" inputSize="sm" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Extra Small Size</h3>
        <Input placeholder="아주 작은 크기" inputSize="xs" />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "default, sm, xs 크기를 지원합니다.",
      },
    },
  },
};

export const FontSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Extra Small</h3>
        <Input placeholder="Extra Small 폰트" font="xs" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Small</h3>
        <Input placeholder="Small 폰트" font="sm" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Medium</h3>
        <Input placeholder="Medium 폰트" font="md" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Large</h3>
        <Input placeholder="Large 폰트" font="lg" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Semibold Variations</h3>
        <div className="space-y-2">
          <Input placeholder="Small Semibold" font="sm_sb" />
          <Input placeholder="Medium Semibold" font="md_sb" />
        </div>
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "xs, sm, md, lg 폰트 크기와 굵기 옵션을 지원합니다.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Normal State</h3>
        <Input placeholder="정상 상태" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Error State</h3>
        <Input placeholder="에러 상태" error />
        <p className="mt-1 text-xs text-red-600">이 필드는 필수입니다</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Disabled State</h3>
        <Input placeholder="비활성화 상태" disabled />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">With Value</h3>
        <Input defaultValue="입력된 텍스트" />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "정상, 에러, 비활성화 상태를 지원합니다.",
      },
    },
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Text Input</h3>
        <Input type="text" placeholder="일반 텍스트" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Email Input</h3>
        <Input type="email" placeholder="이메일 주소" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Password Input</h3>
        <Input type="password" placeholder="비밀번호" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Number Input</h3>
        <Input type="number" placeholder="숫자만 입력" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Tel Input</h3>
        <Input type="tel" placeholder="전화번호" />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "text, email, password, number, tel 타입을 지원합니다.",
      },
    },
  },
};
