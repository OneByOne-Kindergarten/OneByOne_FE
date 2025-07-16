import { fn } from "@storybook/test";

import BookmarkHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/BookmarkHeader",
  component: BookmarkHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
즐겨찾기 전용 헤더 컴포넌트입니다. BaseHeader를 확장하여 북마크 기능을 추가했습니다.

**주요 특징:**
- BaseHeader의 모든 기능 포함
- 북마크 버튼 자동 포함
- 간단한 북마크 토글 인터페이스

**사용 시나리오:**
- 즐겨찾기 목록 페이지
- 즐겨찾기 관리 페이지
- 북마크 컬렉션 페이지

**디자인 특징:**
- 최소한의 인터페이스
- 북마크 아이콘 중심 설계
- 일관된 사용자 경험 제공
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: "헤더에 표시될 제목",
      control: "text",
    },
    hasBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
    },
    hasBorder: {
      description: "하단 경계선 표시 여부",
      control: "boolean",
    },
    onBackButtonClick: {
      description: "뒤로가기 버튼 클릭 핸들러",
      action: "back clicked",
    },
  },
} satisfies Meta<typeof BookmarkHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 즐겨찾기 헤더
export const Default: Story = {
  args: {
    title: "즐겨찾기",
    hasBackButton: false,
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 즐겨찾기 헤더입니다. 북마크 버튼과 제목이 표시됩니다.",
      },
    },
  },
};

// 뒤로가기 버튼이 있는 헤더
export const WithBackButton: Story = {
  args: {
    title: "내 즐겨찾기",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "뒤로가기 버튼이 포함된 즐겨찾기 헤더입니다. 서브 페이지에서 사용됩니다.",
      },
    },
  },
};

// 즐겨찾기 컬렉션 페이지
export const CollectionPage: Story = {
  args: {
    title: "즐겨찾기 컬렉션",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "즐겨찾기 컬렉션 관리 페이지의 헤더입니다.",
      },
    },
  },
};

// 즐겨찾기 유치원 목록
export const SchoolBookmarks: Story = {
  args: {
    title: "즐겨찾기 유치원",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "즐겨찾기한 유치원 목록 페이지의 헤더입니다.",
      },
    },
  },
};

// 경계선 없는 버전
export const WithoutBorder: Story = {
  args: {
    title: "즐겨찾기",
    hasBackButton: true,
    hasBorder: false,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "하단 경계선이 없는 즐겨찾기 헤더입니다. 시각적으로 더 간결한 표현이 필요한 경우 사용됩니다.",
      },
    },
  },
};

// 긴 제목 테스트
export const LongTitle: Story = {
  args: {
    title: "나의 소중한 즐겨찾기 컬렉션",
    hasBackButton: true,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "긴 제목을 가진 즐겨찾기 헤더입니다. 텍스트 오버플로우 처리를 확인할 수 있습니다.",
      },
    },
  },
};

// 사용 시나리오별 비교
export const UsageScenarios: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="border-b bg-white p-2 text-center">
        <h3 className="font-semibold">즐겨찾기 헤더 사용 시나리오</h3>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-600">메인 즐겨찾기 페이지</p>
          <BookmarkHeader title="즐겨찾기" hasBackButton={false} />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">즐겨찾기 유치원 목록</p>
          <BookmarkHeader title="즐겨찾기 유치원" hasBackButton />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">즐겨찾기 게시글 목록</p>
          <BookmarkHeader title="즐겨찾기 게시글" hasBackButton />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">즐겨찾기 설정 페이지</p>
          <BookmarkHeader title="즐겨찾기 설정" hasBackButton />
        </div>
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "즐겨찾기 헤더의 다양한 사용 시나리오를 한눈에 비교해볼 수 있습니다. 각 페이지 유형에 따른 헤더 구성을 확인하세요.",
      },
    },
  },
};

// 북마크 버튼 상호작용 시뮬레이션
export const BookmarkInteraction: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="border-b bg-white p-2 text-center">
        <h3 className="font-semibold">북마크 버튼 상호작용</h3>
        <p className="mt-1 text-xs text-gray-600">
          * 북마크 버튼을 클릭해보세요 (현재는 TODO 상태)
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-600">기본 상태</p>
          <BookmarkHeader title="즐겨찾기" hasBackButton={false} />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">경계선 없는 상태</p>
          <BookmarkHeader
            title="즐겨찾기"
            hasBackButton={false}
            hasBorder={false}
          />
        </div>
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "북마크 버튼의 상호작용을 테스트할 수 있습니다. 현재는 TODO 상태이므로 실제 기능은 구현되지 않았습니다.",
      },
    },
  },
};
