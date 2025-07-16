import { fn } from "@storybook/test";
import { BrowserRouter } from "react-router-dom";

import CommunityHeader from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Layout/Headers/CommunityHeader",
  component: CommunityHeader,
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
커뮤니티 전용 헤더 컴포넌트입니다. BaseHeader를 확장하여 검색과 글쓰기 기능을 추가했습니다.

**주요 특징:**
- BaseHeader의 모든 기능 포함
- 커뮤니티 검색 기능
- 카테고리별 글쓰기 버튼
- 선생님/예비선생님 카테고리 지원

**사용 시나리오:**
- 커뮤니티 메인 페이지
- 카테고리별 게시글 목록
- 게시글 검색 페이지

**특별 기능:**
- 카테고리에 따른 검색 경로 자동 설정
- 글쓰기 권한에 따른 버튼 표시
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
    hasWriteButton: {
      description: "글쓰기 버튼 표시 여부",
      control: "boolean",
    },
    category: {
      description: "커뮤니티 카테고리",
      options: ["TEACHER", "PROSPECTIVE_TEACHER"],
      control: { type: "select" },
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
} satisfies Meta<typeof CommunityHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 커뮤니티 헤더 (로고 + 검색)
export const Default: Story = {
  args: {
    headerLogo: true,
    hasWriteButton: false,
    category: "TEACHER",
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "로고와 검색 기능만 있는 기본 커뮤니티 헤더입니다. 메인 커뮤니티 페이지에서 사용됩니다.",
      },
    },
  },
};

// 글쓰기 버튼이 있는 헤더
export const WithWriteButton: Story = {
  args: {
    headerLogo: true,
    hasWriteButton: true,
    category: "TEACHER",
    hasBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "글쓰기 권한이 있는 사용자에게 표시되는 헤더입니다. 검색과 글쓰기 버튼이 모두 포함됩니다.",
      },
    },
  },
};

// 선생님 카테고리 헤더
export const TeacherCategory: Story = {
  args: {
    title: "선생님 커뮤니티",
    hasBackButton: true,
    hasWriteButton: true,
    category: "TEACHER",
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "선생님 카테고리 페이지의 헤더입니다. 선생님 전용 검색 경로로 연결됩니다.",
      },
    },
  },
};

// 예비선생님 카테고리 헤더
export const ProspectiveTeacherCategory: Story = {
  args: {
    title: "예비선생님 커뮤니티",
    hasBackButton: true,
    hasWriteButton: true,
    category: "PROSPECTIVE_TEACHER",
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "예비선생님 카테고리 페이지의 헤더입니다. 예비선생님 전용 검색 경로로 연결됩니다.",
      },
    },
  },
};

// 글쓰기 권한 없는 사용자
export const NoWritePermission: Story = {
  args: {
    title: "커뮤니티",
    hasBackButton: true,
    hasWriteButton: false,
    category: "TEACHER",
    hasBorder: true,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "글쓰기 권한이 없는 사용자(비회원, 미인증)에게 표시되는 헤더입니다. 검색만 가능합니다.",
      },
    },
  },
};

// 경계선 없는 버전
export const WithoutBorder: Story = {
  args: {
    title: "커뮤니티",
    hasBackButton: true,
    hasWriteButton: true,
    category: "TEACHER",
    hasBorder: false,
    onBackButtonClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "하단 경계선이 없는 커뮤니티 헤더입니다. 시각적으로 더 간결한 표현이 필요한 경우 사용됩니다.",
      },
    },
  },
};

// 기능별 상태 비교
export const FeatureComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="border-b bg-white p-2 text-center">
        <h3 className="font-semibold">커뮤니티 헤더 기능별 비교</h3>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-600">기본 (로고 + 검색)</p>
          <CommunityHeader
            headerLogo
            hasWriteButton={false}
            category="TEACHER"
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">
            글쓰기 포함 (로고 + 검색 + 글쓰기)
          </p>
          <CommunityHeader headerLogo hasWriteButton category="TEACHER" />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">
            카테고리 페이지 (제목 + 뒤로가기 + 검색 + 글쓰기)
          </p>
          <CommunityHeader
            title="선생님 커뮤니티"
            hasBackButton
            hasWriteButton
            category="TEACHER"
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">
            권한 없음 (제목 + 뒤로가기 + 검색만)
          </p>
          <CommunityHeader
            title="커뮤니티"
            hasBackButton
            hasWriteButton={false}
            category="TEACHER"
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
          "커뮤니티 헤더의 다양한 기능 조합을 한눈에 비교해볼 수 있습니다. 사용자 권한과 페이지 유형에 따른 헤더 변화를 확인하세요.",
      },
    },
  },
};
