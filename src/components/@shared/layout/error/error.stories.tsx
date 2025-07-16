import Error from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Error",
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

export const ElementType: Story = {
  args: {
    children: "데이터를 불러오는데 실패했습니다.",
    type: "element",
  },
  parameters: {
    docs: {
      description: {
        story: "섹션 내에서 사용되는 에러 상태 컴포넌트입니다.",
      },
    },
  },
};

export const PageType: Story = {
  args: {
    children: "페이지를 찾을 수 없습니다.",
    type: "page",
  },
  parameters: {
    docs: {
      description: {
        story: "전체 페이지에서 사용되는 에러 상태 컴포넌트입니다.",
      },
    },
  },
};
