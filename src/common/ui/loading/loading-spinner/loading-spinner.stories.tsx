import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

import LoadingSpinner from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Feedback/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    docs: {
      description: {
        component: "그라데이션 스타일 로딩 스피너 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
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
              ["type", "'page' | 'element'", "표시 타입 (필수)"],
              ["size", "'sm' | 'md' | 'lg'", "스피너 크기 (선택)"],
              ["color", "string", "커스텀 색상 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Type Variants"
            headers={["type", "height", "padding", "usage"]}
            data={[
              ["page", "min-h-screen", "py-24", "전체 페이지 로딩"],
              ["element", "auto", "py-14", "섹션 내 로딩"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Size"
            headers={["size", "width", "height", "border"]}
            data={[
              ["sm", "24px", "24px", "2px"],
              ["md", "32px", "32px", "3px"],
              ["lg", "48px", "48px", "4px"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />

          <SpecTable
            title="Animation"
            headers={["property", "duration", "easing"]}
            data={[
              ["rotation", "1s", "linear"],
              ["iteration", "infinite", "-"],
              ["direction", "normal", "-"],
            ]}
            codeColumns={[0, 1, 2]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "타입 선택 기준",
                items: [
                  { label: "page", description: "전체 페이지 로딩 시" },
                  { label: "element", description: "특정 섹션 로딩 시" },
                ],
              },
              {
                title: "크기 선택 기준",
                items: [
                  { label: "sm", description: "버튼 내부, 인라인 로딩" },
                  { label: "md", description: "카드, 섹션 로딩 (기본)" },
                  { label: "lg", description: "전체 페이지, 중요한 로딩" },
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "페이지 초기 로딩",
                  "API 데이터 요청 중",
                  "파일 업로드/다운로드",
                  "폼 제출 처리 중",
                  "검색 결과 로딩",
                  "무한 스크롤 로딩",
                ],
              },
              {
                title: "UX 최적화",
                items: [
                  "적절한 로딩 시간 안내",
                  "스켈레톤 UI와 조합 사용",
                  "로딩 취소 옵션 제공",
                  "진행률 표시 고려",
                  "에러 상태 대비책 마련",
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
      <Section title="Type">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Page </h4>
            <div className="min-h-[200px] rounded-lg border border-gray-200">
              <LoadingSpinner type="page" />
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Element </h4>
            <div className="rounded-lg border border-gray-200">
              <LoadingSpinner type="element" />
            </div>
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
