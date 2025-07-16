import { Provider } from "jotai";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import QueryProvider from "@/components/@shared/providers/QueryProvider";

import PageLayout from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/PageLayout",
  component: PageLayout,
  parameters: {
    docs: {
      description: {
        component:
          "헤더, 메인 컨텐츠, 네비게이션을 포함한 전체 페이지 레이아웃 컴포넌트입니다.",
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Provider>
        <QueryProvider>
          <HelmetProvider>
            <BrowserRouter>
              <Story />
            </BrowserRouter>
          </HelmetProvider>
        </QueryProvider>
      </Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="space-y-4 px-4">
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold">컨텐츠 섹션 1</h2>
      <p className="text-gray-600">
        이것은 페이지 레이아웃 안에 포함된 샘플 컨텐츠입니다.
      </p>
    </div>
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold">컨텐츠 섹션 2</h2>
      <p className="text-gray-600">
        페이지 레이아웃은 헤더, 메인, 네비게이션을 자동으로 배치합니다.
      </p>
    </div>
  </div>
);

export const BaseHeader: Story = {
  args: {
    headerTitle: "기본 페이지",
    headerType: "base",
    currentPath: "/",
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 헤더를 사용하는 페이지 레이아웃입니다.",
      },
    },
  },
};

export const CommunityHeader: Story = {
  args: {
    headerTitle: "커뮤니티",
    headerType: "community",
    currentPath: "/community",
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "커뮤니티 헤더를 사용하는 페이지 레이아웃입니다.",
      },
    },
  },
};

export const SchoolHeader: Story = {
  args: {
    headerTitle: "유치원 상세",
    headerType: "school",
    currentPath: "/school/1",
    kindergartenId: "1",
    showBookmark: true,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "학교 헤더를 사용하는 페이지 레이아웃입니다.",
      },
    },
  },
};

export const SaveHeader: Story = {
  args: {
    headerTitle: "게시글 작성",
    headerType: "save",
    currentPath: "/community/write",
    onSave: () => alert("저장되었습니다!"),
    children: (
      <div className="px-4">
        <div className="rounded-lg bg-white p-4">
          <h2 className="mb-4 text-lg font-semibold">게시글 작성 폼</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full rounded-lg border p-3"
            />
            <textarea
              placeholder="내용을 입력하세요"
              className="h-32 w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "저장 헤더를 사용하는 페이지 레이아웃입니다.",
      },
    },
  },
};

export const WithLogo: Story = {
  args: {
    headerLogo: true,
    currentPath: "/home",
    showAlarmButton: true,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "로고와 알림 버튼이 있는 페이지 레이아웃입니다.",
      },
    },
  },
};

export const NoNavigation: Story = {
  args: {
    headerTitle: "설정",
    headerType: "base",
    currentPath: "/settings",
    isGlobalNavBar: false,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "하단 네비게이션 없는 페이지 레이아웃입니다.",
      },
    },
  },
};

export const WhiteBackground: Story = {
  args: {
    headerTitle: "화이트 테마",
    headerType: "base",
    currentPath: "/white",
    wrapperBg: "white",
    mainBg: "gray",
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: "흰색 배경을 사용하는 페이지 레이아웃입니다.",
      },
    },
  },
};
