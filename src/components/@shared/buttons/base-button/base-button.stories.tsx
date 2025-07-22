import { fn } from "@storybook/test";

import {
  ColorSwatch,
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
  VariantGrid,
} from "@/components/@shared/layout/storybook-layout";

import Button from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Buttons/BaseButton",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "기본 버튼 컴포넌트",
      },
    },
  },
  argTypes: {
    variant: {
      description: "스타일",
      options: [
        "default",
        "primary",
        "secondary",
        "tertiary",
        "destructive",
        "transparent",
        "transparent_gray",
        "link",
      ],
      control: { type: "select" },
    },
    size: {
      description: "패딩 크기",
      options: ["xs", "sm", "md", "lg"],
      control: { type: "select" },
    },
    shape: {
      description: "모서리 형태",
      options: ["default", "rounded", "full"],
      control: { type: "select" },
    },
    border: {
      description: "테두리",
      options: ["none", "gray", "blue", "black"],
      control: { type: "select" },
    },
    shadow: {
      description: "그림자 효과",
      options: [undefined, "sm", "md", "lg"],
      control: { type: "select" },
    },
    font: {
      description: "폰트 크기와 굵기",
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
      control: { type: "select" },
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
    },
    onClick: {
      description: "클릭 이벤트 핸들러",
      action: "clicked",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "BaseButton",
    onClick: fn(),
  },
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Size (Padding)"
            headers={["option", "padding", "height"]}
            data={[
              ["xs", "8px 12px", "~32px"],
              ["sm", "12px 16px", "~40px"],
              ["md", "16px 20px", "~48px"],
              ["lg", "20px 24px", "~56px"],
            ]}
            codeColumns={[0, 1, 2]}
          />
          <SpecTable
            title="Font"
            headers={["option", "size", "weight"]}
            data={[
              ["xs", "12px", "400"],
              ["xs_sb", "12px", "600"],
              ["sm", "14px", "400"],
              ["md", "16px", "400"],
              ["lg", "18px", "400"],
            ]}
            codeColumns={[0, 1, 2]}
          />
          <SpecTable
            title="Shape"
            headers={["option", "radius", "token"]}
            data={[
              ["default", "8px", "rounded-lg"],
              ["rounded", "12px", "rounded-xl"],
              ["full", "9999px", "rounded-full"],
            ]}
            codeColumns={[0, 1, 2]}
          />
          <SpecTable
            title="Variant"
            headers={["option", "background", "text"]}
            data={[
              [
                "primary",
                <ColorSwatch
                  color="bg-primary-normal01"
                  label="primary-normal01"
                />,
                "white",
              ],
              [
                "secondary",
                <ColorSwatch
                  color="bg-secondary-normal01"
                  label="secondary-normal01"
                />,
                "primary-dark01",
              ],
              [
                "tertiary",
                <ColorSwatch color="bg-tertiary-1" label="tertiary-1" />,
                "white",
              ],
              [
                "destructive",
                <ColorSwatch color="bg-destructive" label="destructive" />,
                "white",
              ],
            ]}
            codeColumns={[0, 2]}
          />
        </SpecGrid>
        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "스타일 선택 기준",
                items: [
                  { label: "primary", description: "주요 액션, CTA 버튼" },
                  { label: "secondary", description: "보조 액션, 서브 버튼" },
                  { label: "tertiary", description: "추가 옵션, 서브 액션" },
                  {
                    label: "destructive",
                    description: "삭제, 취소 등 위험한 액션",
                  },
                  {
                    label: "transparent",
                    description: "아이콘 버튼, 인라인 액션",
                  },
                  { label: "link", description: "외부 링크, 텍스트 링크" },
                ],
              },
              {
                title: "크기 선택 기준",
                items: [
                  { label: "xs", description: "인라인 액션, 아이콘 버튼" },
                  { label: "sm", description: "카드, 테이블 내부" },
                  { label: "md", description: "일반적인 버튼 (권장)" },
                  { label: "lg", description: "주요 CTA, 폼 제출" },
                ],
              },
              {
                title: "접근성",
                items: [
                  "최소 터치 영역: 44px × 44px",
                  "색상 대비율: AA 등급 준수",
                  "키보드 포커스 지원",
                  "aria-label 권장",
                ],
              },
              {
                title: "성능",
                items: [
                  "Radix UI 기반",
                  "Polymorphic 컴포넌트",
                  "최적화된 CSS 클래스",
                  "Tree-shaking 지원",
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
  render: () => (
    <VariantGrid
      sections={[
        {
          title: "Variant",
          prop: "variant",
          values: [
            "default",
            "primary",
            "secondary",
            "tertiary",
            "destructive",
            "transparent",
            "transparent_gray",
            "link",
          ],
        },
        {
          title: "Size",
          prop: "size",
          values: ["xs", "sm", "md", "lg"],
        },
        {
          title: "Shape",
          prop: "shape",
          values: ["default", "rounded", "full"],
        },
        {
          title: "Border",
          prop: "border",
          values: ["none", "gray", "blue", "black"],
        },
        {
          title: "Shadow",
          prop: "shadow",
          values: ["sm", "md", "lg"],
        },
        {
          title: "Font",
          prop: "font",
          values: ["xs", "xs_sb", "sm", "sm_sb", "md", "lg", "lg_sb"],
        },
      ]}
      component={Button}
      commonProps={{ onClick: fn() }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "옵션 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};
