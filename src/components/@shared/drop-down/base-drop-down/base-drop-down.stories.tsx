import { action } from "@storybook/addon-actions";

import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";
import { SVG_PATHS } from "@/constants/assets-path";

import BaseDropDown from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/DropDowns/BaseDropDown",
  component: BaseDropDown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "케밥 아이콘 트리거와 옵션을 제공하는 드롭다운 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-80 w-full max-w-2xl items-center justify-center pb-40">
        <div className="relative">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    options: {
      description: "드롭다운 옵션 배열",
      control: "object",
    },
    position: {
      description: "드롭다운 메뉴 위치",
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    align: {
      description: "드롭다운 메뉴 정렬",
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    width: {
      description: "드롭다운 메뉴 너비",
      control: { type: "select" },
      options: ["auto", "full"],
    },
    fullWidth: {
      description: "컨테이너 전체 너비 사용",
      control: "boolean",
    },
    closeOnClick: {
      description: "옵션 클릭 시 드롭다운 닫기",
      control: "boolean",
    },
    closeOnOutsideClick: {
      description: "외부 클릭 시 드롭다운 닫기",
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BaseDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  {
    label: "편집하기",
    onClick: () => action("편집하기 클릭")(),
  },
  {
    label: "공유하기",
    onClick: () => action("공유하기 클릭")(),
  },
  {
    label: "삭제하기",
    onClick: () => action("삭제하기 클릭")(),
    variant: "destructive" as const,
  },
];

export const Playground: Story = {
  args: {
    options: defaultOptions,
    position: "bottom",
    align: "start",
    width: "auto",
    fullWidth: false,
    closeOnClick: true,
    closeOnOutsideClick: true,
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
              ["options", "array", "드롭다운 옵션 배열 (필수)"],
              ["position", "'top' | 'bottom' | 'left' | 'right'", "메뉴 위치"],
              ["align", "'start' | 'center' | 'end'", "메뉴 정렬"],
              ["width", "'auto' | 'full'", "메뉴 너비"],
              ["fullWidth", "boolean", "컨테이너 전체 너비"],
              ["trigger", "ReactNode", "커스텀 트리거"],
              ["closeOnClick", "boolean", "클릭 시 닫기"],
              ["closeOnOutsideClick", "boolean", "외부 클릭 시 닫기"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Option Object"
            headers={["property", "type", "description"]}
            data={[
              ["label", "string", "옵션 텍스트 (필수)"],
              ["onClick", "function", "클릭 핸들러 (필수)"],
              ["icon", "ReactNode", "옵션 아이콘 (선택)"],
              ["variant", "'default' | 'destructive'", "스타일 변형"],
              ["disabled", "boolean", "비활성화 상태"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Position & Align"
            headers={["position", "align", "placement"]}
            data={[
              ["bottom", "start", "좌측 하단"],
              ["bottom", "center", "중앙 하단"],
              ["bottom", "end", "우측 하단"],
              ["top", "start", "좌측 상단"],
              ["left", "start", "좌측"],
              ["right", "start", "우측"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Trigger & Interaction"
            headers={["feature", "behavior", "accessibility"]}
            data={[
              ["kebab trigger", "기본 3점 메뉴 아이콘", "버튼 역할"],
              ["custom trigger", "사용자 정의 트리거", "접근성 유지"],
              ["keyboard", "Space/Enter로 열기", "키보드 접근"],
              ["click outside", "외부 클릭으로 닫기", "UX 편의성"],
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
                  "게시글/댓글 관리 메뉴",
                  "프로필 설정 메뉴",
                  "테이블 행 액션",
                  "카드 컴포넌트 옵션",
                  "컨텍스트 메뉴",
                ],
              },
              {
                title: "옵션 구성 가이드라인",
                items: [
                  { label: "일반 액션", description: "편집, 복사, 공유 등" },
                  {
                    label: "위험 액션",
                    description: "삭제, 차단 (destructive)",
                  },
                  { label: "최대 개수", description: "5-7개 이하 권장" },
                  { label: "그룹핑", description: "구분선으로 그룹 분리" },
                ],
              },
              {
                title: "위치 선택 기준",
                items: [
                  { label: "bottom", description: "일반적인 메뉴 (권장)" },
                  { label: "top", description: "화면 하단 요소" },
                  { label: "left/right", description: "공간 제약 시" },
                  { label: "align", description: "컨텐츠 정렬에 맞춤" },
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "키보드 네비게이션 완전 지원",
                  "스크린 리더 호환",
                  "충분한 터치 영역 확보",
                  "명확한 옵션 라벨링",
                  "위험 액션 시각적 구분",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    options: defaultOptions,
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
      <Section title="Position">
        <div className="grid grid-cols-2 gap-8 p-4">
          <div className="space-y-4">
            <h4 className="text-center text-sm font-semibold">Bottom 위치</h4>
            <div className="flex justify-around">
              <BaseDropDown
                options={defaultOptions}
                position="bottom"
                align="start"
              />
              <BaseDropDown
                options={defaultOptions}
                position="bottom"
                align="center"
              />
              <BaseDropDown
                options={defaultOptions}
                position="bottom"
                align="end"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-center text-sm font-semibold">Top 위치</h4>
            <div className="flex justify-around">
              <BaseDropDown
                options={defaultOptions}
                position="top"
                align="start"
              />
              <BaseDropDown
                options={defaultOptions}
                position="top"
                align="center"
              />
              <BaseDropDown
                options={defaultOptions}
                position="top"
                align="end"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Custom Triggers">
        <BaseDropDown
          options={defaultOptions}
          trigger={
            <button className="rounded-lg bg-primary-normal01 px-4 py-2 text-white hover:bg-primary-normal02">
              메뉴 열기
            </button>
          }
        />
        <BaseDropDown
          options={defaultOptions}
          trigger={
            <span className="cursor-pointer text-blue-600 underline hover:text-blue-800">
              더보기
            </span>
          }
        />
      </Section>

      <Section title="Custom Options">
        <BaseDropDown
          options={[
            {
              label: "아이콘 O",
              onClick: () => action("프로필 보기")(),
              icon: <img src={SVG_PATHS.USER.inactive} className="h-4 w-4" />,
            },
            {
              label: "아이콘 O",
              onClick: () => action("설정")(),
              icon: <img src={SVG_PATHS.SETTING} className="h-4 w-4" />,
            },
            {
              label: "아이콘 O",
              onClick: () => action("로그아웃")(),
              icon: <img src={SVG_PATHS.LOGOUT} className="h-4 w-4" />,
              variant: "destructive" as const,
            },
          ]}
        />
      </Section>
    </main>
  ),
  args: {
    options: defaultOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "옵션 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">비활성화 옵션</h3>
        <BaseDropDown
          options={[
            {
              label: "편집하기",
              onClick: () => action("편집하기")(),
            },
            {
              label: "비활성화된 옵션",
              onClick: () => action("비활성화 클릭")(),
              disabled: true,
            },
            {
              label: "삭제하기",
              onClick: () => action("삭제하기")(),
              variant: "destructive" as const,
            },
          ]}
        />
      </div>
    </div>
  ),
  args: {
    options: defaultOptions,
  },
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
        <h3 className="mb-4 text-lg font-semibold">게시글 관리</h3>
        <div className="w-96 rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium">유치원 선생님 모집합니다</h4>
              <p className="mt-1 text-sm text-gray-600">
                서울시 강남구에 위치한 유치원에서...
              </p>
              <div className="mt-2 text-xs text-gray-500">2시간 전</div>
            </div>
            <BaseDropDown
              options={[
                {
                  label: "삭제하기",
                  onClick: () => action("게시글 삭제")(),
                },
                {
                  label: "신고하기",
                  onClick: () => action("게시글 신고")(),
                  variant: "destructive" as const,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    options: defaultOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
