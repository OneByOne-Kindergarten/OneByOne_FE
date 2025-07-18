import { fn } from "@storybook/test";

import SaveHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/SaveHeader",
  component: SaveHeader,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
BaseHeader에서 게시글 저장 기능이 추가된 헤더입니다.

**기능:**
- BaseHeader의 모든 기능 포함
- 임시저장 버튼 포함

**사용 시나리오:**
- 게시글 작성 페이지
- 리뷰 작성 페이지
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: "헤더에 표시될 제목",
      control: "text",
    },
    hasBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
    },
    onBackButtonClick: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "back clicked",
    },
    onSave: {
      description: "저장 버튼 클릭 핸들러",
      action: "save clicked",
    },
  },
} satisfies Meta<typeof SaveHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "타이틀",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    onSave: fn(),
  },
};

export const PostEdit: Story = {
  args: {
    title: "게시글 작성",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    onSave: fn(),
  },
};

export const ReviewEdit: Story = {
  args: {
    title: "리뷰 작성",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    onSave: fn(),
  },
};
