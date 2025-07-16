import { fn } from "@storybook/test";

import PostButton from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Buttons/PostButton",
  component: PostButton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
게시글 작성을 위한 플로팅 액션 버튼입니다. FloatButton을 기반으로 한 특수한 용도의 버튼입니다.

**주요 특징:**
- 화면 우하단에 고정 배치
- 게시글 작성 아이콘과 텍스트 조합
- 활성/비활성 상태 지원
- 그림자 효과로 시각적 강조
- 클릭 시 게시글 작성 페이지로 이동

**사용 시나리오:**
- 커뮤니티 페이지
- 리뷰 작성 페이지
- 사진 업로드 페이지
- 기타 콘텐츠 생성 페이지

**디자인 가이드:**
- 항상 접근 가능한 위치에 배치
- 명확한 라벨로 사용자 의도 표현
- 비활성 상태는 권한이나 조건 부족 시 사용
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-96 w-full overflow-hidden rounded-lg border bg-gray-50">
        <div className="p-4 text-sm text-gray-600">
          게시글 작성 버튼이 우하단에 표시됩니다.
        </div>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      description: "버튼에 표시될 텍스트",
      control: "text",
    },
    isDisabled: {
      description: "버튼 비활성화 상태",
      control: "boolean",
    },
    onClick: {
      description: "클릭 이벤트 핸들러",
      action: "clicked",
    },
  },
} satisfies Meta<typeof PostButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 게시글 작성 버튼
export const Default: Story = {
  args: {
    label: "글쓰기",
    isDisabled: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 상태의 게시글 작성 버튼입니다. 활성화되어 있어 클릭할 수 있습니다.",
      },
    },
  },
};

// 커뮤니티 게시글 작성
export const CommunityPost: Story = {
  args: {
    label: "게시글 작성",
    isDisabled: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "커뮤니티 페이지에서 사용되는 게시글 작성 버튼입니다.",
      },
    },
  },
};

// 리뷰 작성 버튼
export const ReviewPost: Story = {
  args: {
    label: "리뷰 작성",
    isDisabled: false,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 상세 페이지에서 사용되는 리뷰 작성 버튼입니다.",
      },
    },
  },
};

// 비활성화된 버튼 (권한 없음)
export const DisabledNoPermission: Story = {
  args: {
    label: "글쓰기",
    isDisabled: true,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "권한이 없거나 로그인이 필요한 상태의 비활성화된 버튼입니다. 회원가입 유도나 권한 안내에 사용됩니다.",
      },
    },
  },
};

// 비활성화된 버튼 (조건 미충족)
export const DisabledConditionNotMet: Story = {
  args: {
    label: "인증 후 작성",
    isDisabled: true,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "특정 조건(인증, 레벨 등)을 충족하지 않아 비활성화된 상태입니다. 조건 충족 유도 메시지를 포함할 수 있습니다.",
      },
    },
  },
};

// 다양한 라벨 길이 테스트
export const VariousLabels: Story = {
  args: {
    label: "테스트",
    onClick: fn(),
  },
  render: () => (
    <div className="space-y-4">
      <div className="border-b bg-white p-2 text-center">
        <h3 className="font-semibold">다양한 라벨 길이 테스트</h3>
      </div>

      <div className="grid h-72 grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-lg border bg-gray-50">
          <div className="p-2 text-xs text-gray-600">짧은 라벨</div>
          <PostButton label="작성" onClick={fn()} />
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-gray-50">
          <div className="p-2 text-xs text-gray-600">중간 라벨</div>
          <PostButton label="게시글 작성" onClick={fn()} />
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-gray-50">
          <div className="p-2 text-xs text-gray-600">긴 라벨</div>
          <PostButton label="새로운 게시글 작성하기" onClick={fn()} />
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-gray-50">
          <div className="p-2 text-xs text-gray-600">비활성화</div>
          <PostButton label="권한 필요" isDisabled onClick={fn()} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "다양한 길이의 라벨과 상태를 가진 버튼들을 비교해볼 수 있습니다. 라벨 길이에 따른 버튼 크기 변화를 확인하세요.",
      },
    },
  },
};

// 상태 변화 시뮬레이션
export const StateTransition: Story = {
  args: {
    label: "테스트",
    onClick: fn(),
  },
  render: () => {
    const StateButton = ({
      scenario,
      description,
    }: {
      scenario: string;
      description: string;
    }) => {
      const getButtonProps = () => {
        switch (scenario) {
          case "guest":
            return { label: "로그인 후 작성", isDisabled: true };
          case "unverified":
            return { label: "인증 후 작성", isDisabled: true };
          case "verified":
            return { label: "게시글 작성", isDisabled: false };
          case "posting":
            return { label: "작성 중...", isDisabled: true };
          default:
            return { label: "작성", isDisabled: false };
        }
      };

      const props = getButtonProps();

      return (
        <div className="relative h-32 overflow-hidden rounded-lg border bg-gray-50">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-800">
              {scenario}
            </div>
            <div className="mt-1 text-xs text-gray-600">{description}</div>
          </div>
          <PostButton {...props} onClick={fn()} />
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <div className="border-b bg-white p-2 text-center">
          <h3 className="font-semibold">사용자 상태별 버튼 변화</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StateButton scenario="guest" description="비로그인 사용자" />
          <StateButton scenario="unverified" description="미인증 사용자" />
          <StateButton scenario="verified" description="인증된 사용자" />
          <StateButton scenario="posting" description="게시글 작성 중" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "사용자의 상태(로그인, 인증, 권한)에 따른 버튼의 상태 변화를 시뮬레이션합니다. 각 상황에 맞는 라벨과 활성화 상태를 확인하세요.",
      },
    },
  },
};
