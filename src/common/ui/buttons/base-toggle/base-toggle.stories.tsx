import { fn } from "@storybook/test";
import { useState } from "react";

import {
  ColorSwatch,
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

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
        component: "기본 토글 컴포넌트",
      },
    },
  },
  argTypes: {
    variant: {
      description: "스타일",
      options: ["default", "primary"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description: "패딩 크기",
      options: ["xs", "sm", "md", "lg"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "md" },
      },
    },
    shape: {
      description: "모서리 형태",
      options: ["default", "rounded", "full"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "default" },
      },
    },
    border: {
      description: "테두리",
      options: ["none", "gray"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "none" },
      },
    },
    font: {
      description: "폰트 크기와 굵기",
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
      control: { type: "select" },
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    pressed: {
      description: "토글 상태 (눌림/안 눌림)",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onPressedChange: {
      description: "토글 상태 변경 핸들러",
      action: "toggled",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Toggle Component
const InteractiveToggle = ({
  children,
  initialPressed = false,
  ...props
}: {
  children: string;
  initialPressed?: boolean;
} & Omit<
  React.ComponentProps<typeof Toggle>,
  "children" | "pressed" | "onPressedChange"
>) => {
  const [pressed, setPressed] = useState(initialPressed);

  return (
    <Toggle
      {...props}
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

export const Playground: Story = {
  args: {
    children: "BaseToggle",
    onPressedChange: fn(),
    variant: "default",
    size: "md",
    border: "none",
    shape: "default",
    pressed: false,
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
            headers={["option", "background", "text", "active"]}
            data={[
              [
                "default",
                <ColorSwatch color="bg-gray-100" label="gray-100" />,
                "gray-700",
                <ColorSwatch color="bg-gray-200" label="gray-200" />,
              ],
              [
                "primary",
                <ColorSwatch
                  color="bg-primary-normal01"
                  label="primary-normal01"
                />,
                "white",
                <ColorSwatch
                  color="bg-primary-dark01"
                  label="primary-dark01"
                />,
              ],
            ]}
            codeColumns={[0, 2]}
          />
          <SpecTable
            title="Size"
            headers={["option", "padding", "height", "min-width"]}
            data={[
              ["xs", "6px 10px", "28px", "48px"],
              ["sm", "8px 14px", "32px", "56px"],
              ["md", "12px 16px", "40px", "64px"],
              ["lg", "16px 20px", "48px", "72px"],
            ]}
            codeColumns={[0, 1, 2, 3]}
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
            title="States"
            headers={["state", "appearance", "interaction"]}
            data={[
              ["default", "기본 배경색", "클릭하여 활성화"],
              ["pressed", "진한 배경색", "클릭하여 비활성화"],
              ["hover", "약간 진한 배경", "마우스 오버 상태"],
              ["disabled", "회색 처리", "클릭 불가능"],
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
                  { label: "default", description: "보조적인 필터, 옵션 토글" },
                  {
                    label: "primary",
                    description: "중요한 상태 변경, 메인 필터",
                  },
                ],
              },
              {
                title: "크기 선택 기준",
                items: [
                  { label: "xs", description: "작은 UI, 인라인 옵션" },
                  { label: "sm", description: "카드 내부 토글" },
                  { label: "md", description: "일반적인 필터 (권장)" },
                  { label: "lg", description: "강조가 필요한 주요 토글" },
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "게시글 카테고리 필터 (자유, 월급/취업)",
                  "정렬 옵션 (최신순, 인기순)",
                  "검색 필터 (지역, 유형)",
                  "설정 온/오프 (알림, 공개/비공개)",
                  "다중 선택 태그",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "명확한 on/off 상태 표시",
                  "키보드 포커스 지원",
                  "스크린 리더 지원 (aria-pressed)",
                  "적절한 터치 영역 (최소 44px)",
                  "상태 변화 시 즉각적 피드백",
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
  render: () => {
    return (
      <main className="flex flex-col gap-6">
        <Section title="Variant">
          <InteractiveToggle variant="default">default</InteractiveToggle>
          <InteractiveToggle variant="primary" initialPressed>
            primary
          </InteractiveToggle>
        </Section>

        <Section title="Size">
          <InteractiveToggle variant="primary" size="xs">
            xs
          </InteractiveToggle>
          <InteractiveToggle variant="primary" size="sm" initialPressed>
            sm
          </InteractiveToggle>
          <InteractiveToggle variant="primary" size="md">
            md
          </InteractiveToggle>
          <InteractiveToggle variant="primary" size="lg" initialPressed>
            lg
          </InteractiveToggle>
        </Section>

        <Section title="Shape">
          <InteractiveToggle variant="primary" shape="default">
            default
          </InteractiveToggle>
          <InteractiveToggle variant="primary" shape="rounded" initialPressed>
            rounded
          </InteractiveToggle>
          <InteractiveToggle variant="primary" shape="full">
            full
          </InteractiveToggle>
        </Section>

        <Section title="Border">
          <InteractiveToggle border="none">none</InteractiveToggle>
          <InteractiveToggle border="gray" initialPressed>
            gray
          </InteractiveToggle>
        </Section>

        <Section title="Font">
          <InteractiveToggle font="xs">xs</InteractiveToggle>
          <InteractiveToggle font="xs_sb" initialPressed>
            xs_sb
          </InteractiveToggle>
          <InteractiveToggle font="sm">sm</InteractiveToggle>
          <InteractiveToggle font="sm_sb" initialPressed>
            sm_sb
          </InteractiveToggle>
          <InteractiveToggle font="md">md</InteractiveToggle>
          <InteractiveToggle font="lg" initialPressed>
            lg
          </InteractiveToggle>
          <InteractiveToggle font="lg_sb">lg_sb</InteractiveToggle>
        </Section>
      </main>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "옵션 별 컴포넌트 스타일 프리뷰",
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
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
