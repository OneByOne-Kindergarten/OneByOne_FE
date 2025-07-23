import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import CommunityHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/CommunityHeader",
  component: CommunityHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "BaseHeader에서 게시글 검색 기능이 추가된 헤더",
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
    hasWriteButton: {
      description: "글쓰기 버튼 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    category: {
      description: "커뮤니티 카테고리",
      options: ["TEACHER", "PROSPECTIVE_TEACHER"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "TEACHER" },
      },
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
} satisfies Meta<typeof CommunityHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "교사 커뮤니티",
    headerLogo: false,
    hasBackButton: true,
    hasWriteButton: true,
    category: "TEACHER",
    hasBorder: true,
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
              ["hasWriteButton", "boolean", "글쓰기 버튼 (기본: false)"],
              [
                "category",
                "'TEACHER' | 'PROSPECTIVE_TEACHER'",
                "커뮤니티 카테고리",
              ],
              ["hasBorder", "boolean", "하단 경계선 (기본: false)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Category Features"
            headers={["category", "description", "write button"]}
            data={[
              ["TEACHER", "현직 교사 커뮤니티", "로그인 시 표시"],
              ["PROSPECTIVE_TEACHER", "예비 교사 커뮤니티", "로그인 시 표시"],
            ]}
            codeColumns={[0]}
          />

          <SpecTable
            title="Action Elements"
            headers={["element", "position", "function"]}
            data={[
              ["back button", "좌측", "이전 페이지 이동"],
              ["search button", "우측", "게시글 검색"],
              ["write button", "우측", "새 게시글 작성"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Navigation Flow"
            headers={["action", "destination", "condition"]}
            data={[
              ["search click", "검색 페이지", "항상 이동"],
              ["write click", "작성 페이지", "로그인 상태"],
              ["back click", "이전 페이지", "hasBackButton=true"],
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
                  "커뮤니티 게시글 목록 페이지",
                  "커뮤니티 게시글 상세 페이지",
                  "게시글 검색 결과 페이지",
                  "카테고리별 커뮤니티 페이지",
                  "커뮤니티 메인 페이지",
                ],
              },
              {
                title: "카테고리별 사용법",
                items: [
                  { label: "TEACHER", description: "현직 교사 전용 커뮤니티" },
                  {
                    label: "PROSPECTIVE_TEACHER",
                    description: "예비 교사 커뮤니티",
                  },
                  { label: "권한 관리", description: "카테고리별 접근 제어" },
                  { label: "글쓰기 권한", description: "로그인 상태 확인" },
                ],
              },
              {
                title: "검색 기능",
                items: [
                  "게시글 제목 검색",
                  "게시글 내용 검색",
                  "작성자 검색",
                  "태그 검색",
                  "실시간 검색 결과",
                ],
              },
              {
                title: "사용성 & 접근성",
                items: [
                  "명확한 액션 버튼 배치",
                  "카테고리 정보 표시",
                  "로그인 상태에 따른 UI 변화",
                  "터치 친화적 버튼 크기",
                  "키보드 네비게이션 지원",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    title: "교사 커뮤니티",
    headerLogo: false,
    hasBackButton: true,
    hasWriteButton: true,
    category: "TEACHER",
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};
