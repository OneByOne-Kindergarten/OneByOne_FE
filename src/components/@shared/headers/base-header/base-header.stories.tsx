import { fn } from "@storybook/test";

import Header from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/BaseHeader",
  component: Header,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
기본 헤더 컴포넌트입니다. 다양한 형태의 헤더를 구성할 수 있습니다.

**기능:**
- 뒤로가기 버튼 지원
- 제목, 로고, 커스텀 타이틀 요소 지원
- 알림 버튼 및 추가 액션 버튼 지원
- 경계선(border) 표시 옵션

**단독 사용 시나리오:**
- 홈페이지
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
    showAlarmButton: {
      description: "알림 버튼 표시 여부",
      control: "boolean",
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
    },
    onBackButtonClick: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "clicked",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerLogo: true,
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story: "로고만 표시되는 기본 형태의 헤더",
      },
    },
  },
};

export const WithoutBorder: Story = {
  args: {
    title: "타이틀",
    hasBackButton: true,
    hasBorder: false,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "하단 경계선이 없는 헤더",
      },
    },
  },
};

export const WithoutBackButton: Story = {
  args: {
    title: "타이틀",
    hasBackButton: false,
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story: "뒤로가기 버튼이 없는 헤더",
      },
    },
  },
};

export const WithAction: Story = {
  args: {
    title: "게시글 작성",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    children: (
      <div className="flex gap-2">
        <button className="text-sm text-primary">임시저장</button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "추가 액션 버튼이 포함된 헤더",
      },
    },
  },
};

export const WithCustom: Story = {
  args: {
    titleElement: (
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">게시글 검색</span>
        <span className="text-sm text-primary-normal03">(123개)</span>
      </div>
    ),
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 예시",
      },
    },
  },
};
