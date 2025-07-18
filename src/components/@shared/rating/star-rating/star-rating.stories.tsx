import { fn } from "@storybook/test";
import { useState } from "react";

import { StarRating } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Rating/StarRating",
  component: StarRating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
별 모양의 인터렉티브 컴포넌트입니다.

**구성 요소:**
- StarIcon: 개별 별 컴포넌트
- StarRating: 별들을 그룹화한 평점 시스템

**기능:**
- 클릭 가능한 별 컴포넌트
- 별 개수 설정 
- 별 크기 설정 (sm, lg)
- 별 선택 상태에 따른 색상 변화
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
      description: "현재 선택된 별 개수",
      control: { type: "number", min: 0, max: 5 },
    },
    max: {
      description: "최대 별 개수",
      control: { type: "number", min: 1, max: 10 },
    },
    size: {
      description: "별 크기",
      control: "select",
      options: ["sm", "lg"],
    },
    onChange: {
      description: "값 변경 이벤트 핸들러",
      action: "star rating changed",
    },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    size: "lg",
    onChange: fn(),
  },
};

const InteractiveStarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <StarRating value={rating} onChange={setRating} max={5} size="lg" />
        <p className="mt-2 text-lg font-medium"> {rating}/5</p>
      </div>
    </div>
  );
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm text-gray-600">sm</span>
        <StarRating value={3} max={5} size="sm" />
      </div>

      <div className="space-y-2">
        <span className="text-sm text-gray-600">lg</span>
        <StarRating value={3} max={5} size="lg" />
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
        story: "sm, lg 크기를 지원합니다.",
      },
    },
  },
};

export const Values: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">0점</span>
          <span className="text-xs text-gray-500">0/5</span>
        </div>
        <StarRating value={0} max={5} size="sm" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">1점</span>
          <span className="text-xs text-gray-500">1/5</span>
        </div>
        <StarRating value={1} max={5} size="sm" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">3점</span>
          <span className="text-xs text-gray-500">3/5</span>
        </div>
        <StarRating value={3} max={5} size="sm" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">5점</span>
          <span className="text-xs text-gray-500">5/5</span>
        </div>
        <StarRating value={5} max={5} size="sm" />
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
        story: "현재 선택된 별의 개수에 따른 상태를 확인할 수 있습니다.",
      },
    },
  },
};

export const ReadOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">햇살유치원</span>
          <span className="text-xs text-gray-500">4/5</span>
        </div>
        <StarRating value={4} max={5} size="sm" />
      </div>
    </div>
  ),
  args: {
    value: 4,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "읽기 전용으로 평점을 표시할 수 있습니다.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => <InteractiveStarRating />,
  args: {
    value: 0,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "클릭으로 값을 변경할 수 있습니다.",
      },
    },
  },
};

const RealWorldStarRatingForm = () => {
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
        <h3 className="text-lg font-semibold">서울유치원</h3>
        <StarRating value={3} max={5} size="lg" />
      </div>
    </div>
  );
};

export const UserScenario: Story = {
  render: () => <RealWorldStarRatingForm />,
  args: {
    value: 0,
    max: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 평가 시나리오에서의 사용 예시입니다.",
      },
    },
  },
};
