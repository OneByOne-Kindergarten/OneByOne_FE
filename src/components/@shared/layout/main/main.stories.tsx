import Main from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Main",
  component: Main,
  parameters: {
    docs: {
      description: {
        component:
          "페이지의 메인 컨텐츠 영역을 감싸는 컨테이너 컴포넌트입니다.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
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

export const GrayBackground: Story = {
  args: {
    bg: "gray",
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "회색 배경을 사용하는 메인 컨테이너입니다. (기본값)",
      },
    },
  },
};

export const WhiteBackground: Story = {
  args: {
    bg: "white",
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "흰색 배경을 사용하는 메인 컨테이너입니다.",
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    bg: "white",
    className: "p-8 shadow-lg rounded-lg",
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 클래스명이 적용된 메인 컨테이너입니다.",
      },
    },
  },
};

export const MinimalContent: Story = {
  args: {
    bg: "gray",
    children: (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-gray-500">간단한 컨텐츠</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "최소한의 컨텐츠를 포함한 메인 컨테이너입니다.",
      },
    },
  },
};
