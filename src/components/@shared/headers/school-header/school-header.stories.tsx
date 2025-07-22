import { fn } from "@storybook/test";

import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import SchoolHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/SchoolHeader",
  component: SchoolHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "BaseHeader에서 유치원 검색, 즐겨찾기 기능이 추가된 헤더",
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
    },
    hasBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
    },
    showBookmark: {
      description: "즐겨찾기 버튼 표시 여부",
      control: "boolean",
    },
    kindergartenId: {
      description: "유치원 ID (즐겨찾기 기능용)",
      control: "text",
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
    },
    onBackButtonClick: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "뒤로가기",
    },
  },
} satisfies Meta<typeof SchoolHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "주변 유치원",
    headerLogo: false,
    hasBackButton: true,
    showBookmark: false,
    kindergartenId: "",
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
              ["showBookmark", "boolean", "즐겨찾기 버튼 (기본: false)"],
              ["kindergartenId", "string", "유치원 ID (즐겨찾기용)"],
              ["hasBorder", "boolean", "하단 경계선 (기본: false)"],
              ["onBackButtonClick", "function", "뒤로가기 핸들러"],
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
              ["border", "bottom gray", "border-b"],
              ["position", "sticky top", "sticky top-0"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Navigation Features"
            headers={["feature", "component", "condition"]}
            data={[
              ["back button", "arrow-left icon", "hasBackButton=true"],
              ["title/logo", "text or logo", "headerLogo boolean"],
              ["search button", "search icon", "항상 표시"],
              ["bookmark toggle", "star icon", "showBookmark=true"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Bookmark States"
            headers={["state", "icon", "behavior"]}
            data={[
              ["not bookmarked", "star outline", "클릭 시 즐겨찾기 추가"],
              ["bookmarked", "filled star", "클릭 시 즐겨찾기 제거"],
              ["loading", "loading spinner", "API 요청 중"],
              ["error", "error tooltip", "실패 시 피드백"],
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
                  "주변 유치원 목록 페이지",
                  "유치원 검색 결과 페이지",
                  "유치원 상세 페이지",
                  "즐겨찾기 관리 페이지",
                  "지도 뷰 페이지",
                ],
              },
              {
                title: "제목 표시 규칙",
                items: [
                  { label: "headerLogo=true", description: "원바원 로고 표시" },
                  {
                    label: "headerLogo=false",
                    description: "title 텍스트 표시",
                  },
                  { label: "긴 제목", description: "말줄임표로 처리" },
                  {
                    label: "동적 제목",
                    description: "페이지 상태에 따라 변경",
                  },
                ],
              },
              {
                title: "즐겨찾기 기능",
                items: [
                  "유치원 상세 페이지에서만 사용",
                  "로그인 상태에서만 활성화",
                  "실시간 상태 반영",
                  "토스트 메시지로 피드백",
                  "오프라인 상태 처리",
                ],
              },
              {
                title: "네비게이션 UX",
                items: [
                  "뒤로가기는 브라우저 히스토리 고려",
                  "검색은 내장 기능 활용",
                  "즐겨찾기는 즉시 반영",
                  "키보드 네비게이션 지원",
                  "터치 친화적 버튼 크기",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    title: "주변 유치원",
    headerLogo: false,
    hasBackButton: true,
    showBookmark: false,
    kindergartenId: "",
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
