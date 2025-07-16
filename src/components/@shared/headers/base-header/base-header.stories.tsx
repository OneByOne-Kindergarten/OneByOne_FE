import { fn } from "@storybook/test";
import { BrowserRouter } from "react-router-dom";

import Header from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/BaseHeader",
  component: Header,
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
기본 헤더 컴포넌트입니다. 다양한 형태의 헤더를 구성할 수 있습니다.

**주요 특징:**
- 뒤로가기 버튼 지원
- 제목, 로고, 커스텀 타이틀 요소 지원
- 알림 버튼 및 추가 액션 버튼 지원
- 경계선(border) 표시 옵션
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

// 기본 헤더 (로고만)
export const Default: Story = {
  args: {
    headerLogo: true,
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "로고만 표시되는 기본 형태의 헤더입니다. 홈페이지나 메인 페이지에서 사용됩니다.",
      },
    },
  },
};

// 제목이 있는 헤더
export const WithTitle: Story = {
  args: {
    title: "프로필 설정",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "제목과 뒤로가기 버튼이 있는 헤더입니다. 상세 페이지나 설정 페이지에서 사용됩니다.",
      },
    },
  },
};

// 알림 버튼이 있는 헤더
export const WithAlarmButton: Story = {
  args: {
    headerLogo: true,
    showAlarmButton: true,
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "로고와 알림 버튼이 함께 표시되는 헤더입니다. 메인 페이지에서 사용됩니다.",
      },
    },
  },
};

// 커스텀 타이틀 요소가 있는 헤더
export const WithCustomTitleElement: Story = {
  args: {
    titleElement: (
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">유치원 검색</span>
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
        story:
          "커스텀 타이틀 요소를 사용하는 헤더입니다. 검색 결과나 복잡한 제목 구성이 필요한 경우 사용됩니다.",
      },
    },
  },
};

// 경계선이 없는 헤더
export const WithoutBorder: Story = {
  args: {
    title: "설정",
    hasBackButton: true,
    hasBorder: false,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "하단 경계선이 없는 헤더입니다. 시각적으로 더 간결한 표현이 필요한 경우 사용됩니다.",
      },
    },
  },
};

// 액션 버튼이 있는 헤더
export const WithActionButtons: Story = {
  args: {
    title: "게시글 작성",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    children: (
      <div className="flex gap-2">
        <button className="text-sm text-primary">임시저장</button>
        <button className="text-sm font-semibold text-secondary-main">
          완료
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "추가 액션 버튼들이 포함된 헤더입니다. 게시글 작성이나 편집 페이지에서 사용됩니다.",
      },
    },
  },
};

// 모든 옵션이 포함된 헤더
export const FullFeatured: Story = {
  args: {
    title: "커뮤니티",
    hasBackButton: true,
    showAlarmButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    children: <button className="text-sm text-primary">편집</button>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 기능이 포함된 헤더입니다. 복잡한 페이지 구성이 필요한 경우의 예시입니다.",
      },
    },
  },
};
