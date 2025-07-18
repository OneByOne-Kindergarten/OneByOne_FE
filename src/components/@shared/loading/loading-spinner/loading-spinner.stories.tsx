import LoadingSpinner from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Feedback/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    docs: {
      description: {
        component: "그라데이션 스타일이 적용된 로딩 스피너 컴포넌트입니다.",
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
        story: "화면 전체 높이를 차지하여 전체 페이지 로딩에 사용됩니다.",
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
        story:
          "Y축 padding 54px 값을 차지하여 섹션 내에서 특정 요소를 로딩할 때 사용됩니다.",
      },
    },
  },
};
