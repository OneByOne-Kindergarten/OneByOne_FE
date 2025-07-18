import { fn } from "@storybook/test";

import SchoolHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/SchoolHeader",
  component: SchoolHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
BaseHeader에서 유치원 검색, 즐겨찾기 기능이 추가된 헤더입니다.

**기능:**
- BaseHeader의 모든 기능 포함
- 유치원 검색 버튼 포함
- 즐겨찾기 토글 인터페이스 포함

**사용 시나리오:**
- 주변 유치원 목록 페이지 (즐겨찾기 토글 미표시)
- 유치원 검색 페이지 (즐겨찾기 토글 미표시)
- 유치원 상세 페이지
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
    showBookmark: {
      description: "즐겨찾기 버튼 표시 여부",
      control: "boolean",
    },
    kindergartenId: {
      description: "유치원 ID (즐겨찾기 기능용)",
      control: "text",
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
} satisfies Meta<typeof SchoolHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerLogo: true,
    showBookmark: false,
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 찾기 페이지 헤더입니다. 유치원 검색이 가능합니다.",
      },
    },
  },
};

export const SchoolDetail: Story = {
  args: {
    title: "서울유치원",
    hasBackButton: true,
    showBookmark: true,
    kindergartenId: "123",
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "유치원 상세 페이지의 헤더입니다. 즐겨찾기 추가/제거, 유치원 검색이 가능합니다.",
      },
    },
  },
};
