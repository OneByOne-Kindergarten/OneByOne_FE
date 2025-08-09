import { fn } from "@storybook/test";

import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

import PostButton from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Buttons/PostButton",
  component: PostButton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "연필 아이콘이 내장된 플로팅 액션 버튼",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-48 w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      description: "버튼에 표시될 텍스트",
      control: "text",
    },
    isDisabled: {
      description: "버튼 비활성화 상태",
      control: "boolean",
    },
    onClick: {
      description: "클릭 이벤트 핸들러",
      action: "clicked",
    },
  },
} satisfies Meta<typeof PostButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: "글쓰기",
    isDisabled: false,
    onClick: fn(),
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
              ["label", "string", "버튼 텍스트 (필수)"],
              ["isDisabled", "boolean", "비활성화 상태 (기본: false)"],
              ["onClick", "function", "클릭 핸들러 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["position", "fixed bottom-right", "fixed bottom-6 right-6"],
              ["z-index", "50", "z-50"],
              ["size", "56px", "w-14 h-14"],
              ["border radius", "28px", "rounded-full"],
              ["shadow", "large", "shadow-lg"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="States"
            headers={["state", "appearance", "interaction"]}
            data={[
              ["default", "파란색 배경", "클릭 가능"],
              ["hover", "진한 파란색", "hover 효과"],
              ["disabled", "회색 배경", "클릭 불가"],
              ["focus", "포커스 링", "키보드 접근"],
            ]}
            codeColumns={[0]}
          />

          <SpecTable
            title="Floating Behavior"
            headers={["feature", "behavior", "purpose"]}
            data={[
              ["position", "화면 우하단 고정", "쉬운 접근성"],
              ["overlay", "다른 콘텐츠 위에 표시", "항상 보임"],
              ["scroll", "스크롤 시에도 위치 유지", "지속적 접근"],
              ["responsive", "모바일/데스크톱 대응", "다양한 화면 지원"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "사용 시나리오",
                items: [
                  "새 게시글 작성",
                  "새 리뷰 작성",
                  "빠른 문의 등록",
                  "메인 액션 버튼",
                  "컨텐츠 추가 기능",
                ],
              },
              {
                title: "상태 관리",
                items: [
                  { label: "활성화", description: "로그인 상태, 권한 있음" },
                  {
                    label: "비활성화",
                    description: "로그아웃 상태, 권한 없음",
                  },
                  { label: "로딩", description: "처리 중 상태" },
                  { label: "완료", description: "액션 완료 피드백" },
                ],
              },
              {
                title: "사용성 고려사항",
                items: [
                  "충분한 터치 영역 (44px 이상)",
                  "명확한 라벨로 기능 표시",
                  "비활성화 시 이유 툴팁 제공",
                  "로딩 중 스피너 표시",
                  "성공/실패 피드백 제공",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "키보드 네비게이션 지원",
                  "스크린 리더 호환",
                  "적절한 색상 대비",
                  "터치 디바이스 최적화",
                  "애니메이션 및 전환 효과",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    label: "글쓰기",
    isDisabled: false,
    onClick: fn(),
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
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">기본 상태</h3>
        <div className="relative h-48 rounded-lg border border-gray-200">
          <PostButton label="글쓰기" isDisabled={false} onClick={fn()} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">비활성화 상태</h3>
        <div className="relative h-48 rounded-lg border border-gray-200 bg-gray-50">
          <PostButton label="글쓰기" isDisabled={true} onClick={fn()} />
          <p className="mt-2 text-sm text-gray-600">
            권한이 없거나 로그아웃 상태에서 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  ),
  args: {
    label: "글쓰기",
    isDisabled: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "상태 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};
