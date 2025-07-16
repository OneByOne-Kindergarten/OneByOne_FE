import PageWrapper from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/PageWrapper",
  component: PageWrapper,
  parameters: {
    docs: {
      description: {
        component:
          "페이지의 최상위 컨테이너로, 전체 레이아웃의 기본 구조를 제공합니다.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const GrayBackground: Story = {
  args: {
    bg: "gray",
    children: <SamplePage />,
  },
  parameters: {
    docs: {
      description: {
        story: "회색 배경을 사용하는 페이지 래퍼입니다. (기본값)",
      },
    },
  },
};

export const WhiteBackground: Story = {
  args: {
    bg: "white",
    children: <SamplePage />,
  },
  parameters: {
    docs: {
      description: {
        story: "흰색 배경을 사용하는 페이지 래퍼입니다.",
      },
    },
  },
};
