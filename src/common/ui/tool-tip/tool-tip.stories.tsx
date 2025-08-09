import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

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
        component: "물음표 아이콘 클릭 토글형 툴팁 컴포넌트",
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
type Story = StoryObj;

export const Playground: Story = {
  args: {
    children: "기본 툴팁 메시지입니다.",
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
              ["children", "ReactNode", "툴팁 내용 (필수)"],
              ["className", "string", "추가 CSS 클래스 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Trigger Icon"
            headers={["property", "value", "token"]}
            data={[
              ["size", "16px", "w-4 h-4"],
              ["color", "gray-400", "text-gray-400"],
              ["hover color", "gray-600", "hover:text-gray-600"],
              ["background", "transparent", "bg-transparent"],
              ["cursor", "pointer", "cursor-pointer"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Tooltip Appearance"
            headers={["property", "value", "token"]}
            data={[
              ["max width", "200px", "max-w-xs"],
              ["padding", "8px 12px", "px-3 py-2"],
              ["background", "gray-900", "bg-gray-900"],
              ["text color", "white", "text-white"],
              ["border radius", "6px", "rounded-md"],
              ["font size", "12px", "text-xs"],
              ["z-index", "50", "z-50"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Interaction"
            headers={["trigger", "behavior", "accessibility"]}
            data={[
              ["click", "토글 (열기/닫기)", "포커스 관리"],
              ["outside click", "자동 닫기", "포커스 해제"],
              ["keyboard", "Enter/Space 지원", "키보드 네비게이션"],
              ["escape", "닫기", "포커스 복귀"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "컨텐츠 작성 원칙",
                items: [
                  "간결하고 명확한 설명",
                  "전문 용어 해석 제공",
                  "사용자 관점의 도움말",
                  "긍정적이고 친근한 톤",
                  "최대 2-3문장으로 제한",
                ],
              },
              {
                title: "UI 배치 가이드라인",
                items: [
                  { label: "라벨 옆", description: "폼 필드나 제목 바로 옆" },
                  {
                    label: "정보 아이콘",
                    description: "추가 설명이 필요한 곳",
                  },
                  {
                    label: "시각적 균형",
                    description: "레이아웃을 방해하지 않게",
                  },
                  {
                    label: "일관된 위치",
                    description: "같은 유형은 같은 위치",
                  },
                ],
              },
              {
                title: "접근성 고려사항",
                items: [
                  "aria-describedby로 연결",
                  "키보드로 접근 가능",
                  "스크린 리더 지원",
                  "충분한 터치 영역 (44px+)",
                  "색상에 의존하지 않는 표시",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "유치원 정보 용어 설명",
                  "폼 필드 입력 가이드",
                  "기능 설명 및 도움말",
                  "정책이나 규정 안내",
                  "복잡한 데이터 해석",
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
      <Section title="Content Lengths">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-medium">짧은 설명</span>
            <ToolTip>간단한 용어 설명</ToolTip>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">보통 길이 설명</span>
            <ToolTip>
              이 항목은 사용자가 이해하기 어려울 수 있는 개념을 설명합니다.
            </ToolTip>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">긴 설명</span>
            <ToolTip>
              복잡한 정책이나 규정에 대한 상세한 설명입니다. 사용자가 올바른
              선택을 할 수 있도록 충분한 정보를 제공합니다. 필요한 경우 예시나
              주의사항도 포함됩니다.
            </ToolTip>
          </div>
        </div>
      </Section>
    </main>
  ),
  parameters: {
    docs: {
      description: {
        story: "내용 길이 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">유치원 정보 페이지</h3>
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
                <ToolTip>
                  해당 유치원에서 받을 수 있는 최대 원아 수입니다.
                </ToolTip>
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
