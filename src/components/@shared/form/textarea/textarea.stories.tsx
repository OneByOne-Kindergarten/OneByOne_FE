import { action } from "@storybook/addon-actions";

import Textarea from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
고정 높이 또는 자동 확장을 지원하는 텍스트 입력 컴포넌트입니다.

**Props:**
- \`font\`: 폰트 크기 (xs, sm, md, lg + semibold 옵션)
- \`padding\`: default, sm, xs
- \`size\`: 높이 설정 (fixed, auto)
- \`error\`: 에러 상태 여부
- \`disabled\`: 비활성화 상태
- \`placeholder\`

**기능:**
- 고정 높이 또는 자동 확장 지원

**사용 시나리오:**
- 리뷰 작성
- 댓글 입력
- 긴 텍스트 입력
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
    font: {
      description: "폰트 크기 및 굵기",
      control: { type: "select" },
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
    },
    padding: {
      description: "패딩 크기",
      control: { type: "select" },
      options: ["default", "sm", "xs"],
    },
    size: {
      description: "높이 설정",
      control: { type: "select" },
      options: ["fixed", "auto"],
    },
    error: {
      description: "에러 상태",
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <Textarea
            placeholder="입력해보세요"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            size="auto"
          />
        </div>
      </div>
    );
  },
  args: {
    placeholder: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "상호작용할 수 있는 인터랙티브 텍스트 영역입니다.  Actions 패널에서 이벤트를 확인할 수 있습니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Fixed Size (default)</h3>
        <Textarea placeholder="고정 높이 텍스트 영역" size="fixed" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Auto Expand</h3>
        <Textarea
          placeholder="포커스 시 확장되는 텍스트 영역 - 클릭해보세요!"
          size="auto"
        />
      </div>
    </div>
  ),
  args: {
    placeholder: "",
  },
  parameters: {
    docs: {
      description: {
        story: "고정 높이와 자동 확장 텍스트 영역을 비교합니다.",
      },
    },
  },
};

export const Paddings: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Default Padding</h3>
        <Textarea placeholder="기본 패딩" padding="default" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Small Padding</h3>
        <Textarea placeholder="작은 패딩" padding="sm" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Extra Small Padding</h3>
        <Textarea placeholder="아주 작은 패딩" padding="xs" size="auto" />
      </div>
    </div>
  ),
  args: {
    placeholder: "",
  },
  parameters: {
    docs: {
      description: {
        story: "default, sm, xs 패딩 크기를 지원합니다.",
      },
    },
  },
};

export const Fonts: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Extra Small</h3>
        <Textarea placeholder="Extra Small 폰트" font="xs" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Small</h3>
        <Textarea placeholder="Small 폰트" font="sm" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Medium</h3>
        <Textarea placeholder="Medium 폰트" font="md" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Large</h3>
        <Textarea placeholder="Large 폰트" font="lg" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Semibold Variations</h3>
        <div className="space-y-2">
          <Textarea placeholder="Small Semibold" font="sm_sb" size="auto" />
          <Textarea placeholder="Medium Semibold" font="md_sb" size="auto" />
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: "",
  },
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
        <Textarea placeholder="정상 상태" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Error State</h3>
        <Textarea placeholder="에러 상태" error size="auto" />
        <p className="mt-1 text-xs text-red-600">내용을 입력해주세요</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Disabled State</h3>
        <Textarea placeholder="비활성화 상태" disabled size="auto" />
      </div>
    </div>
  ),
  args: {
    placeholder: "",
  },
  parameters: {
    docs: {
      description: {
        story: "정상, 에러, 비활성화 상태를 지원합니다.",
      },
    },
  },
};
