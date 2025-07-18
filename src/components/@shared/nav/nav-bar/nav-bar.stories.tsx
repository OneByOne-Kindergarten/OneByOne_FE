import NavBar from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Navigations/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
페이지 내 카테고리 탐색을 담당하는 네비게이션 바 컴포넌트입니다.

**기능:**
- 동적 옵션 설정 가능
- 아이콘과 텍스트 조합 커스터마이징 가능
- 현재 경로 기반 활성 상태 표시
- 쿼리 파라미터 매칭 지원

**사용 시나리오:**
- 커뮤니티 교사, 예비교사 카테고리
- 유치원 근무 리뷰, 실습 리뷰 카테고리
- 문의사항 답변완료, 답변대기 카테고리

**동적 ID 지원:**
- URL 패턴에서 :id 플레이스홀더 사용
- 런타임에 실제 ID로 치환
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md rounded-lg border bg-white p-4">
        <Story />
      </div>
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

export const CommunityCategories: Story = {
  args: {
    options: [
      {
        href: "/community?category=teacher",
        label: "교사",
        icon: {
          path: "/src/assets/icons/character-chicken.svg",
          alt: "교사 아이콘",
          width: 16,
          height: 16,
        },
      },
      {
        href: "/community?category=parent",
        label: "예비교사",
        icon: {
          path: "/src/assets/icons/character-chick.svg",
          alt: "예비교사 아이콘",
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
          "교사, 예비교사 카테고리로 구성된 커뮤니티 페이지 네비게이션입니다.  .",
      },
    },
  },
};
