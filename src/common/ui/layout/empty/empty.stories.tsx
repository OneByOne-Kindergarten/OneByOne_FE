import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

import Empty from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Feedback/Empty",
  component: Empty,
  parameters: {
    docs: {
      description: {
        component: "데이터가 없는 빈 상태를 표시하는 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    title: "검색 결과가 없습니다",
    subTitle: "다른 키워드로 검색해보세요",
    type: "page",
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
              ["title", "string", "주요 메시지 (필수)"],
              ["subTitle", "string", "보조 설명 (선택)"],
              ["type", "'page' | 'element'", "표시 타입 (필수)"],
              ["icon", "ReactNode", "커스텀 아이콘 (선택)"],
              ["action", "ReactNode", "액션 버튼 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Type Variants"
            headers={["type", "height", "padding", "usage"]}
            data={[
              ["page", "min-h-screen", "py-24", "전체 페이지 빈 상태"],
              ["element", "auto", "py-14", "섹션 내 빈 상태"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "purpose"]}
            data={[
              ["display", "flex flex-col", "세로 중앙 정렬"],
              ["align", "items-center", "가로 중앙 정렬"],
              ["justify", "justify-center", "세로 중앙 정렬"],
              ["text align", "text-center", "텍스트 중앙 정렬"],
              ["max width", "max-w-md", "콘텐츠 최대 너비"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Typography"
            headers={["element", "size", "weight", "color"]}
            data={[
              ["title", "text-lg", "font-semibold", "gray-900"],
              ["subtitle", "text-sm", "font-normal", "gray-500"],
              ["icon", "w-16 h-16", "-", "gray-300"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "타입 선택 기준",
                items: [
                  { label: "page", description: "전체 페이지가 빈 상태일 때" },
                  { label: "element", description: "특정 섹션이 빈 상태일 때" },
                ],
              },
              {
                title: "콘텐츠 가이드라인",
                items: [
                  "제목은 현재 상황을 명확히 설명",
                  "부제목은 해결 방법이나 다음 액션 제시",
                  "사용자에게 도움이 되는 긍정적 메시지",
                  "너무 기술적이지 않은 친근한 언어",
                  "아이콘은 상황에 맞는 직관적 선택",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "검색 결과 없음",
                  "댓글이나 리뷰 없음",
                  "북마크 목록 비움",
                  "알림 내역 없음",
                  "데이터 로딩 실패",
                  "필터 결과 없음",
                ],
              },
              {
                title: "UX 최적화",
                items: [
                  "액션 버튼으로 다음 단계 제안",
                  "검색어 수정 제안",
                  "관련 콘텐츠 추천",
                  "홈으로 돌아가기 옵션",
                  "새로고침 기능 제공",
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
        story: "컴포넌트 스펙과 사용 가이드라인",
      },
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Type">
        <div className="flex gap-3">
          <div>
            <h4 className="mb-2 text-sm font-medium">Page</h4>
            <div className="min-h-[100px] rounded-lg border border-gray-200">
              <Empty title="데이터가 없습니다" type="page" />
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Element</h4>
            <div className="rounded-lg border border-gray-200">
              <Empty
                title="데이터가 없습니다"
                subTitle="새로운 데이터를 추가해보세요"
                type="element"
              />
            </div>
          </div>
        </div>
      </Section>
      <Section title="Title Only">
        <Empty title="데이터가 없습니다" type="element" />
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

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">댓글 없음</h3>
        <div className="rounded-lg border border-gray-200">
          <Empty
            title="아직 댓글이 없습니다"
            subTitle="첫 번째 댓글을 남겨보세요!"
            type="element"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">북마크 없음</h3>
        <div className="rounded-lg border border-gray-200">
          <Empty
            title="저장된 북마크가 없습니다"
            subTitle="관심 있는 유치원을 북마크해보세요"
            type="element"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">리뷰 없음</h3>
        <div className="rounded-lg border border-gray-200">
          <Empty
            title="작성된 리뷰가 없습니다"
            subTitle="첫 번째 리뷰를 작성해보세요!"
            type="element"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
