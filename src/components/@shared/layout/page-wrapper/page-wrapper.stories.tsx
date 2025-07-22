import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import PageWrapper from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/PageWrapper",
  component: PageWrapper,
  parameters: {
    docs: {
      description: {
        component: "페이지 최상위 레이아웃 컨테이너 컴포넌트",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageWrapper>;

export default meta;
type Story = StoryObj;

const SamplePage = () => (
  <div className="space-y-6 p-6">
    <header className="rounded-lg bg-blue-500 p-4 text-white">
      <h1 className="text-xl font-bold">헤더 영역</h1>
    </header>
    <main className="space-y-4">
      <h2 className="text-lg font-semibold">메인 컨텐츠</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="font-medium">섹션 1</h3>
          <p className="text-sm text-gray-600">샘플 컨텐츠입니다.</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="font-medium">섹션 2</h3>
          <p className="text-sm text-gray-600">샘플 컨텐츠입니다.</p>
        </div>
      </div>
    </main>
    <footer className="rounded-lg bg-gray-500 p-4 text-center text-white">
      <p className="text-sm">푸터 영역</p>
    </footer>
  </div>
);

export const Playground: Story = {
  args: {
    bg: "gray",
    children: <SamplePage />,
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
              ["bg", "'gray' | 'white'", "배경색 (기본: gray)"],
              ["className", "string", "추가 CSS 클래스 (선택)"],
              ["children", "ReactNode", "페이지 콘텐츠 (필수)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Background Options"
            headers={["variant", "color", "purpose"]}
            data={[
              ["gray", "bg-gray-25", "기본 앱 배경"],
              ["white", "bg-white", "깔끔한 배경"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["display", "block", "-"],
              ["width", "100%", "w-full"],
              ["min-height", "100vh", "min-h-screen"],
              ["overflow", "auto", "overflow-auto"],
              ["position", "relative", "relative"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Role & Purpose"
            headers={["aspect", "description"]}
            data={[
              ["hierarchy", "최상위 페이지 컨테이너"],
              ["responsibility", "전체 페이지 레이아웃 제공"],
              ["usage", "모든 페이지의 루트 요소"],
              ["nested", "PageLayout, Main 컴포넌트 포함"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "배경색 선택 기준",
                items: [
                  { label: "gray", description: "일반적인 앱 화면" },
                  { label: "white", description: "특수한 페이지 (로그인 등)" },
                ],
              },
              {
                title: "구조적 역할",
                items: [
                  "페이지의 최상위 컨테이너 역할",
                  "스크롤 영역 설정 및 관리",
                  "전체 레이아웃의 기본 배경 제공",
                  "자식 컴포넌트들의 기본 환경 설정",
                  "반응형 디자인의 기준점 제공",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "모든 페이지의 루트 컨테이너",
                  "PageLayout과 함께 사용",
                  "메타데이터 설정 페이지",
                  "전체 앱 테마 적용",
                  "스크롤 동작 제어",
                ],
              },
              {
                title: "컴포넌트 조합",
                items: [
                  "PageLayout > PageWrapper 구조",
                  "Header + Main + Navigation 포함",
                  "React Router와 함께 사용",
                  "Context Provider 래핑",
                  "Error Boundary 내부 배치",
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
      <Section title="Background">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Gray Background</h4>
            <div className="h-32 overflow-hidden rounded-lg border">
              <PageWrapper bg="gray">
                <SamplePage />
              </PageWrapper>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">White Background</h4>
            <div className="h-32 overflow-hidden rounded-lg border">
              <PageWrapper bg="white">
                <SamplePage />
              </PageWrapper>
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

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">일반 앱 페이지</h3>
        <div className="h-64 overflow-hidden rounded-lg border">
          <PageWrapper bg="gray">
            <div className="space-y-4 p-6">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="font-semibold">홈 화면</h3>
                <p className="text-sm text-gray-600">메인 대시보드 콘텐츠</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h4 className="font-medium">유치원 검색</h4>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h4 className="font-medium">커뮤니티</h4>
                </div>
              </div>
            </div>
          </PageWrapper>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">로그인/회원가입 페이지</h3>
        <div className="h-64 overflow-hidden rounded-lg border">
          <PageWrapper bg="white">
            <div className="flex h-full items-center justify-center p-6">
              <div className="w-full max-w-md space-y-4">
                <h2 className="text-center text-xl font-bold">로그인</h2>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="이메일"
                    className="w-full rounded-lg border p-3"
                  />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    className="w-full rounded-lg border p-3"
                  />
                  <button className="w-full rounded-lg bg-blue-500 p-3 text-white">
                    로그인
                  </button>
                </div>
              </div>
            </div>
          </PageWrapper>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">설정 페이지</h3>
        <div className="h-64 overflow-hidden rounded-lg border">
          <PageWrapper bg="gray">
            <div className="space-y-4 p-6">
              <h2 className="text-lg font-bold">설정</h2>
              {["프로필 설정", "알림 설정", "개인정보 설정", "앱 정보"].map(
                (item) => (
                  <div key={item} className="rounded-lg bg-white p-4 shadow-sm">
                    <span className="font-medium">{item}</span>
                  </div>
                )
              )}
            </div>
          </PageWrapper>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 PageWrapper 사용 예시입니다.",
      },
    },
  },
};
