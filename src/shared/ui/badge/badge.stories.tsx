import {
  ColorSwatch,
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
  VariantGrid,
} from "@/shared/ui/layout/storybook-layout";

import Badge from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "인터렉션이 없는 뱃지 형태의 컴포넌트",
      },
    },
  },
  argTypes: {
    variant: {
      description: "배지의 스타일 변형",
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    children: {
      description: "배지에 표시될 텍스트",
      control: "text",
    },
    className: {
      description: "추가 CSS 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "기본",
    variant: "primary",
  },
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Variant"
            headers={["option", "background", "text", "border"]}
            data={[
              [
                "primary",
                <ColorSwatch
                  color="bg-primary-normal01"
                  label="primary-normal01"
                />,
                "white",
                "none",
              ],
              [
                "secondary",
                <ColorSwatch
                  color="bg-secondary-normal01"
                  label="secondary-normal01"
                />,
                "primary-dark01",
                "none",
              ],
              [
                "tertiary",
                <ColorSwatch color="bg-gray-100" label="gray-100" />,
                "gray-700",
                "1px solid gray-200",
              ],
            ]}
            codeColumns={[0, 2, 3]}
          />

          <SpecTable
            title="Typography"
            headers={["property", "value", "token"]}
            data={[
              ["font-size", "12px", "text-xs"],
              ["font-weight", "500", "font-medium"],
              ["line-height", "16px", "leading-4"],
              ["letter-spacing", "0.025em", "tracking-wider"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["padding", "4px 8px", "px-2 py-1"],
              ["border-radius", "6px", "rounded-md"],
              ["min-height", "24px", "h-6"],
              ["display", "inline-flex", "inline-flex"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="States"
            headers={["state", "behavior", "use case"]}
            data={[
              ["default", "정적 표시", "일반적인 라벨"],
              ["hover", "약간의 투명도 변화", "클릭 가능한 태그"],
              ["active", "더 진한 배경", "선택된 필터"],
              ["disabled", "회색 처리", "비활성 상태"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={3}
            sections={[
              {
                title: "스타일 선택 기준",
                items: [
                  { label: "primary", description: "중요한 정보, 상태 표시" },
                  { label: "secondary", description: "보조 정보, 카테고리" },
                  { label: "tertiary", description: "일반 라벨, 태그" },
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "유치원 설립 유형 (국공립, 사립)",
                  "게시글 작성자 구분 (교사, 학부모)",
                  "인기 순위 표시 (HOT, NEW)",
                  "필터 태그 (지역, 연령)",
                ],
              },
              {
                title: "접근성 & 성능",
                items: [
                  "최소 대비율 4.5:1 준수",
                  "읽기 쉬운 폰트 크기",
                  "터치 영역 최소 24px",
                  "최적화된 CSS 클래스",
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
        story: "실제 적용되는 CSS 값과 디자인 토큰 정보를 확인할 수 있습니다.",
      },
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <VariantGrid
      sections={[
        {
          title: "Variant",
          prop: "variant",
          values: ["primary", "secondary", "tertiary"],
        },
      ]}
      component={Badge}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "옵션 별 모든 컴포넌트 스타일",
      },
    },
  },
};
