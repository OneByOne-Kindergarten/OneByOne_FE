import { fn } from "@storybook/test";
import { useState } from "react";

import { BoxRatingGroup } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Rating/BoxRating",
  component: BoxRatingGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
박스 형태의 인터랙티브 컴포넌트입니다.

**구성 요소:**
- RatingBox: 개별 박스 컴포넌트
- BoxRatingGroup: 박스들을 그룹화한 평점 시스템

**기능:**
- 클릭 가능한 박스 컴포넌트
- 박스 개수 설정
- 박스 크기 설정 (xs, sm, md, lg)
- 박스 선택 상태에 따른 색상 변화
- 접근성 지원 (aria-label)

**사용 시나리오:**
- 평점 입력
- 평점 표시
        `,
      },
    },
  },
  argTypes: {
    value: {
      description: "현재 선택된 박스 개수",
      control: { type: "number", min: 0, max: 5 },
    },
    max: {
      description: "최대 박스 개수",
      control: { type: "number", min: 1, max: 10 },
    },
    size: {
      description: "박스 크기",
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    onChange: {
      description: "값 변경 이벤트 핸들러",
      action: "rating changed",
    },
  },
} satisfies Meta<typeof BoxRatingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    size: "md",
    onChange: fn(),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm text-gray-600">Extra Small (xs)</span>
        <BoxRatingGroup value={3} max={5} size="xs" />
      </div>

      <div className="space-y-2">
        <span className="text-sm text-gray-600">Small (sm)</span>
        <BoxRatingGroup value={3} max={5} size="sm" />
      </div>

      <div className="space-y-2">
        <span className="text-sm text-gray-600">Medium (md)</span>
        <BoxRatingGroup value={3} max={5} size="md" />
      </div>

      <div className="space-y-2">
        <span className="text-sm text-gray-600">Large (lg)</span>
        <BoxRatingGroup value={3} max={5} size="lg" />
      </div>
    </div>
  ),
  args: {
    value: 3,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "xs, sm, md, lg 크기를 지원합니다.",
      },
    },
  },
};

export const Values: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">평점 없음</span>
          <span className="text-xs text-gray-500">0/5</span>
        </div>
        <BoxRatingGroup value={0} max={5} size="md" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">낮은 평점</span>
          <span className="text-xs text-gray-500">1/5</span>
        </div>
        <BoxRatingGroup value={1} max={5} size="md" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">보통 평점</span>
          <span className="text-xs text-gray-500">3/5</span>
        </div>
        <BoxRatingGroup value={3} max={5} size="md" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">높은 평점</span>
          <span className="text-xs text-gray-500">5/5</span>
        </div>
        <BoxRatingGroup value={5} max={5} size="md" />
      </div>
    </div>
  ),
  args: {
    value: 3,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "현재 선택된 박스의 개수에 따른 상태를 확인할 수 있습니다.",
      },
    },
  },
};

const RealWorldRatingForm = () => {
  const [ratings, setRatings] = useState({
    quality: 0,
    facility: 0,
    teacher: 0,
    food: 0,
  });

  const handleRatingChange = (
    category: keyof typeof ratings,
    value: number
  ) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="w-96 space-y-6 rounded-lg border p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">서울유치원 평가</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>분위기</span>
              <span className="text-gray-500">{ratings.quality}/5</span>
            </div>
            <BoxRatingGroup
              value={ratings.quality}
              onChange={(value) => handleRatingChange("quality", value)}
              max={5}
              size="md"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>워라밸</span>
              <span className="text-gray-500">{ratings.facility}/5</span>
            </div>
            <BoxRatingGroup
              value={ratings.facility}
              onChange={(value) => handleRatingChange("facility", value)}
              max={5}
              size="md"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>관리자</span>
              <span className="text-gray-500">{ratings.teacher}/5</span>
            </div>
            <BoxRatingGroup
              value={ratings.teacher}
              onChange={(value) => handleRatingChange("teacher", value)}
              max={5}
              size="md"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>고객</span>
              <span className="text-gray-500">{ratings.food}/5</span>
            </div>
            <BoxRatingGroup
              value={ratings.food}
              onChange={(value) => handleRatingChange("food", value)}
              max={5}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserScenario: Story = {
  render: () => <RealWorldRatingForm />,
  args: {
    value: 0,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 리뷰 작성 시나리오에서의 사용 예시입니다.",
      },
    },
  },
};
