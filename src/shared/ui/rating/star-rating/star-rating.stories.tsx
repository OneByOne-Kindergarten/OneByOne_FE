import { fn } from "@storybook/test";

import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/shared/ui/layout/storybook-layout";

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
        component: "별 모양 인터랙티브 평점 컴포넌트",
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
type Story = StoryObj;

export const Playground: Story = {
  args: {
    value: 3,
    max: 5,
    size: "lg",
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
              ["value", "number", "현재 선택된 별 수 (필수)"],
              ["max", "number", "최대 별 수 (기본: 5)"],
              ["size", "'sm' | 'lg'", "별 크기 (기본: lg)"],
              ["onChange", "function", "값 변경 핸들러 (선택)"],
              ["className", "string", "추가 CSS 클래스 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Size Variants"
            headers={["size", "width", "height", "usage"]}
            data={[
              ["sm", "16px", "16px", "인라인, 테이블"],
              ["lg", "24px", "24px", "메인 평점, 강조"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Visual Design"
            headers={["state", "color", "opacity"]}
            data={[
              ["unselected", "gray-300", "100%"],
              ["selected", "yellow-400", "100%"],
              ["hover", "yellow-300", "80%"],
              ["focus", "yellow-500", "100%"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Interaction"
            headers={["action", "behavior", "accessibility"]}
            data={[
              ["click", "별점 설정 (1-max)", "role='radiogroup'"],
              ["keyboard", "화살표키 네비게이션", "aria-label 지원"],
              ["hover", "미리보기 하이라이트", "focus-visible"],
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
                  { label: "sm", description: "목록, 테이블, 카드 내부" },
                  { label: "lg", description: "메인 평점, 폼 입력 (기본)" },
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "상품/서비스 평점 표시",
                  "사용자 만족도 입력",
                  "리뷰 작성 시 평점",
                  "품질 평가 시스템",
                  "추천도 측정",
                ],
              },
              {
                title: "UX 고려사항",
                items: [
                  "직관적인 별 모양 아이콘",
                  "명확한 시각적 피드백",
                  "호버 시 미리보기 제공",
                  "충분한 터치 영역",
                  "부분 별점은 지원하지 않음",
                ],
              },
              {
                title: "접근성 최적화",
                items: [
                  "role='radiogroup' 명시",
                  "각 별에 aria-label 제공",
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
        story: "컴포넌트의 상세 스펙과 사용 가이드라인.",
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
            <span className="text-sm text-gray-600">sm</span>
            <StarRating value={3} max={5} size="sm" />
          </div>

          <div className="space-y-2">
            <span className="text-sm text-gray-600">lg</span>
            <StarRating value={3} max={5} size="lg" />
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
        <h3 className="mb-4 text-lg font-semibold">Different Values</h3>
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
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Read Only</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">햇살유치원</span>
            <span className="text-xs text-gray-500">4/5</span>
          </div>
          <StarRating value={4} max={5} size="sm" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "상태 별 스타일 프리뷰",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">검색 결과</h3>
        <div className="w-96 space-y-3">
          {[
            { name: "햇살유치원", rating: 4.5, location: "서울시 강남구" },
            { name: "꽃동산유치원", rating: 4.2, location: "서울시 서초구" },
            { name: "무지개유치원", rating: 3.8, location: "서울시 송파구" },
          ].map((school, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <h5 className="font-medium">{school.name}</h5>
                <p className="text-sm text-gray-500">{school.location}</p>
              </div>
              <div className="text-right">
                <StarRating
                  value={Math.floor(school.rating)}
                  max={5}
                  size="sm"
                />
                <p className="mt-1 text-xs text-gray-500">{school.rating}/5</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 StarRating 사용 예시입니다.",
      },
    },
  },
};
