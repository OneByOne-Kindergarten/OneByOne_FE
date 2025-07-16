import { fn } from "@storybook/test";

import Button from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/Buttons/BaseButton",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
기본 버튼 컴포넌트입니다. CVA(Class Variance Authority)를 사용하여 다양한 스타일 변형을 지원합니다.

**주요 특징:**
- 8가지 variant (primary, secondary, tertiary, destructive, transparent, transparent_gray, link, default)
- 4가지 size (xs, sm, md, lg)
- 3가지 shape (default, rounded, full)
- 4가지 border 옵션 (gray, blue, black, none)
- 3가지 shadow 옵션 (sm, md, lg)
- 8가지 font 크기/굵기 조합

**타입 안전성:**
- TypeScript 완전 지원
- Radix UI Slot 기반 polymorphic 컴포넌트
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: "버튼의 시각적 스타일",
      options: [
        "default",
        "primary",
        "secondary",
        "tertiary",
        "destructive",
        "transparent",
        "transparent_gray",
        "link",
      ],
      control: { type: "select" },
    },
    size: {
      description: "버튼의 패딩 크기",
      options: ["xs", "sm", "md", "lg"],
      control: { type: "select" },
    },
    shape: {
      description: "버튼의 모서리 형태",
      options: ["default", "rounded", "full"],
      control: { type: "select" },
    },
    border: {
      description: "테두리 스타일",
      options: ["none", "gray", "blue", "black"],
      control: { type: "select" },
    },
    shadow: {
      description: "그림자 효과",
      options: [undefined, "sm", "md", "lg"],
      control: { type: "select" },
    },
    font: {
      description: "폰트 크기와 굵기",
      options: ["xs", "xs_sb", "sm", "sm_sb", "md", "md_sb", "lg", "lg_sb"],
      control: { type: "select" },
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
    },
    onClick: {
      description: "클릭 이벤트 핸들러",
      action: "clicked",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: "기본 버튼",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "기본 스타일의 버튼입니다.",
      },
    },
  },
};

// 주요 액션 버튼 (로그인, 가입 등)
export const Submit: Story = {
  render: () => (
    <div className="flex w-48 flex-col gap-4">
      <Button variant="primary" size="lg" onClick={fn()}>
        로그인
      </Button>
      <Button variant="primary" size="lg" disabled onClick={fn()}>
        로그인 (비활성화)
      </Button>
      <Button variant="secondary" size="lg" onClick={fn()}>
        회원가입
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "주요 액션에 사용되는 버튼들입니다. 로그인, 회원가입 등의 중요한 작업에 사용됩니다.",
      },
    },
  },
};

// 보조 액션 버튼
export const Secondary: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="transparent" size="sm" onClick={fn()}>
        취소
      </Button>
      <Button variant="transparent_gray" size="sm" onClick={fn()}>
        뒤로가기
      </Button>
      <Button variant="tertiary" size="sm" border="blue" onClick={fn()}>
        확인
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "보조 액션에 사용되는 버튼들입니다. 취소, 확인 등의 부가적인 작업에 사용됩니다.",
      },
    },
  },
};

// 카테고리/태그 버튼
export const CategoryTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" shape="rounded" onClick={fn()}>
        선생님
      </Button>
      <Button
        variant="default"
        size="sm"
        shape="rounded"
        border="gray"
        onClick={fn()}
      >
        학부모
      </Button>
      <Button variant="secondary" size="xs" shape="full" onClick={fn()}>
        공립
      </Button>
      <Button
        variant="default"
        size="xs"
        shape="full"
        border="gray"
        onClick={fn()}
      >
        사립
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "카테고리나 태그 선택에 사용되는 버튼들입니다. 선택 상태에 따라 다른 스타일을 적용합니다.",
      },
    },
  },
};

// 위험한 액션 버튼
export const Destructive: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="destructive" size="md" onClick={fn()}>
        삭제
      </Button>
      <Button variant="destructive" size="sm" shape="rounded" onClick={fn()}>
        탈퇴하기
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "위험한 액션에 사용되는 버튼들입니다. 삭제, 탈퇴 등 신중한 결정이 필요한 작업에 사용됩니다.",
      },
    },
  },
};

// 링크 스타일 버튼
export const LinkStyle: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button variant="link" font="sm" onClick={fn()}>
        더 보기
      </Button>
      <Button variant="link" font="xs" onClick={fn()}>
        이용약관 보기
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "링크처럼 보이는 버튼들입니다. 부가 정보나 외부 링크 이동에 사용됩니다.",
      },
    },
  },
};

// 그림자 효과 버튼
export const WithShadows: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <Button variant="primary" shadow="sm" onClick={fn()}>
        Shadow SM
      </Button>
      <Button variant="secondary" shadow="md" onClick={fn()}>
        Shadow MD
      </Button>
      <Button variant="tertiary" shadow="lg" border="blue" onClick={fn()}>
        Shadow LG
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "그림자 효과가 적용된 버튼들입니다. 시각적 깊이감이 필요한 경우 사용됩니다.",
      },
    },
  },
};

// 모든 크기 비교
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Button variant="primary" size="xs" onClick={fn()}>
        XS
      </Button>
      <Button variant="primary" size="sm" onClick={fn()}>
        SM
      </Button>
      <Button variant="primary" size="md" onClick={fn()}>
        MD
      </Button>
      <Button variant="primary" size="lg" onClick={fn()}>
        LG
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 크기 옵션을 비교해볼 수 있습니다.",
      },
    },
  },
};

// 폰트 크기 비교
export const FontComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button variant="secondary" font="xs" onClick={fn()}>
          XS
        </Button>
        <Button variant="secondary" font="xs_sb" onClick={fn()}>
          XS Bold
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" font="sm" onClick={fn()}>
          SM
        </Button>
        <Button variant="secondary" font="sm_sb" onClick={fn()}>
          SM Bold
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" font="md" onClick={fn()}>
          MD
        </Button>
        <Button variant="secondary" font="md_sb" onClick={fn()}>
          MD Bold
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" font="lg" onClick={fn()}>
          LG
        </Button>
        <Button variant="secondary" font="lg_sb" onClick={fn()}>
          LG Bold
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 폰트 크기와 굵기 옵션을 비교해볼 수 있습니다.",
      },
    },
  },
};
