import { action } from "@storybook/addon-actions";

import SearchInput from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
검색 기능이 내장된 입력 컴포넌트입니다. 

React Hook Form과 통합되어 있습니다.

**Props:**
- \`placeholder\`: 플레이스홀더 텍스트
- \`initialValue\`: 초기값
- \`onSubmit\`: 검색 제출 핸들러 (필수)
- \`onClear\`: 검색어 클리어 핸들러
- \`autoFocus\`: 자동 포커스 여부

**기능:**
- 내장된 검색/클리어 아이콘
- React Hook Form 통합
- 자동 포커스 지원
- 검색어 입력 시 실시간 클리어 버튼 표시

**사용 시나리오:**
- 유치원 검색
- 게시글 검색
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md space-y-2 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: {
      control: "text",
    },
    initialValue: {
      description: "초기 검색어",
      control: "text",
    },
    autoFocus: {
      description: "자동 포커스",
      control: "boolean",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    initialValue: "",
    autoFocus: false,
    onSubmit: action("검색 제출"),
    onClear: action("검색어 클리어"),
  },
};

export const InitialValue: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    initialValue: "유치원",
    autoFocus: false,
    onSubmit: action("검색 제출"),
    onClear: action("검색어 클리어"),
  },
  parameters: {
    docs: {
      description: {
        story: "초기 검색어가 설정된 상태입니다.",
      },
    },
  },
};

export const AutoFocus: Story = {
  args: {
    placeholder: "자동으로 포커스됩니다",
    initialValue: "",
    autoFocus: true,
    onSubmit: action("검색 제출"),
    onClear: action("검색어 클리어"),
  },
  parameters: {
    docs: {
      description: {
        story: "페이지 로드 시 자동으로 포커스되는 검색 필드입니다.",
      },
    },
  },
};

export const UserScenario: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <SearchInput
          placeholder="유치원 이름으로 검색해보세요"
          onSubmit={action("유치원 검색")}
          onClear={action("유치원 검색어 클리어")}
        />
      </div>

      <div>
        <SearchInput
          placeholder="게시물 제목으로 검색해보세요"
          onSubmit={action("게시글 검색")}
          onClear={action("게시글 검색어 클리어")}
        />
      </div>
    </div>
  ),
  args: {
    onSubmit: action("검색"),
  },
  parameters: {
    docs: {
      description: {
        story: "게시글 검색, 유치원 검색 사용 예시입니다.",
      },
    },
  },
};
