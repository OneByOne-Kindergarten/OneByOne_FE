import { action } from "@storybook/addon-actions";
import { useState } from "react";

import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
  VariantGrid,
} from "@/components/@shared/layout/storybook-layout";

import Textarea from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "텍스트 입력 컴포넌트",
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
    font: {
      description: "폰트 크기 및 굵기",
      control: { type: "select" },
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
    },
    padding: {
      description: "패딩 크기",
      control: { type: "select" },
      options: ["default", "sm", "xs"],
    },
    size: {
      description: "높이 설정",
      control: { type: "select" },
      options: ["fixed", "auto"],
    },
    error: {
      description: "에러 상태",
      control: "boolean",
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
    },
    placeholder: {
      description: "플레이스홀더 텍스트",
      control: "text",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaygroundDemo = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <Textarea
      placeholder="입력해보세요"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      size="auto"
    />
  );
};

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
  args: {},
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
              ["font", "string", "폰트 크기와 굵기 (기본: sm_sb)"],
              [
                "padding",
                "'default' | 'sm' | 'xs'",
                "패딩 크기 (기본: default)",
              ],
              ["size", "'fixed' | 'auto'", "높이 설정 (기본: fixed)"],
              ["error", "boolean", "에러 상태 표시 (선택)"],
              ["disabled", "boolean", "비활성화 상태 (선택)"],
              ["placeholder", "string", "플레이스홀더 텍스트 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Size Variants"
            headers={["size", "default height", "focus height", "behavior"]}
            data={[
              ["fixed", "320px", "320px", "고정 높이 유지"],
              ["auto", "96px", "320px", "포커스 시 자동 확장"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Padding Variants"
            headers={["padding", "value", "token"]}
            data={[
              ["default", "20px", "p-5"],
              ["sm", "16px", "p-4"],
              ["xs", "12px", "p-3"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Font Variants"
            headers={["font", "size", "weight", "usage"]}
            data={[
              ["xs", "12px", "400", "작은 메모"],
              ["xs_sb", "12px", "600", "작은 강조 텍스트"],
              ["sm", "14px", "400", "일반 입력"],
              ["sm_sb", "14px", "600", "기본 권장"],
              ["md", "16px", "400", "긴 내용"],
              ["lg", "18px", "400", "제목급 입력"],
            ]}
            codeColumns={[0, 1, 2]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "자동 확장 기능 조작",
                items: [
                  "size='auto' 사용으로 확장 가능",
                  "기본 높이 96px에서 시작",
                  "포커스 시 320px로 자동 확장",
                  "포커스 해제 시 다시 축소",
                  "사용자 친화적 공간 활용",
                ],
              },
              {
                title: "크기 선택 기준",
                items: [
                  { label: "fixed", description: "정해진 긴 내용 입력" },
                  { label: "auto", description: "가변적 내용 길이 (권장)" },
                  { label: "default padding", description: "일반적인 사용" },
                  { label: "sm padding", description: "조밀한 레이아웃" },
                  { label: "xs padding", description: "최소 공간 활용" },
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "게시글 본문 작성",
                  "댓글 및 답글 입력",
                  "리뷰 상세 내용 작성",
                  "문의사항 상세 입력",
                  "긴 텍스트가 필요한 모든 폼",
                ],
              },
              {
                title: "UX 고려사항",
                items: [
                  "auto 크기로 공간 효율성 확보",
                  "적절한 폰트 크기로 가독성 향상",
                  "placeholder로 입력 가이드 제공",
                  "에러 상태 명확한 시각적 표시",
                  "resize 비활성화로 레이아웃 안정성",
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
          title: "Size",
          prop: "size",
          values: ["fixed", "auto"],
          direction: "column",
        },
        {
          title: "Padding",
          prop: "padding",
          values: ["xs", "sm", "default"],
          direction: "column",
        },
        {
          title: "Font",
          prop: "font",
          values: ["xs", "sm", "md", "lg"],
          direction: "column",
        },
      ]}
      component={Textarea}
      commonProps={{ placeholder: "텍스트를 입력하세요" }}
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
        <h3 className="mb-2 text-sm font-semibold">Default</h3>
        <Textarea placeholder="정상 상태" size="auto" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Error</h3>
        <Textarea placeholder="에러 상태" error size="auto" />
        <p className="mt-1 text-xs text-red-600">내용을 입력해주세요</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Disabled</h3>
        <Textarea placeholder="비활성화 상태" disabled size="auto" />
      </div>
    </div>
  ),
  args: {
    placeholder: "",
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
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">게시글</label>
            <Textarea
              placeholder="게시글 내용을 입력하세요"
              size="auto"
              font="sm"
              defaultValue="서울시 강남구에 위치한 유치원에서 경력 3년 이상의 담임교사를 모집합니다. 아이들을 사랑하고 책임감 있는 선생님을 찾고 있습니다."
            />
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">댓글</label>
            <Textarea
              placeholder="댓글을 입력하세요"
              size="auto"
              font="xs"
              padding="sm"
              defaultValue="좋은 정보 감사합니다!"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              문의 내용
            </label>
            <Textarea
              placeholder="문의하실 내용을 상세히 작성해주세요"
              size="fixed"
              font="sm"
              defaultValue="서비스 개선안 말씀드립니다."
            />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: "",
  },
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
