import { fn } from "@storybook/test";
import { BrowserRouter } from "react-router-dom";

import SaveHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/SaveHeader",
  component: SaveHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
저장 기능이 포함된 헤더 컴포넌트입니다. BaseHeader를 확장하여 "저장하기" 버튼을 추가했습니다.

**사용 시나리오:**
- 프로필 편집 페이지
- 설정 변경 페이지
- 글 작성/수정 페이지

**주요 특징:**
- BaseHeader의 모든 기능 포함
- 저장하기 버튼 자동 포함
- 저장 액션 콜백 지원
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

// 프로필 편집
export const ProfileEdit: Story = {
  args: {
    title: "프로필 편집",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    onSave: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "프로필 편집 페이지에서 사용되는 저장 헤더입니다.",
      },
    },
  },
};

// 설정 변경
export const SettingsEdit: Story = {
  args: {
    title: "알림 설정",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    onSave: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "설정 변경 페이지에서 사용되는 저장 헤더입니다.",
      },
    },
  },
};

// 경계선 없는 버전
export const WithoutBorder: Story = {
  args: {
    title: "즐겨찾기 편집",
    hasBackButton: true,
    hasBorder: false,
    onBackButtonClick: fn(),
    onSave: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "하단 경계선이 없는 저장 헤더입니다.",
      },
    },
  },
};

// 뒤로가기 버튼 없는 버전
export const WithoutBackButton: Story = {
  args: {
    title: "초기 설정",
    hasBackButton: false,
    hasBorder: true,
    onSave: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "뒤로가기 버튼이 없는 저장 헤더입니다. 초기 설정이나 필수 입력 페이지에서 사용됩니다.",
      },
    },
  },
};
