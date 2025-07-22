import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import GlobalNavBar from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Navigations/GlobalNavBar",
  component: GlobalNavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "전역 하단 네비게이션 바 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen bg-gray-50">
        <div className="absolute bottom-0 w-full">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    currentPath: {
      description: "현재 페이지 경로",
      control: {
        type: "select",
        options: ["/", "/school", "/community", "/bookmarks", "/user"],
      },
    },
  },
} satisfies Meta<typeof GlobalNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    currentPath: "/",
  },
};

export const Specs: Story = {
  args: {
    currentPath: "/",
  },
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Props"
            headers={["prop", "type", "description"]}
            data={[["currentPath", "string", "현재 페이지 경로 (필수)"]]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Navigation Items"
            headers={["tab", "path", "icon", "label"]}
            data={[
              ["홈", "/", "home", "홈"],
              ["유치원", "/school", "school", "유치원"],
              ["커뮤니티", "/community", "community", "커뮤니티"],
              ["즐겨찾기", "/bookmarks", "bookmarks", "즐겨찾기"],
              ["프로필", "/user", "user", "프로필"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["position", "fixed", "fixed"],
              ["location", "bottom", "bottom-0"],
              ["width", "100%", "w-full"],
              ["height", "80px", "h-20"],
              ["background", "white", "bg-white"],
              ["border top", "1px solid gray-200", "border-t border-gray-200"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Tab Item"
            headers={["property", "inactive", "active"]}
            data={[
              ["icon color", "gray-400", "primary-normal01"],
              ["text color", "gray-500", "primary-dark01"],
              ["font weight", "400", "600"],
              ["transition", "150ms ease-in-out", "150ms ease-in-out"],
            ]}
            codeColumns={[0, 1, 2]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "경로 매칭 전략",
                items: [
                  "정확한 경로 매칭으로 활성 상태 판단",
                  "쿼리 파라미터 무시하고 base path만 확인",
                  "세션 스토리지 값 고려한 상태 관리",
                  "커뮤니티 게시글 페이지 특별 처리",
                  "동적 라우트 지원 (user/:id 등)",
                ],
              },
              {
                title: "접근성 고려사항",
                items: [
                  "aria-label로 탭 설명 제공",
                  "role='tablist' 구조 준수",
                  "키보드 네비게이션 지원",
                  "충분한 터치 영역 확보 (44px+)",
                  "색상과 아이콘 모두로 상태 구분",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "앱의 주요 섹션 간 이동",
                  "현재 위치 표시",
                  "빠른 탭 전환",
                  "모바일 우선 네비게이션",
                  "하단 고정 위치",
                ],
              },
              {
                title: "성능 최적화",
                items: [
                  "아이콘 최적화 및 캐싱",
                  "상태 변경 시 최소 리렌더링",
                  "React Router와 효율적 통합",
                  "터치 이벤트 디바운싱",
                  "메모이제이션 활용",
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
    currentPath: "/",
  },
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Navigation States">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Home Active</h4>
            <div className="relative h-24 rounded-lg border bg-gray-50">
              <div className="absolute bottom-0 w-full">
                <GlobalNavBar currentPath="/" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">School Active</h4>
            <div className="relative h-24 rounded-lg border bg-gray-50">
              <div className="absolute bottom-0 w-full">
                <GlobalNavBar currentPath="/school" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Community Active</h4>
            <div className="relative h-24 rounded-lg border bg-gray-50">
              <div className="absolute bottom-0 w-full">
                <GlobalNavBar currentPath="/community" />
              </div>
            </div>
          </div>
        </div>
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
