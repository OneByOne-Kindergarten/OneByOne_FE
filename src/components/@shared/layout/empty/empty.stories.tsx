import Empty from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Empty",
  component: Empty,
  parameters: {
    docs: {
      description: {
        component: "데이터가 없거나 빈 상태를 표시하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ElementType: Story = {
  args: {
    title: "등록된 게시글이 없습니다",
    subTitle: "첫 번째 게시글을 작성해보세요!",
    type: "element",
  },
  parameters: {
    docs: {
      description: {
        story: "섹션 내에서 사용되는 빈 상태 컴포넌트입니다.",
      },
    },
  },
};

export const PageType: Story = {
  args: {
    title: "검색 결과가 없습니다",
    subTitle: "다른 키워드로 검색해보세요",
    type: "page",
  },
  parameters: {
    docs: {
      description: {
        story: "전체 페이지에서 사용되는 빈 상태 컴포넌트입니다.",
      },
    },
  },
};
