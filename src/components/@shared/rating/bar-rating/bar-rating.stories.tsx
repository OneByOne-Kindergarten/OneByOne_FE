import BarRating from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Rating/BarRating",
  component: BarRating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
바 형태의 컴포넌트입니다.

**기능:**
- HTML progress 요소 기반
- 커스텀 CSS 스타일링

**사용 시나리오:**
- 평점 표시
        `,
      },
    },
  },
  argTypes: {
    value: {
      description: "현재 값",
      control: { type: "range", min: 0, max: 5, step: 0.1 },
    },
    max: {
      description: "최댓값",
      control: { type: "number", min: 1, max: 10 },
    },
    className: {
      description: "추가 CSS 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof BarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3.5,
    max: 5,
  },
};

export const Values: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>매우 낮음</span>
          <span>0.5/5</span>
        </div>
        <BarRating value={0.5} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>낮음</span>
          <span>1.5/5</span>
        </div>
        <BarRating value={1.5} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>보통</span>
          <span>2.5/5</span>
        </div>
        <BarRating value={2.5} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>높음</span>
          <span>4.0/5</span>
        </div>
        <BarRating value={4.0} max={5} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>매우 높음</span>
          <span>5.0/5</span>
        </div>
        <BarRating value={5.0} max={5} />
      </div>
    </div>
  ),
  args: {
    value: 3.5,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "선택값과 최댓값에 따른 바의 표시 상태를 확인할 수 있습니다.",
      },
    },
  },
};

export const UserScenario: Story = {
  render: () => (
    <div className="w-96 space-y-6 rounded-lg border p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">서울유치원 리뷰 항목 평점</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>분위기</span>
              <span className="font-medium">4.5/5</span>
            </div>
            <BarRating value={4.5} max={5} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>워라밸</span>
              <span className="font-medium">4.2/5</span>
            </div>
            <BarRating value={4.2} max={5} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>관리자</span>
              <span className="font-medium">4.8/5</span>
            </div>
            <BarRating value={4.8} max={5} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>고객</span>
              <span className="font-medium">3.9/5</span>
            </div>
            <BarRating value={3.9} max={5} />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    value: 4.4,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 리뷰 평점 표시 시나리오에서의 사용 예시입니다.",
      },
    },
  },
};
