import Empty from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Feedback/Empty",
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

export const PageType: Story = {
  args: {
    title: "검색 결과가 없습니다",
    subTitle: "다른 키워드로 검색해보세요",
    type: "page",
  },
  parameters: {
    docs: {
      description: {
        story: "화면 전체 높이를 차지하여 전체 페이지가 빈 상태를 표시합니다.",
      },
    },
  },
};

export const ElementType: Story = {
  args: {
    title: "등록된 댓글이 없습니다",
    subTitle: "첫 번째 댓글을 남겨해보세요!",
    type: "element",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Y축 padding 54px 값을 차지하여 섹션 내에서 특정 요소의 빈 상태를 표시합니다.",
      },
    },
  },
};
