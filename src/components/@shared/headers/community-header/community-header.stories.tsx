import CommunityHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/CommunityHeader",
  component: CommunityHeader,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
BaseHeader에서 게시글 검색 기능이 추가된 헤더입니다.

**기능:**
- BaseHeader의 모든 기능 포함
- 검색 버튼 포함

**사용 시나리오:**
- 커뮤니티 게시글 목록 페이지
- 커뮤니티 게시글 페이지
- 게시글 검색 페이지
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: "헤더에 표시될 제목",
      control: "text",
    },
    headerLogo: {
      description: "원바원 로고 표시 여부",
      control: "boolean",
    },
    hasBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
    },
    hasWriteButton: {
      description: "글쓰기 버튼 표시 여부",
      control: "boolean",
    },
    category: {
      description: "커뮤니티 카테고리",
      options: ["TEACHER", "PROSPECTIVE_TEACHER"],
      control: { type: "select" },
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
    },
    onBackButtonClick: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "back clicked",
    },
  },
} satisfies Meta<typeof CommunityHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerLogo: true,
    category: "TEACHER",
    hasBorder: true,
  },
};

export const Post: Story = {
  args: {
    headerLogo: true,
    hasBackButton: true,
    title: "게시글 제목",
    category: "TEACHER",
    hasBorder: true,
  },
};
