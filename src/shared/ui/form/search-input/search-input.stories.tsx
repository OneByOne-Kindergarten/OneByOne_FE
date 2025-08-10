import { action } from "@storybook/addon-actions";

import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/shared/ui/layout/storybook-layout";

import SearchInput from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "검색 아이콘이 내장된 입력 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md space-y-2 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: {
      control: "text",
    },
    initialValue: {
      description: "초기 검색어",
      control: "text",
    },
    autoFocus: {
      description: "자동 포커스",
      control: "boolean",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    initialValue: "",
    autoFocus: false,
    onSubmit: action("검색 제출"),
    onClear: action("검색어 클리어"),
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
              ["placeholder", "string", "플레이스홀더 텍스트"],
              ["initialValue", "string", "초기 검색어 (선택)"],
              ["autoFocus", "boolean", "자동 포커스 여부 (선택)"],
              ["onSubmit", "function", "검색 제출 핸들러 (필수)"],
              ["onClear", "function", "검색어 클리어 핸들러 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["height", "48px", "h-12"],
              ["padding", "16px", "px-4"],
              ["border radius", "24px", "rounded-full"],
              ["border", "1px solid gray-300", "border border-gray-300"],
              ["background", "white", "bg-white"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Icons"
            headers={["icon", "size", "position", "function"]}
            data={[
              ["search", "20px", "left", "검색 액션 실행"],
              ["clear (X)", "16px", "right", "입력 내용 지우기"],
              [
                "clear visibility",
                "conditional",
                "input > 0",
                "텍스트 있을 때만 표시",
              ],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="States"
            headers={["state", "appearance", "behavior"]}
            data={[
              ["default", "회색 테두리", "입력 대기"],
              ["focus", "파란색 테두리 + 그림자", "키보드 입력 활성"],
              ["filled", "X 버튼 표시", "클리어 버튼 활성화"],
              ["loading", "스피너 표시", "검색 요청 중"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "React Hook Form 통합",
                items: [
                  "useForm과 함께 사용",
                  "onSubmit에서 검증된 데이터 받기",
                  "실시간 검색 시 디바운싱 적용",
                  "검색어 히스토리 관리 가능",
                  "자동완성 기능과 연동",
                ],
              },
              {
                title: "UX 최적화",
                items: [
                  "플레이스홀더로 검색 힌트 제공",
                  "자동 포커스로 사용성 향상",
                  "클리어 버튼으로 빠른 재입력",
                  "엔터키로 검색 실행",
                  "검색 중 로딩 상태 표시",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "유치원 검색 (이름, 지역)",
                  "게시글 검색 (제목, 내용)",
                  "교사 프로필 검색",
                  "태그 기반 필터링",
                  "실시간 검색 결과",
                ],
              },
              {
                title: "접근성 & 성능",
                items: [
                  "aria-label로 스크린 리더 지원",
                  "키보드 네비게이션 완전 지원",
                  "검색 결과 aria-live로 알림",
                  "디바운싱으로 API 호출 최적화",
                  "메모이제이션으로 리렌더링 방지",
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

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Empty State
          </h4>
          <SearchInput
            placeholder="검색어를 입력하세요"
            onSubmit={action("검색")}
          />
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Filled State
          </h4>
          <SearchInput
            placeholder="검색어를 입력하세요"
            initialValue="유치원 검색"
            onSubmit={action("검색")}
            onClear={action("클리어")}
          />
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Focus State
          </h4>
          <SearchInput
            placeholder="포커스된 상태"
            autoFocus={true}
            onSubmit={action("검색")}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "상태 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">유치원 검색</h3>
        <SearchInput
          placeholder="유치원 명으로 검색해보세요"
          onSubmit={action("유치원 검색")}
          onClear={action("유치원 검색어 클리어")}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">게시글 검색</h3>
        <SearchInput
          placeholder="게시물 제목으로 검색해보세요"
          onSubmit={action("게시글 검색")}
          onClear={action("게시글 검색어 클리어")}
        />
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
