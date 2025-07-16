import { BrowserRouter } from "react-router-dom";

import NavBar from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Navigation/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
서브 네비게이션 바 컴포넌트입니다. 특정 섹션 내에서의 카테고리 탐색을 담당합니다.

**주요 특징:**
- 동적 옵션 설정 가능
- 아이콘과 텍스트 조합 지원
- 현재 경로 기반 활성 상태 표시
- 쿼리 파라미터 매칭 지원
- 커스터마이징 가능한 스타일

**사용 시나리오:**
- 커뮤니티 카테고리 탐색
- 유치원 검색 필터
- 설정 메뉴 탐색
- 서브 페이지 네비게이션

**동적 ID 지원:**
- URL 패턴에서 :id 플레이스홀더 사용
- 런타임에 실제 ID로 치환
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-full max-w-md rounded-lg border bg-white p-4">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    options: {
      description: "네비게이션 옵션 배열",
      control: "object",
    },
    currentPath: {
      description: "현재 페이지 경로",
      control: "text",
    },
    id: {
      description: "동적 URL에 사용될 ID",
      control: "text",
    },
    className: {
      description: "커스텀 CSS 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 커뮤니티 카테고리 네비게이션
export const CommunityCategories: Story = {
  args: {
    options: [
      {
        href: "/community",
        label: "전체",
      },
      {
        href: "/community?category=teacher",
        label: "선생님",
        icon: {
          path: "/src/assets/icons/character-user.svg",
          alt: "선생님 아이콘",
          width: 16,
          height: 16,
        },
      },
      {
        href: "/community?category=parent",
        label: "학부모",
        icon: {
          path: "/src/assets/icons/child.svg",
          alt: "학부모 아이콘",
          width: 16,
          height: 16,
        },
      },
      {
        href: "/community?category=principal",
        label: "원장님",
        icon: {
          path: "/src/assets/icons/boss.svg",
          alt: "원장님 아이콘",
          width: 16,
          height: 16,
        },
      },
    ],
    currentPath: "/community?category=teacher",
  },
  parameters: {
    docs: {
      description: {
        story:
          "커뮤니티 페이지의 카테고리 네비게이션입니다. 선생님 카테고리가 활성화되어 있습니다.",
      },
    },
  },
};

// 유치원 검색 필터
export const SchoolSearchFilters: Story = {
  args: {
    options: [
      {
        href: "/search/school",
        label: "전체",
      },
      {
        href: "/search/school?type=public",
        label: "공립",
      },
      {
        href: "/search/school?type=private",
        label: "사립",
      },
      {
        href: "/search/school?type=corporate",
        label: "법인",
      },
    ],
    currentPath: "/search/school?type=public&location=seoul",
  },
  parameters: {
    docs: {
      description: {
        story:
          "유치원 검색 페이지의 타입 필터 네비게이션입니다. 공립 필터가 활성화되어 있고, 다른 쿼리 파라미터와 함께 사용됩니다.",
      },
    },
  },
};

// 설정 메뉴 네비게이션
export const SettingsMenu: Story = {
  args: {
    options: [
      {
        href: "/user/profile",
        label: "프로필 설정",
        icon: {
          path: "/src/assets/icons/user-active.svg",
          alt: "프로필 아이콘",
          width: 18,
          height: 18,
        },
      },
      {
        href: "/user/notifications",
        label: "알림 설정",
        icon: {
          path: "/src/assets/icons/notifications_on.svg",
          alt: "알림 아이콘",
          width: 18,
          height: 18,
        },
      },
      {
        href: "/user/security",
        label: "보안 설정",
        icon: {
          path: "/src/assets/icons/setting.svg",
          alt: "보안 아이콘",
          width: 18,
          height: 18,
        },
      },
    ],
    currentPath: "/user/notifications",
    className: "flex flex-col gap-3 bg-gray-50 p-3 rounded-lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "사용자 설정 페이지의 메뉴 네비게이션입니다. 세로 레이아웃과 커스텀 스타일링을 적용했습니다.",
      },
    },
  },
};

// 동적 ID가 포함된 네비게이션
export const DynamicIdNavigation: Story = {
  args: {
    id: "123",
    options: [
      {
        href: "/school/:id",
        label: "기본 정보",
      },
      {
        href: "/school/:id/reviews",
        label: "리뷰",
      },
      {
        href: "/school/:id/photos",
        label: "사진",
      },
      {
        href: "/school/:id/location",
        label: "위치",
      },
    ],
    currentPath: "/school/123/reviews",
  },
  parameters: {
    docs: {
      description: {
        story:
          "동적 ID가 포함된 네비게이션입니다. :id 플레이스홀더가 실제 ID(123)로 치환되어 동작합니다.",
      },
    },
  },
};

// 아이콘 없는 텍스트 전용 네비게이션
export const TextOnlyNavigation: Story = {
  args: {
    options: [
      {
        href: "/reviews",
        label: "전체 리뷰",
      },
      {
        href: "/reviews?rating=5",
        label: "5점",
      },
      {
        href: "/reviews?rating=4",
        label: "4점",
      },
      {
        href: "/reviews?rating=3",
        label: "3점 이하",
      },
    ],
    currentPath: "/reviews?rating=5",
  },
  parameters: {
    docs: {
      description: {
        story:
          "아이콘 없이 텍스트만 사용하는 간단한 네비게이션입니다. 리뷰 평점 필터링에 사용됩니다.",
      },
    },
  },
};

// 커스텀 스타일 네비게이션
export const CustomStyledNavigation: Story = {
  args: {
    options: [
      {
        href: "/dashboard/overview",
        label: "개요",
      },
      {
        href: "/dashboard/analytics",
        label: "분석",
      },
      {
        href: "/dashboard/reports",
        label: "보고서",
      },
    ],
    currentPath: "/dashboard/analytics",
    className:
      "flex justify-center gap-8 bg-blue-50 py-4 px-6 rounded-full text-sm font-medium",
  },
  parameters: {
    docs: {
      description: {
        story:
          "커스텀 스타일이 적용된 네비게이션입니다. 배경색, 간격, 모서리 등을 조정하여 다른 디자인을 만들 수 있습니다.",
      },
    },
  },
};

// 긴 라벨 테스트
export const LongLabelsNavigation: Story = {
  args: {
    options: [
      {
        href: "/categories/early-childhood",
        label: "유아교육",
      },
      {
        href: "/categories/special-programs",
        label: "특별프로그램운영",
      },
      {
        href: "/categories/teacher-development",
        label: "교사전문성개발지원",
      },
    ],
    currentPath: "/categories/special-programs",
    className: "flex gap-3 text-xs",
  },
  parameters: {
    docs: {
      description: {
        story:
          "긴 라벨을 가진 네비게이션 항목들의 표시 방식을 확인할 수 있습니다. 텍스트 오버플로우 처리를 확인하세요.",
      },
    },
  },
};
