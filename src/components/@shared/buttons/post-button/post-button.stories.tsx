import { fn } from "@storybook/test";

import PostButton from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Buttons/PostButton",
  component: PostButton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
FloatButton 컴포넌트를 기반으로 한 플로팅 액션 버튼입니다. 


**기능:**
- 비활성화/활성화 상태 지원
- 클릭 시 경로 이동

**사용 시나리오:**
- 커뮤니티 페이지
- 리뷰 작성 페이지
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-48 w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      description: "버튼에 표시될 텍스트",
      control: "text",
    },
    isDisabled: {
      description: "버튼 비활성화 상태",
      control: "boolean",
    },
    onClick: {
      description: "클릭 이벤트 핸들러",
      action: "clicked",
    },
  },
} satisfies Meta<typeof PostButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "글쓰기",
    isDisabled: false,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    label: "글쓰기",
    isDisabled: true,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "권한이 없는 상태에서 비활성화된 버튼입니다.",
      },
    },
  },
};
