import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/shared/ui/layout/storybook-layout";

import NavBar from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Navigations/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "페이지 내 카테고리 탐색 네비게이션 바 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md rounded-lg border bg-white p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    options: {
      description: "네비게이션 옵션 배열",
      control: "object",
    },
    currentPath: {
      description: "현재 페이지 경로",
      control: {
        type: "select",
        options: [
          "/community?category=teacher",
          "/community?category=parent",
          "/tab1",
          "/tab2",
          "/tab3",
        ],
      },
    },
    id: {
      description: "동적 URL에 사용될 ID",
      control: "text",
    },
    className: {
      description: "커스텀 CSS 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    options: [
      { href: "/tab1", label: "Tab 1" },
      { href: "/tab2", label: "Tab 2" },
      { href: "/tab3", label: "Tab 3" },
    ],
    currentPath: "/tab1",
  },
};

export const Specs: Story = {
  args: {
    options: [
      {
        href: "/community?category=teacher",
        label: "교사",
        icon: {
          path: "/src/app/assets/icons/character-chicken.svg",
          alt: "교사 아이콘",
          width: 16,
          height: 16,
        },
      },
      {
        href: "/community?category=parent",
        label: "예비교사",
        icon: {
          path: "/src/app/assets/icons/character-chick.svg",
          alt: "예비교사 아이콘",
          width: 16,
          height: 16,
        },
      },
    ],
    currentPath: "/community?category=teacher",
  },
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Props"
            headers={["prop", "type", "description"]}
            data={[
              ["options", "NavOption[]", "네비게이션 옵션 배열"],
              ["currentPath", "string", "현재 페이지 경로"],
              ["id", "string", "동적 URL ID (선택)"],
              ["className", "string", "커스텀 CSS 클래스 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="NavOption Interface"
            headers={["property", "type", "description"]}
            data={[
              ["href", "string", "링크 경로"],
              ["label", "string", "표시 텍스트"],
              ["icon.path", "string", "아이콘 경로 (선택)"],
              ["icon.alt", "string", "아이콘 alt 텍스트"],
              ["icon.width", "number", "아이콘 너비"],
              ["icon.height", "number", "아이콘 높이"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["display", "flex", "flex"],
              ["gap", "0", "gap-0"],
              ["border radius", "8px", "rounded-lg"],
              ["background", "gray-100", "bg-gray-100"],
              ["padding", "4px", "p-1"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Active State"
            headers={["property", "value", "token"]}
            data={[
              ["background", "white", "bg-white"],
              ["box shadow", "0 1px 3px rgba(0,0,0,0.1)", "shadow-sm"],
              ["font weight", "500", "font-medium"],
              ["text color", "primary-dark01", "text-primary-dark01"],
            ]}
            codeColumns={[0, 1, 2]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "URL 패턴 지원",
                items: [
                  "쿼리 파라미터 매칭 지원",
                  "동적 ID 치환 (:id → 실제 값)",
                  "정확한 경로 매칭으로 활성 상태 표시",
                  "해시 라우팅과 히스토리 라우팅 모두 지원",
                ],
              },
              {
                title: "아이콘 가이드라인",
                items: [
                  "16x16px 크기 권장",
                  "SVG 포맷 사용",
                  "명확한 alt 텍스트 제공",
                  "텍스트 없이 아이콘만 사용 지양",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "커뮤니티 카테고리 (교사/예비교사)",
                  "리뷰 타입 (근무리뷰/실습리뷰)",
                  "문의 상태 (답변완료/답변대기)",
                  "게시글 정렬 (최신순/인기순)",
                  "필터 옵션 전환",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "키보드 네비게이션 지원",
                  "터치 영역 최소 44px 확보",
                  "명확한 활성 상태 표시",
                  "스크린 리더 지원",
                  "로딩 상태 고려",
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
        story: "컴포넌트 스펙과 사용 가이드라인",
      },
    },
  },
};

export const Gallery: Story = {
  args: {
    options: [
      { href: "/tab1", label: "Tab 1" },
      { href: "/tab2", label: "Tab 2" },
      { href: "/tab3", label: "Tab 3" },
    ],
    currentPath: "/tab1",
  },
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="href, label">
        <NavBar
          options={[
            { href: "/tab1", label: "Tab 1" },
            { href: "/tab2", label: "Tab 2" },
            { href: "/tab3", label: "Tab 3" },
          ]}
          currentPath="/tab1"
        />
      </Section>
      <Section title="href, label, Icon">
        <NavBar
          options={[
            {
              href: "/community?category=teacher",
              label: "교사",
              icon: {
                path: "/src/app/assets/icons/character-chicken.svg",
                alt: "교사 아이콘",
                width: 16,
                height: 16,
              },
            },
            {
              href: "/community?category=parent",
              label: "예비교사",
              icon: {
                path: "/src/app/assets/icons/character-chick.svg",
                alt: "예비교사 아이콘",
                width: 16,
                height: 16,
              },
            },
          ]}
          currentPath="/community?category=teacher"
        />
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

export const UseCases: Story = {
  args: {
    options: [
      {
        href: "/community?category=teacher",
        label: "교사",
        icon: {
          path: "/src/app/assets/icons/character-chicken.svg",
          alt: "교사 아이콘",
          width: 16,
          height: 16,
        },
      },
      {
        href: "/community?category=parent",
        label: "예비교사",
        icon: {
          path: "/src/app/assets/icons/character-chick.svg",
          alt: "예비교사 아이콘",
          width: 16,
          height: 16,
        },
      },
    ],
    currentPath: "/community?category=teacher",
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">커뮤니티</h3>
        <NavBar
          options={[
            {
              href: "/community?category=teacher",
              label: "교사",
              icon: {
                path: "/src/app/assets/icons/character-chicken.svg",
                alt: "교사 아이콘",
                width: 16,
                height: 16,
              },
            },
            {
              href: "/community?category=parent",
              label: "예비교사",
              icon: {
                path: "/src/app/assets/icons/character-chick.svg",
                alt: "예비교사 아이콘",
                width: 16,
                height: 16,
              },
            },
          ]}
          currentPath="/community?category=teacher"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">유치원</h3>
        <NavBar
          options={[
            { href: "/review?type=work", label: "근무 리뷰" },
            { href: "/review?type=internship", label: "실습 리뷰" },
          ]}
          currentPath="/review?type=work"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">문의 상태</h3>
        <NavBar
          options={[
            { href: "/inquiry?status=completed", label: "답변완료" },
            { href: "/inquiry?status=pending", label: "답변대기" },
          ]}
          currentPath="/inquiry?status=completed"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 네비게이션 바 사용 예시입니다.",
      },
    },
  },
};
