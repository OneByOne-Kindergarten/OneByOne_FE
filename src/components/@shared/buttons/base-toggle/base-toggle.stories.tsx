import { fn } from "@storybook/test";
import { useState } from "react";

import Toggle from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Buttons/BaseToggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
토글 버튼 컴포넌트입니다. Radix UI Toggle을 기반으로 한 on/off 상태를 가진 버튼입니다.

**주요 특징:**
- Radix UI Toggle Primitive 기반
- 눌린 상태(pressed)와 일반 상태 구분
- CVA를 통한 다양한 스타일 변형
- 접근성 기본 지원 (aria attributes)

**사용 시나리오:**
- 필터 토글 (선택/미선택)
- 설정 옵션 토글
- 카테고리 선택 버튼
- 즐겨찾기 토글
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

// 카테고리 필터 토글
export const CategoryFilter: Story = {
  render: () => {
    const FilterToggle = ({
      children,
      isActive,
    }: {
      children: string;
      isActive?: boolean;
    }) => {
      const [pressed, setPressed] = useState(isActive || false);

      return (
        <Toggle
          variant="primary"
          size="sm"
          shape="rounded"
          border="gray"
          font="sm_sb"
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
      <div className="flex flex-wrap gap-2">
        <FilterToggle isActive>전체</FilterToggle>
        <FilterToggle>선생님</FilterToggle>
        <FilterToggle>학부모</FilterToggle>
        <FilterToggle>원장님</FilterToggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "카테고리 필터에 사용되는 토글 버튼들입니다. 선택된 카테고리는 활성화 상태로 표시됩니다.",
      },
    },
  },
};

// 설정 옵션 토글
export const SettingsOptions: Story = {
  render: () => {
    const SettingToggle = ({ children }: { children: string }) => {
      const [pressed, setPressed] = useState(false);

      return (
        <div className="flex w-48 items-center justify-between rounded-lg border p-2">
          <span className="text-sm">{children}</span>
          <Toggle
            variant="primary"
            size="xs"
            shape="full"
            pressed={pressed}
            onPressedChange={(newPressed) => {
              setPressed(newPressed);
              fn()(newPressed);
            }}
          >
            {pressed ? "ON" : "OFF"}
          </Toggle>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-2">
        <SettingToggle>알림 수신</SettingToggle>
        <SettingToggle>자동 로그인</SettingToggle>
        <SettingToggle>마케팅 수신</SettingToggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "설정 페이지에서 사용되는 토글 버튼들입니다. 각종 옵션의 활성화/비활성화 상태를 나타냅니다.",
      },
    },
  },
};

// 크기별 토글 비교
export const SizeComparison: Story = {
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

// 모양별 토글 비교
export const ShapeComparison: Story = {
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

// 상태별 토글 (Interactive)
export const InteractiveStates: Story = {
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
          shape="rounded"
          border="gray"
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
        <StateToggle>일반</StateToggle>
        <StateToggle initialState>활성화됨</StateToggle>
        <StateToggle disabled>비활성화</StateToggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "토글의 다양한 상태를 확인할 수 있습니다. 클릭하여 상태 변화를 테스트해보세요.",
      },
    },
  },
};
