import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

import Main from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Main",
  component: Main,
  parameters: {
    docs: {
      description: {
        component: "페이지 메인 컨텐츠 영역 컨테이너 컴포넌트",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    bg: {
      description: "배경색",
      control: { type: "select" },
      options: ["white", "gray"],
      table: {
        defaultValue: { summary: "gray" },
      },
    },
    children: {
      description: "메인 콘텐츠",
      control: false,
    },
    className: {
      description: "추가 CSS 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="space-y-4 p-6">
    <h1 className="text-2xl font-bold">메인 컨텐츠</h1>
    <p className="text-gray-600">
      이것은 메인 컴포넌트 안에 포함된 샘플 컨텐츠입니다.
    </p>
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-blue-100 p-4">
        <h3 className="font-semibold">카드 1</h3>
        <p className="text-sm">샘플 컨텐츠입니다.</p>
      </div>
      <div className="rounded-lg bg-green-100 p-4">
        <h3 className="font-semibold">카드 2</h3>
        <p className="text-sm">샘플 컨텐츠입니다.</p>
      </div>
    </div>
  </div>
);

export const Playground: Story = {
  args: {
    bg: "gray",
    children: <SampleContent />,
  },
};

export const Specs: Story = {
  args: {
    bg: "gray",
    children: <SampleContent />,
  },
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
              ["children", "ReactNode", "메인 콘텐츠 (필수)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Background Options"
            headers={["variant", "color", "purpose"]}
            data={[
              ["gray", "bg-gray-25", "기본 페이지 배경"],
              ["white", "bg-white", "깔끔한 배경, 카드 위"],
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
              ["flex direction", "column", "flex-col"],
              ["overflow", "auto", "overflow-auto"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="HTML Structure"
            headers={["element", "role", "purpose"]}
            data={[
              ["main", "main", "메인 콘텐츠 영역"],
              ["semantic", "landmark", "접근성 구조"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "배경색 선택 기준",
                items: [
                  { label: "gray", description: "기본 페이지, 목록 페이지" },
                  { label: "white", description: "상세 페이지, 폼 페이지" },
                ],
              },
              {
                title: "컨텐츠 구성",
                items: [
                  "semantic HTML main 태그 사용",
                  "페이지별 고유한 메인 콘텐츠 포함",
                  "스크롤 가능한 영역으로 설정",
                  "접근성을 고려한 landmark 역할",
                  "모바일 및 데스크톱 반응형 지원",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "모든 페이지의 메인 콘텐츠 래퍼",
                  "헤더와 네비게이션 사이 영역",
                  "스크롤 가능한 콘텐츠 영역",
                  "페이지별 배경색 차별화",
                  "semantic 구조 유지",
                ],
              },
              {
                title: "접근성 고려사항",
                items: [
                  "main 태그로 메인 콘텐츠 명시",
                  "스크린 리더 네비게이션 지원",
                  "키보드 포커스 관리",
                  "충분한 색상 대비",
                  "반응형 디자인 적용",
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
  args: {
    bg: "gray",
    children: <SampleContent />,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-semibold">Gray </h4>
        <div className="h-32 overflow-hidden rounded-lg border">
          <Main bg="gray">
            <SampleContent />
          </Main>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">White </h4>
        <div className="h-32 overflow-hidden rounded-lg border">
          <Main bg="white">
            <SampleContent />
          </Main>
        </div>
      </div>
    </div>
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
    bg: "gray",
    children: <SampleContent />,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">홈페이지 레이아웃</h3>
        <div className="h-64 overflow-hidden rounded-lg border">
          <Main bg="gray">
            <div className="space-y-4 p-6">
              <h1 className="text-2xl font-bold">OneByOne</h1>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="font-semibold">유치원 찾기</h3>
                  <p className="text-sm text-gray-600">내 주변 유치원 검색</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="font-semibold">커뮤니티</h3>
                  <p className="text-sm text-gray-600">교사들과 소통하기</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="font-semibold">리뷰</h3>
                  <p className="text-sm text-gray-600">직장 경험 공유</p>
                </div>
              </div>
            </div>
          </Main>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">상세 페이지 레이아웃</h3>
        <div className="h-64 overflow-hidden rounded-lg border">
          <Main bg="white">
            <div className="space-y-6 p-6">
              <div className="border-b pb-4">
                <h1 className="text-xl font-bold">유치원 상세 정보</h1>
                <p className="text-gray-600">서울시 강남구 소재</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">기본 정보</h3>
                  <p className="text-sm text-gray-600">운영시간, 연락처 등</p>
                </div>
                <div>
                  <h3 className="font-semibold">리뷰</h3>
                  <p className="text-sm text-gray-600">직원들의 경험담</p>
                </div>
              </div>
            </div>
          </Main>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">목록 페이지 레이아웃</h3>
        <div className="h-64 overflow-hidden rounded-lg border">
          <Main bg="gray">
            <div className="space-y-4 p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="font-semibold">유치원 {item}</h3>
                  <p className="text-sm text-gray-600">
                    위치 정보 및 간단 설명
                  </p>
                </div>
              ))}
            </div>
          </Main>
        </div>
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
