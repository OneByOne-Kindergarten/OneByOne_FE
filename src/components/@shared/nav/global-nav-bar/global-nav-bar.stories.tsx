import GlobalNavBar from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Navigations/GlobalNavBar",
  component: GlobalNavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
전역 하단 네비게이션 바 컴포넌트입니다. 앱의 주요 섹션 간 이동을 담당합니다.

**주요 특징:**
- 5개 주요 탭 (홈, 유치원, 커뮤니티, 즐겨찾기, 프로필)
- 현재 경로에 따른 활성 상태 표시
- 아이콘과 라벨 조합
- 접근성 지원 (aria-label, role)
- React Router 통합

**네비게이션 항목:**
- 홈: 메인 대시보드
- 유치원: 기관 검색 및 정보
- 커뮤니티: 게시글 및 소통
- 즐겨찾기: 저장된 항목들
- 프로필: 사용자 설정 및 정보

**상태 관리:**
- URL 경로 기반 활성 상태 판단
- 세션 스토리지 값과 쿼리 파라미터 고려한 경로 매칭
- 커뮤니티 게시글 페이지 특별 처리
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen bg-gray-50">
        <div className="absolute bottom-0 w-full">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    currentPath: {
      description: "현재 페이지 경로",
      control: "text",
    },
  },
} satisfies Meta<typeof GlobalNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  args: {
    currentPath: "/",
  },
  parameters: {
    docs: {
      description: {
        story:
          "홈 페이지에서의 네비게이션 바입니다. 홈 탭이 활성화되어 있습니다.",
      },
    },
  },
};

export const SchoolPage: Story = {
  args: {
    currentPath: "/school",
  },
  parameters: {
    docs: {
      description: {
        story:
          "유치원 검색 페이지에서의 네비게이션 바입니다. 유치원 탭이 활성화되어 있습니다.",
      },
    },
  },
};

export const CommunityPage: Story = {
  args: {
    currentPath: "/community",
  },
  parameters: {
    docs: {
      description: {
        story:
          "커뮤니티 페이지에서의 네비게이션 바입니다. 커뮤니티 탭이 활성화되어 있습니다.",
      },
    },
  },
};

export const BookmarksPage: Story = {
  args: {
    currentPath: "/bookmarks",
  },
  parameters: {
    docs: {
      description: {
        story:
          "즐겨찾기 페이지에서의 네비게이션 바입니다. 즐겨찾기 탭이 활성화되어 있습니다.",
      },
    },
  },
};

export const UserPage: Story = {
  args: {
    currentPath: "/user",
  },
  parameters: {
    docs: {
      description: {
        story:
          "사용자 프로필 페이지에서의 네비게이션 바입니다. 프로필 탭이 활성화되어 있습니다.",
      },
    },
  },
};
