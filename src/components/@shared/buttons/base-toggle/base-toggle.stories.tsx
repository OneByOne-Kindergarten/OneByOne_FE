import { fn } from "@storybook/test";
import { useState } from "react";

import Toggle from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Buttons/BaseToggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Radix UI Toggle을 기반으로 한 on/off 상태를 가진 버튼입니다.

**기능:**
- Radix UI Toggle Primitive 기반
- 활성화 상태와 비활성화 상태 구분
- CVA를 통한 다양한 스타일 변형
- 접근성 기본 지원 (aria)

**사용 시나리오:**
- 필터 토글 (선택/미선택)
- 정렬 토글 (최신순/인기순)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "토글 버튼의 시각적 스타일",
      options: ["default", "primary"],
      control: { type: "select" },
    },
    size: {
      description: "토글 버튼의 크기",
      options: ["xs", "sm", "md", "lg"],
      control: { type: "select" },
    },
    shape: {
      description: "토글 버튼의 모서리 형태",
      options: ["default", "rounded", "full"],
      control: { type: "select" },
    },
    border: {
      description: "테두리 스타일",
      options: ["none", "gray"],
      control: { type: "select" },
    },
    font: {
      description: "폰트 크기와 굵기",
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
      control: { type: "select" },
    },
    pressed: {
      description: "토글 상태 (눌림/안눌림)",
      control: "boolean",
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
    },
    onPressedChange: {
      description: "토글 상태 변경 핸들러",
      action: "toggled",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 토글
export const Default: Story = {
  args: {
    children: "토글",
    onPressedChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "기본 스타일의 토글 버튼입니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    const SizeToggle = ({
      size,
      children,
    }: {
      size: "xs" | "sm" | "md" | "lg";
      children: string;
    }) => {
      const [pressed, setPressed] = useState(false);

      return (
        <Toggle
          variant="primary"
          size={size}
          pressed={pressed}
          onPressedChange={(newPressed) => {
            setPressed(newPressed);
            fn()(newPressed);
          }}
        >
          {children}
        </Toggle>
      );
    };

    return (
      <div className="flex items-end gap-3">
        <SizeToggle size="xs">XS</SizeToggle>
        <SizeToggle size="sm">SM</SizeToggle>
        <SizeToggle size="md">MD</SizeToggle>
        <SizeToggle size="lg">LG</SizeToggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "모든 크기 옵션의 토글 버튼을 비교해볼 수 있습니다.",
      },
    },
  },
};

export const Shapes: Story = {
  render: () => {
    const ShapeToggle = ({
      shape,
      children,
    }: {
      shape: "default" | "rounded" | "full";
      children: string;
    }) => {
      const [pressed, setPressed] = useState(false);

      return (
        <Toggle
          variant="primary"
          shape={shape}
          border="gray"
          pressed={pressed}
          onPressedChange={(newPressed) => {
            setPressed(newPressed);
            fn()(newPressed);
          }}
        >
          {children}
        </Toggle>
      );
    };

    return (
      <div className="flex gap-3">
        <ShapeToggle shape="default">Default</ShapeToggle>
        <ShapeToggle shape="rounded">Rounded</ShapeToggle>
        <ShapeToggle shape="full">Full</ShapeToggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "모든 모양 옵션의 토글 버튼을 비교해볼 수 있습니다.",
      },
    },
  },
};

export const UserScenario: Story = {
  render: () => {
    const StateToggle = ({
      children,
      initialState = false,
      disabled = false,
    }: {
      children: string;
      initialState?: boolean;
      disabled?: boolean;
    }) => {
      const [pressed, setPressed] = useState(initialState);

      return (
        <Toggle
          variant="primary"
          size="md"
          shape="full"
          pressed={pressed}
          disabled={disabled}
          onPressedChange={(newPressed) => {
            setPressed(newPressed);
            fn()(newPressed);
          }}
        >
          {children}
        </Toggle>
      );
    };

    return (
      <div className="flex gap-3">
        <StateToggle initialState>자유</StateToggle>
        <StateToggle>월급/취업</StateToggle>
        <StateToggle>유아지도</StateToggle>
        <StateToggle>환경구성</StateToggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "교사 커뮤니티 시나리오에서의 사용 예시입니다. 클릭하여 상태 변화를 테스트해보세요.",
      },
    },
  },
};
