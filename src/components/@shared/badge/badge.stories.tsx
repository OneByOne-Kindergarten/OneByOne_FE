import Badge from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**사용 시나리오:**
- 유치원 설립 유형 라벨 
- 게시글 작성자 라벨
- 게시글 인기 순위 
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "배지의 스타일 변형",
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    children: {
      description: "배지에 표시될 텍스트",
      control: "text",
    },
    className: {
      description: "추가 CSS 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "기본",
    variant: "primary",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="tertiary">Tertiary</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "3가지 변형을 지원합니다.",
      },
    },
  },
};
