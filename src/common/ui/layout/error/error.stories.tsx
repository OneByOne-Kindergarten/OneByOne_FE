import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

import Error from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Feedback/Error",
  component: Error,
  parameters: {
    docs: {
      description: {
        component: "에러 상태를 표시하는 컴포넌트",
      },
    },
  },
  argTypes: {
    children: {
      description: "에러 메시지 텍스트",
      control: "text",
    },
    type: {
      description: "에러 표시 타입",
      control: { type: "select" },
      options: ["page", "element"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "페이지를 찾을 수 없습니다.",
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
              ["children", "ReactNode", "에러 메시지 또는 컨텐츠 (필수)"],
              ["type", "'page' | 'element'", "에러 표시 타입 (기본: page)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Type Variants"
            headers={["type", "height", "padding", "use case"]}
            data={[
              ["page", "화면 전체", "py-20", "전체 페이지 에러"],
              ["element", "54px", "py-14", "섹션/요소 에러"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["display", "flex column", "flex flex-col"],
              ["align", "center", "items-center justify-center"],
              ["text align", "center", "text-center"],
              ["color", "gray-500", "text-gray-500"],
              ["width", "100%", "w-full"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Accessibility"
            headers={["feature", "implementation", "benefit"]}
            data={[
              ["semantic HTML", "div + text", "구조적 의미"],
              ["color contrast", "gray-500", "적절한 대비"],
              ["center alignment", "flex center", "시각적 중심"],
              ["responsive", "percentage width", "다양한 화면 대응"],
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
                  "404 페이지 에러",
                  "네트워크 연결 오류",
                  "데이터 로딩 실패",
                  "권한 없음 상태",
                  "서버 오류 상황",
                ],
              },
              {
                title: "타입 선택 기준",
                items: [
                  {
                    label: "page",
                    description: "전체 페이지 에러 (404, 500 등)",
                  },
                  {
                    label: "element",
                    description: "부분 요소 에러 (API 실패 등)",
                  },
                  {
                    label: "높이 고려",
                    description: "페이지 전체 vs 섹션 영역",
                  },
                  {
                    label: "사용자 경험",
                    description: "에러 범위에 맞는 선택",
                  },
                ],
              },
              {
                title: "메시지 작성 가이드라인",
                items: [
                  "명확하고 이해하기 쉬운 언어",
                  "기술적 용어 최소화",
                  "해결 방법 제시 (가능한 경우)",
                  "친근하고 도움이 되는 톤",
                  "간결하면서도 충분한 정보",
                ],
              },
              {
                title: "사용성 & UX",
                items: [
                  "에러 상황에 맞는 적절한 높이",
                  "중앙 정렬로 주목도 확보",
                  "일관된 에러 표시 스타일",
                  "추가 액션 버튼 고려",
                  "로딩 상태와 구분되는 디자인",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    children: "페이지를 찾을 수 없습니다.",
    type: "page",
  },
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
      <Section title="Type Variants">
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 text-sm font-semibold">Page</h4>
            <div className="h-64 overflow-hidden rounded-lg border border-gray-200">
              <Error type="page">페이지를 찾을 수 없습니다.</Error>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Element</h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <Error type="element">데이터를 불러오는데 실패했습니다.</Error>
            </div>
          </div>
        </div>
      </Section>
    </main>
  ),
  args: {
    children: "페이지를 찾을 수 없습니다.",
    type: "page",
  },
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
        <h3 className="mb-4 text-lg font-semibold">404 페이지</h3>
        <div className="h-80 rounded-lg border p-4">
          <div className="flex h-full flex-col">
            <div className="flex-1">
              <Error type="element">404 - 페이지를 찾을 수 없습니다.</Error>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">데이터 로딩 실패</h3>
        <div className="rounded-lg border p-4">
          <div className="space-y-4">
            <h4 className="font-medium">유치원 목록</h4>
            <Error type="element">유치원 정보를 불러오는데 실패했습니다.</Error>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">네트워크 오류</h3>
        <div className="rounded-lg border p-4">
          <div className="space-y-4">
            <h4 className="font-medium">검색 결과</h4>
            <Error type="element">
              네트워크 연결을 확인해주세요. <br />
              인터넷 연결이 불안정하거나 서버에 일시적인 문제가 있을 수
              있습니다.
            </Error>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">권한 없음</h3>
        <div className="h-64 rounded-lg border p-4">
          <Error type="element">
            접근 권한이 없습니다.
            <br />이 페이지에 접근하려면 로그인이 필요합니다.
          </Error>
        </div>
      </div>
    </div>
  ),
  args: {
    children: "페이지를 찾을 수 없습니다.",
    type: "page",
  },
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
