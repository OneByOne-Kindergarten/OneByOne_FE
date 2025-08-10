import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/shared/ui/layout/storybook-layout";

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
        component: "HTML progress 기반 바 형태 평점 컴포넌트",
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
type Story = StoryObj;

export const Playground: Story = {
  args: {
    value: 3.5,
    max: 5,
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
              ["value", "number", "현재 평점 값 (필수)"],
              ["max", "number", "최대 평점 값 (기본: 5)"],
              ["className", "string", "추가 CSS 클래스 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />
          <SpecTable
            title="Visual Design"
            headers={["property", "value", "token"]}
            data={[
              ["width", "100%", "w-full"],
              ["height", "8px", "h-2"],
              ["border radius", "4px", "rounded"],
              ["background", "gray-200", "bg-gray-200"],
              ["fill color", "primary gradient", "bg-gradient-to-r"],
            ]}
            codeColumns={[0, 1, 2]}
          />
          <SpecTable
            title="HTML Structure"
            headers={["element", "purpose", "accessibility"]}
            data={[
              ["progress", "표준 progress 요소", "자동 aria 지원"],
              ["value", "현재 값 속성", "스크린 리더 인식"],
              ["max", "최대값 속성", "비율 계산"],
            ]}
            codeColumns={[0]}
          />
          <SpecTable
            title="Performance"
            headers={["aspect", "approach", "benefit"]}
            data={[
              ["rendering", "CSS gradient", "부드러운 애니메이션"],
              ["accessibility", "semantic HTML", "스크린 리더 지원"],
              ["responsive", "percentage width", "자동 크기 조정"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>
        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "적절한 사용 시나리오",
                items: [
                  "리뷰 평점 표시 (1-5점)",
                  "진행률 표시",
                  "만족도 조사 결과",
                  "성과 지표 시각화",
                  "비교 데이터 표현",
                ],
              },
              {
                title: "값 범위 가이드라인",
                items: [
                  { label: "0-1", description: "매우 낮음, 빨간색 계열" },
                  { label: "1-2", description: "낮음, 주황색 계열" },
                  { label: "2-3", description: "보통, 노란색 계열" },
                  { label: "3-4", description: "좋음, 연두색 계열" },
                  { label: "4-5", description: "매우 좋음, 초록색 계열" },
                ],
              },
              {
                title: "디자인 고려사항",
                items: [
                  "충분한 색상 대비 확보",
                  "그라데이션으로 시각적 깊이감",
                  "둥근 모서리로 모던한 느낌",
                  "반응형 너비로 유연한 레이아웃",
                  "애니메이션으로 부드러운 변화",
                ],
              },
              {
                title: "접근성 최적화",
                items: [
                  "HTML progress 요소 사용",
                  "aria-label로 상세 설명",
                  "키보드 접근 가능",
                  "스크린 리더 지원",
                  "색상 외 대체 정보 제공",
                ],
              },
            ]}
          />
        </SpecCard>
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
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Different Values">
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
      </Section>
    </main>
  ),
  args: {
    value: 3.5,
    max: 5,
  },
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
        <h3 className="mb-4 text-lg font-semibold">유치원 리뷰 평점</h3>
        <div className="w-96 space-y-6 rounded-lg border p-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">서울유치원 리뷰 항목 평점</h4>

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
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">종합 평가</h3>
        <div className="w-96 rounded-lg border p-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">전체 만족도</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-lg font-medium">4.4/5</span>
                <span className="text-sm text-gray-500">32개 리뷰</span>
              </div>
              <BarRating value={4.4} max={5} />
            </div>
            <p className="text-sm text-gray-600">
              전반적으로 만족도가 높은 직장입니다.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">비교 차트</h3>
        <div className="w-96 rounded-lg border p-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">지역별 평점 비교</h4>
            {[
              { name: "강남구", rating: 4.6 },
              { name: "서초구", rating: 4.3 },
              { name: "송파구", rating: 4.1 },
              { name: "마포구", rating: 3.8 },
            ].map((area) => (
              <div key={area.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{area.name}</span>
                  <span className="font-medium">{area.rating}/5</span>
                </div>
                <BarRating value={area.rating} max={5} />
              </div>
            ))}
          </div>
        </div>
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
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
