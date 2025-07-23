import { fn } from "@storybook/test";

import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import Header from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/BaseHeader",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "기본 헤더 컴포넌트로 다양한 형태의 헤더를 구성할 수 있습니다",
      },
    },
  },
  argTypes: {
    title: {
      description: "헤더에 표시될 제목",
      control: "text",
    },
    headerLogo: {
      description: "원바원 로고 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hasBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showAlarmButton: {
      description: "알림 버튼 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    onBackButtonClick: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "back clicked",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "페이지 제목",
    headerLogo: false,
    hasBackButton: true,
    showAlarmButton: false,
    hasBorder: true,
    onBackButtonClick: fn(),
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
              ["title", "string", "헤더 제목 (선택)"],
              ["headerLogo", "boolean", "원바원 로고 표시 (기본: false)"],
              ["hasBackButton", "boolean", "뒤로가기 버튼 (기본: false)"],
              ["showAlarmButton", "boolean", "알림 버튼 (기본: false)"],
              ["hasBorder", "boolean", "하단 경계선 (기본: false)"],
              ["onBackButtonClick", "function", "뒤로가기 핸들러"],
              ["customTitle", "ReactNode", "커스텀 제목 요소"],
              ["customAction", "ReactNode", "커스텀 액션 요소"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["height", "64px", "h-16"],
              ["padding", "16px", "px-4"],
              ["background", "white", "bg-white"],
              ["position", "sticky", "sticky top-0"],
              ["z-index", "50", "z-50"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Navigation Elements"
            headers={["element", "condition", "position"]}
            data={[
              ["back button", "hasBackButton=true", "좌측"],
              ["title/logo", "title 또는 headerLogo", "중앙"],
              ["alarm button", "showAlarmButton=true", "우측"],
              ["custom action", "customAction 제공 시", "우측"],
            ]}
            codeColumns={[0]}
          />

          <SpecTable
            title="States & Variants"
            headers={["variant", "appearance", "use case"]}
            data={[
              ["with border", "하단 회색 선", "페이지 구분"],
              ["without border", "경계선 없음", "플랫 디자인"],
              ["with logo", "원바원 로고", "메인 페이지"],
              ["with title", "텍스트 제목", "서브 페이지"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "적절한 사용 시나리오",
                items: [
                  "모든 페이지의 기본 헤더",
                  "네비게이션이 필요한 화면",
                  "알림 기능이 있는 페이지",
                  "커스텀 액션이 필요한 화면",
                  "브랜딩이 중요한 메인 페이지",
                ],
              },
              {
                title: "제목 표시 규칙",
                items: [
                  {
                    label: "headerLogo=true",
                    description: "메인 페이지용 로고",
                  },
                  { label: "title 텍스트", description: "서브 페이지용 제목" },
                  {
                    label: "customTitle",
                    description: "특별한 디자인 필요 시",
                  },
                  { label: "긴 제목", description: "말줄임표로 처리" },
                ],
              },
              {
                title: "액션 버튼 배치",
                items: [
                  "알림 버튼: 우측 기본 위치",
                  "커스텀 액션: 알림 버튼 좌측",
                  "최대 2-3개 액션 권장",
                  "터치 영역 충분히 확보",
                  "시각적 균형 고려",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "뒤로가기 제스처 지원",
                  "키보드 네비게이션 가능",
                  "충분한 터치 영역 (44px+)",
                  "명확한 시각적 피드백",
                  "일관된 헤더 높이 유지",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    title: "페이지 제목",
    headerLogo: false,
    hasBackButton: true,
    showAlarmButton: false,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};
