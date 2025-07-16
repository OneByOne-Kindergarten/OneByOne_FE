import { fn } from "@storybook/test";
import { BrowserRouter } from "react-router-dom";

import SchoolHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/SchoolHeader",
  component: SchoolHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
유치원 검색 및 상세 정보 전용 헤더 컴포넌트입니다. BaseHeader를 확장하여 즐겨찾기와 검색 기능을 추가했습니다.

**주요 특징:**
- BaseHeader의 모든 기능 포함
- 유치원 검색 기능
- 즐겨찾기 토글 기능
- 실시간 즐겨찾기 상태 동기화

**사용 시나리오:**
- 유치원 메인 페이지
- 유치원 상세 정보 페이지
- 유치원 검색 결과 페이지

**특별 기능:**
- 로그인 사용자의 즐겨찾기 상태 확인
- 즐겨찾기 추가/제거 토글
- 네트워크 요청 중 로딩 상태 처리
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: "헤더에 표시될 제목",
      control: "text",
    },
    headerLogo: {
      description: "원바원 로고 표시 여부",
      control: "boolean",
    },
    hasBackButton: {
      description: "뒤로가기 버튼 표시 여부",
      control: "boolean",
    },
    showBookmark: {
      description: "즐겨찾기 버튼 표시 여부",
      control: "boolean",
    },
    kindergartenId: {
      description: "유치원 ID (즐겨찾기 기능용)",
      control: "text",
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
} satisfies Meta<typeof SchoolHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 유치원 헤더 (로고 + 검색)
export const Default: Story = {
  args: {
    headerLogo: true,
    showBookmark: false,
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "로고와 검색 기능만 있는 기본 유치원 헤더입니다. 메인 유치원 페이지에서 사용됩니다.",
      },
    },
  },
};

// 유치원 상세 페이지 헤더 (즐겨찾기 포함)
export const SchoolDetail: Story = {
  args: {
    title: "서울유치원",
    hasBackButton: true,
    showBookmark: true,
    kindergartenId: "123",
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "유치원 상세 페이지의 헤더입니다. 즐겨찾기 추가/제거가 가능합니다.",
      },
    },
  },
};

// 유치원 검색 결과 헤더
export const SearchResults: Story = {
  args: {
    title: "유치원 검색",
    hasBackButton: true,
    showBookmark: false,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 검색 결과 페이지의 헤더입니다. 검색 기능만 제공합니다.",
      },
    },
  },
};

// 로그인 전 사용자 (즐겨찾기 비활성화)
export const GuestUser: Story = {
  args: {
    title: "서울유치원",
    hasBackButton: true,
    showBookmark: false,
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "비로그인 사용자에게 표시되는 헤더입니다. 즐겨찾기 기능이 비활성화됩니다.",
      },
    },
  },
};

// 경계선 없는 버전
export const WithoutBorder: Story = {
  args: {
    title: "유치원 정보",
    hasBackButton: true,
    showBookmark: true,
    kindergartenId: "456",
    hasBorder: false,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "하단 경계선이 없는 유치원 헤더입니다. 시각적으로 더 간결한 표현이 필요한 경우 사용됩니다.",
      },
    },
  },
};

// 긴 제목 테스트
export const LongTitle: Story = {
  args: {
    title: "서울특별시교육청직장어린이집부설유치원",
    hasBackButton: true,
    showBookmark: true,
    kindergartenId: "789",
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "긴 유치원 이름을 가진 헤더입니다. 텍스트 오버플로우 처리를 확인할 수 있습니다.",
      },
    },
  },
};

// 기능별 상태 비교
export const FeatureComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="border-b bg-white p-2 text-center">
        <h3 className="font-semibold">유치원 헤더 기능별 비교</h3>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-600">
            메인 페이지 (로고 + 검색)
          </p>
          <SchoolHeader headerLogo showBookmark={false} />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">
            로그인 사용자 상세 (제목 + 뒤로가기 + 즐겨찾기 + 검색)
          </p>
          <SchoolHeader
            title="서울유치원"
            hasBackButton
            showBookmark
            kindergartenId="123"
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">
            비로그인 사용자 상세 (제목 + 뒤로가기 + 검색)
          </p>
          <SchoolHeader title="서울유치원" hasBackButton showBookmark={false} />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">
            검색 결과 (제목 + 뒤로가기 + 검색)
          </p>
          <SchoolHeader
            title="유치원 검색"
            hasBackButton
            showBookmark={false}
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
          "유치원 헤더의 다양한 기능 조합을 한눈에 비교해볼 수 있습니다. 사용자 로그인 상태와 페이지 유형에 따른 헤더 변화를 확인하세요.",
      },
    },
  },
};

// 즐겨찾기 상태 시뮬레이션
export const BookmarkStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="border-b bg-white p-2 text-center">
        <h3 className="font-semibold">즐겨찾기 상태별 헤더</h3>
        <p className="mt-1 text-xs text-gray-600">
          * 실제 즐겨찾기 상태는 서버 데이터에 따라 동적으로 변경됩니다
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-600">즐겨찾기 추가 가능</p>
          <SchoolHeader
            title="서울유치원"
            hasBackButton
            showBookmark
            kindergartenId="100"
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">
            다른 유치원 (독립적 상태)
          </p>
          <SchoolHeader
            title="부산유치원"
            hasBackButton
            showBookmark
            kindergartenId="200"
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
          "즐겨찾기 기능의 다양한 상태를 확인할 수 있습니다. 각 유치원별로 독립적인 즐겨찾기 상태를 가집니다.",
      },
    },
  },
};
