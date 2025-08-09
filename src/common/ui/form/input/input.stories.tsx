import { action } from "@storybook/addon-actions";
import { useState } from "react";

import {
  ColorSwatch,
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
  VariantGrid,
} from "@/common/ui/layout/storybook-layout";

import Input from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Radix UI 기반 입력 컴포넌트

**사용 시나리오:**
- 닉네임/비밀번호 입력 필드
- 검색 필드
        `,
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
    variant: {
      description: "입력 필드 스타일",
      control: { type: "select" },
      options: ["default", "outline"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    font: {
      description: "폰트 크기 및 굵기",
      control: { type: "select" },
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
      table: {
        defaultValue: { summary: "sm" },
      },
    },
    inputSize: {
      description: "입력 필드 크기",
      control: { type: "select" },
      options: ["default", "sm", "xs"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    error: {
      description: "에러 상태",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaygroundWithArgs = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    action("값 변경")(e.target.value);
  };

  const handleFocus = () => {
    action("포커스")();
  };

  const handleBlur = () => {
    action("블러")();
  };

  return (
    <Input
      {...args}
      placeholder="입력해보세요"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundWithArgs {...args} />,
  args: {
    variant: "default",
    font: "sm",
    inputSize: "default",
    error: false,
    disabled: false,
  },
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Variant"
            headers={["option", "border", "background", "focus"]}
            data={[
              [
                "default",
                "1px solid #e5e7eb",
                <ColorSwatch color="bg-white" label="white" />,
                "ring-2 ring-primary-normal01",
              ],
              [
                "outline",
                "2px solid #d1d5db",
                <ColorSwatch color="bg-transparent" label="transparent" />,
                "ring-2 ring-primary-normal01",
              ],
            ]}
            codeColumns={[0, 1, 3]}
          />
          <SpecTable
            title="Size"
            headers={["option", "height", "padding", "font-size"]}
            data={[
              ["xs", "32px", "8px 12px", "12px"],
              ["sm", "36px", "10px 14px", "14px"],
              ["default", "40px", "12px 16px", "16px"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />
          <SpecTable
            title="Font"
            headers={["option", "size", "weight", "line-height"]}
            data={[
              ["xs", "12px", "400", "16px"],
              ["xs_sb", "12px", "600", "16px"],
              ["sm", "14px", "400", "20px"],
              ["sm_sb", "14px", "600", "20px"],
              ["md", "16px", "400", "24px"],
              ["md_sb", "16px", "600", "24px"],
              ["lg", "18px", "400", "28px"],
              ["lg_sb", "18px", "600", "28px"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />
          <SpecTable
            title="States"
            headers={["state", "appearance", "interaction"]}
            data={[
              ["default", "일반 테두리", "입력 가능"],
              ["focus", "파란색 링", "키보드 입력 활성"],
              ["error", "빨간색 테두리", "오류 상태 표시"],
              ["disabled", "회색 배경", "입력 불가능"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>
        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "스타일 선택 기준",
                items: [
                  { label: "default", description: "일반적인 폼 입력 필드" },
                  { label: "outline", description: "강조가 필요한 검색 필드" },
                ],
              },
              {
                title: "크기 선택 기준",
                items: [
                  { label: "xs", description: "컴팩트한 필터 입력" },
                  { label: "sm", description: "카드 내부 입력 필드" },
                  { label: "default", description: "일반적인 폼 필드 (권장)" },
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "회원가입 폼 (이메일, 비밀번호)",
                  "로그인 폼 (아이디, 비밀번호)",
                  "검색 기능 (유치원 검색)",
                  "댓글 작성 (텍스트 입력)",
                  "설정 페이지 (닉네임 변경)",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "placeholder 텍스트 명확하게 작성",
                  "에러 메시지와 함께 사용",
                  "라벨과 연결하여 스크린 리더 지원",
                  "키보드 네비게이션 지원",
                  "적절한 input type 사용",
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
    <VariantGrid
      sections={[
        {
          title: "Variant",
          prop: "variant",
          values: ["default", "outline"],
        },
        {
          title: "Size",
          prop: "inputSize",
          values: ["xs", "sm", "default"],
        },
        {
          title: "Font",
          prop: "font",
          values: ["xs", "sm", "md", "lg"],
        },
      ]}
      component={Input}
      commonProps={{ placeholder: "입력해보세요" }}
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

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Normal State</h3>
        <Input placeholder="정상 상태" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Error State</h3>
        <Input placeholder="에러 상태" error />
        <p className="mt-1 text-xs text-red-600">이 필드는 필수입니다</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Disabled State</h3>
        <Input placeholder="비활성화 상태" disabled />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">With Value</h3>
        <Input defaultValue="입력된 텍스트" />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "상태 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};
