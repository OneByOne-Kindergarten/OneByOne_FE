import { fn } from "@storybook/test";

import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/shared/ui/layout/storybook-layout";

import SaveHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/SaveHeader",
  component: SaveHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "BaseHeader에서 게시글 저장 기능이 추가된 헤더",
      },
    },
  },
  argTypes: {
    title: {
      description: "헤더에 표시될 제목",
      control: "text",
    },
    hasBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
    },
    onBackButtonClick: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "back clicked",
    },
    onSave: {
      description: "저장 버튼 클릭 핸들러",
      action: "save clicked",
    },
  },
} satisfies Meta<typeof SaveHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "게시글 작성",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    onSave: fn(),
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
              ["title", "string", "헤더 제목 (필수)"],
              ["hasBackButton", "boolean", "뒤로가기 버튼 (기본: false)"],
              ["hasBorder", "boolean", "하단 경계선 (기본: false)"],
              ["onBackButtonClick", "function", "뒤로가기 핸들러"],
              ["onSave", "function", "저장 버튼 핸들러"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Action Elements"
            headers={["element", "position", "function"]}
            data={[
              ["back button", "좌측", "이전 페이지 이동"],
              ["title", "중앙", "현재 페이지 표시"],
              ["save button", "우측", "임시저장 기능"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Save Features"
            headers={["feature", "behavior", "feedback"]}
            data={[
              ["auto save", "주기적 자동 저장", "저장 상태 표시"],
              ["manual save", "버튼 클릭 저장", "저장 완료 메시지"],
              ["draft mode", "임시저장 상태", "초안 표시"],
              ["validation", "저장 전 검증", "오류 메시지"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Use Cases"
            headers={["scenario", "title", "save behavior"]}
            data={[
              ["게시글 작성", "글쓰기", "제목+내용 저장"],
              ["리뷰 작성", "리뷰 쓰기", "평점+내용 저장"],
              ["댓글 작성", "댓글 쓰기", "텍스트 저장"],
              ["문의 작성", "문의하기", "분류+내용 저장"],
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
                  "게시글 작성 페이지",
                  "리뷰 작성 페이지",
                  "댓글 작성 페이지",
                  "문의사항 작성 페이지",
                  "긴 텍스트 입력이 필요한 폼",
                ],
              },
              {
                title: "저장 기능 활용",
                items: [
                  { label: "임시저장", description: "작성 중 내용 보존" },
                  { label: "자동저장", description: "주기적 데이터 백업" },
                  { label: "저장 상태", description: "사용자에게 피드백 제공" },
                  {
                    label: "복구 기능",
                    description: "페이지 새로고침 시 복구",
                  },
                ],
              },
              {
                title: "사용자 경험",
                items: [
                  "작성 중 데이터 손실 방지",
                  "명확한 저장 상태 표시",
                  "저장 완료 시각적 피드백",
                  "에러 발생 시 안내 메시지",
                  "저장된 내용 확인 가능",
                ],
              },
              {
                title: "접근성 & 기능성",
                items: [
                  "키보드 단축키 지원 (Ctrl+S)",
                  "터치 디바이스 최적화",
                  "로딩 상태 표시",
                  "네트워크 오류 처리",
                  "오프라인 상태 대응",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    title: "게시글 작성",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
    onSave: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};
