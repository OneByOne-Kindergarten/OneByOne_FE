import { action } from "@storybook/addon-actions";

import Textarea from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
다양한 스타일과 크기를 지원하는 텍스트 영역 컴포넌트입니다.

**Props:**
- \`font\`: 폰트 크기 (xs, sm, md, lg + semibold 옵션)
- \`padding\`: 패딩 크기 (default, sm, xs)
- \`size\`: 높이 설정 (fixed, auto)
- \`error\`: 에러 상태 여부
- \`disabled\`: 비활성화 상태

**특징:**
- 고정 높이 또는 자동 확장 지원
- 다양한 폰트 크기와 패딩 옵션
- 에러 상태 스타일링
- 반응형 디자인

**사용 시나리오:**
- 리뷰 작성
- 댓글 입력
- 자기소개 작성
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
      description: "비활성화 상태",
      control: "boolean",
    },
    placeholder: {
      description: "플레이스홀더 텍스트",
      control: "text",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요",
    font: "sm_sb",
    padding: "default",
    size: "fixed",
    error: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 텍스트 영역입니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Fixed Size (기본)</h3>
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

export const PaddingSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Default Padding</h3>
        <Textarea placeholder="기본 패딩" padding="default" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Small Padding</h3>
        <Textarea placeholder="작은 패딩" padding="sm" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Extra Small Padding</h3>
        <Textarea placeholder="아주 작은 패딩" padding="xs" />
      </div>
    </div>
  ),
  args: {
    placeholder: "",
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 패딩 크기를 보여줍니다.",
      },
    },
  },
};

export const FontSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Extra Small</h3>
        <Textarea placeholder="Extra Small 폰트" font="xs" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Small</h3>
        <Textarea placeholder="Small 폰트" font="sm" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Medium</h3>
        <Textarea placeholder="Medium 폰트" font="md" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Large</h3>
        <Textarea placeholder="Large 폰트" font="lg" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Semibold Variations</h3>
        <div className="space-y-2">
          <Textarea placeholder="Small Semibold" font="sm_sb" />
          <Textarea placeholder="Medium Semibold" font="md_sb" />
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
        story: "다양한 폰트 크기와 굵기 옵션을 보여줍니다.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Normal State</h3>
        <Textarea placeholder="정상 상태" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Error State</h3>
        <Textarea placeholder="에러 상태" error />
        <p className="mt-1 text-xs text-red-600">내용을 입력해주세요</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Disabled State</h3>
        <Textarea placeholder="비활성화 상태" disabled />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">With Content</h3>
        <Textarea defaultValue="이미 입력된 텍스트가 있는 상태입니다. 여러 줄에 걸쳐 내용이 작성되어 있을 때의 모습을 확인할 수 있습니다." />
      </div>
    </div>
  ),
  args: {
    placeholder: "",
  },
  parameters: {
    docs: {
      description: {
        story: "텍스트 영역의 다양한 상태를 보여줍니다.",
      },
    },
  },
};

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
          <h3 className="mb-2 text-sm font-semibold">Interactive Textarea</h3>
          <Textarea
            placeholder="입력해보세요"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            size="auto"
          />
          <p className="mt-1 text-xs text-gray-500">
            Actions 패널에서 이벤트를 확인할 수 있습니다
          </p>
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
          "실제로 입력하고 상호작용할 수 있는 인터랙티브 텍스트 영역입니다.",
      },
    },
  },
};

export const UseCaseExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">리뷰 작성</h3>
        <div className="space-y-3">
          <Textarea
            placeholder="유치원에서의 경험을 자세히 들려주세요"
            size="fixed"
            font="sm_sb"
          />
          <p className="text-xs text-gray-500">최소 50자 이상 작성해주세요</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">댓글 입력</h3>
        <Textarea
          placeholder="댓글을 입력하세요"
          size="auto"
          padding="sm"
          font="sm"
        />
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">자기소개</h3>
        <Textarea
          placeholder="자신을 소개해주세요"
          size="fixed"
          font="md"
          padding="default"
        />
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">문의사항</h3>
        <Textarea
          placeholder="문의하실 내용을 상세히 적어주세요"
          size="fixed"
          font="sm_sb"
          error={false}
        />
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">간단한 메모</h3>
        <Textarea
          placeholder="간단한 메모를 적어보세요"
          size="auto"
          padding="xs"
          font="xs"
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
        story: "실제 서비스에서 사용되는 다양한 텍스트 영역 사용 사례입니다.",
      },
    },
  },
};
