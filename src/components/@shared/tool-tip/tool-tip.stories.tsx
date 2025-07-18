import ToolTip from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/ToolTip",
  component: ToolTip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
물음표 아이콘 클릭 시 텍스트가 표시되는 컴포넌트입니다.

**기능:**
- 물음표 아이콘 클릭으로 토글
- 키보드 접근성 지원
- 자동 포커스 해제
- 반응형 텍스트

**사용 시나리오:**
- 도움말 정보 제공
- 추가 설명
- 용어 설명
        `,
      },
    },
  },
  argTypes: {
    children: {
      description: "툴팁에 표시될 텍스트",
      control: "text",
    },
  },
} satisfies Meta<typeof ToolTip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "기본 툴팁 메시지입니다.",
  },
};

export const UserScenario: Story = {
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">설립유형</span>
            <ToolTip>
              사립: 개인이 설립한 유치원, 공립: 국가나 지방자치단체가 설립한
              유치원
            </ToolTip>
          </div>
          <span className="text-gray-600">사립</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">정원</span>
            <ToolTip>해당 유치원에서 받을 수 있는 최대 원아 수입니다.</ToolTip>
          </div>
          <span className="text-gray-600">120명</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">현원</span>
            <ToolTip>
              현재 다니고 있는 원아 수입니다. 정원 대비 현원 비율로 경쟁률을
              파악할 수 있습니다.
            </ToolTip>
          </div>
          <span className="text-gray-600">105명</span>
        </div>
      </div>
    </div>
  ),
  args: {
    children: "기본 텍스트",
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 정보 페이지에서의 사용 예시입니다.",
      },
    },
  },
};
