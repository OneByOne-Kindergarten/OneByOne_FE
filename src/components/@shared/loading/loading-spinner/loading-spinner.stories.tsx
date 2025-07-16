import LoadingSpinner from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feedback/Loading/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    docs: {
      description: {
        component: "그라데이션 효과가 적용된 로딩 스피너 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageLoading: Story = {
  args: {
    type: "page",
  },
  parameters: {
    docs: {
      description: {
        story:
          "전체 페이지 로딩에 사용되는 스피너입니다. 화면 전체 높이를 차지합니다.",
      },
    },
  },
};

export const ElementLoading: Story = {
  args: {
    type: "element",
  },
  parameters: {
    docs: {
      description: {
        story: "특정 요소나 섹션 내에서 사용되는 작은 로딩 스피너입니다.",
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    type: "element",
    className: "bg-gray-100 rounded-lg",
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 스타일링이 적용된 로딩 스피너입니다.",
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">데이터 로딩 중...</h3>
      <LoadingSpinner type="element" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "카드 컴포넌트 내에서 사용되는 로딩 스피너의 예시입니다.",
      },
    },
  },
};
