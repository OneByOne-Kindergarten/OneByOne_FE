import Error from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Feedback/Error",
  component: Error,
  parameters: {
    docs: {
      description: {
        component: "에러 상태를 표시하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageType: Story = {
  args: {
    children: "페이지를 찾을 수 없습니다.",
    type: "page",
  },
  parameters: {
    docs: {
      description: {
        story:
          "화면 전체 높이를 차지하여 전체 페이지의 에러 상태를 표시합니다.",
      },
    },
  },
};

export const ElementType: Story = {
  args: {
    children: "데이터를 불러오는데 실패했습니다.",
    type: "element",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Y축 padding 54px 값을 차지하여 섹션 내에서 특정 요소의 에러 상태를 표시합니다.",
      },
    },
  },
};
