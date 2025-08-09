import { fn } from "@storybook/test";
import { useState } from "react";

import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

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
        component: "박스 형태 인터랙티브 평점 컴포넌트",
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
      table: {
        defaultValue: { summary: "md" },
      },
    },
    onChange: {
      description: "값 변경 이벤트 핸들러",
      action: "rating changed",
    },
  },
} satisfies Meta<typeof BoxRatingGroup>;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    value: 3,
    max: 5,
    size: "md",
    onChange: fn(),
  },
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Props"
            headers={["prop", "type", "description"]}
            data={[
              ["value", "number", "현재 선택된 박스 수 (필수)"],
              ["max", "number", "최대 박스 수 (기본: 5)"],
              ["size", "'xs' | 'sm' | 'md' | 'lg'", "박스 크기 (기본: md)"],
              ["onChange", "function", "값 변경 핸들러 (선택)"],
              ["className", "string", "추가 CSS 클래스 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />
          <SpecTable
            title="Size Variants"
            headers={["size", "width", "height", "gap"]}
            data={[
              ["xs", "20px", "20px", "4px"],
              ["sm", "24px", "24px", "6px"],
              ["md", "32px", "32px", "8px"],
              ["lg", "40px", "40px", "10px"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />
          <SpecTable
            title="Visual Design"
            headers={["state", "background", "border"]}
            data={[
              ["unselected", "gray-100", "gray-300"],
              ["selected", "primary-normal01", "primary-normal01"],
              ["hover", "gray-200", "gray-400"],
              ["focus", "outline", "primary-dark01"],
            ]}
            codeColumns={[0, 1, 2]}
          />
          <SpecTable
            title="Interaction"
            headers={["action", "behavior", "accessibility"]}
            data={[
              ["click", "값 설정 (1-max)", "role='radiogroup'"],
              ["keyboard", "화살표키 네비게이션", "aria-label 지원"],
              ["hover", "시각적 피드백", "focus-visible"],
              ["change", "onChange 콜백 호출", "aria-valuenow 업데이트"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>
        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "크기 선택 기준",
                items: [
                  { label: "xs", description: "좁은 공간, 인라인 표시" },
                  { label: "sm", description: "테이블, 카드 내부" },
                  { label: "md", description: "폼, 상세 페이지 (기본)" },
                  { label: "lg", description: "메인 평점, 강조 표시" },
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "사용자 평점 입력 (1-5점)",
                  "만족도 조사 응답",
                  "제품/서비스 평가",
                  "리뷰 작성 시 세부 항목 평점",
                  "설문조사 척도 응답",
                ],
              },
              {
                title: "UX 고려사항",
                items: [
                  "명확한 시각적 피드백 제공",
                  "터치 영역 충분히 확보",
                  "선택 상태 명확히 구분",
                  "키보드 네비게이션 지원",
                  "적절한 간격으로 오조작 방지",
                ],
              },
              {
                title: "접근성 최적화",
                items: [
                  "role='radiogroup' 명시",
                  "aria-label로 평점 설명",
                  "키보드 화살표 키 지원",
                  "스크린 리더 호환",
                  "충분한 색상 대비",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Size">
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
      </Section>
    </main>
  ),
  parameters: {
    docs: {
      description: {
        story: "옵션 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
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
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "상태 별 컴포넌트 스타일 프리뷰",
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

export const UseCases: Story = {
  render: () => <RealWorldRatingForm />,
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
