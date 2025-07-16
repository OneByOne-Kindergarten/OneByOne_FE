import { SVG_PATHS } from "@/constants/assets-path";

import BaseDropDown from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Interactive/DropDowns/BaseDropDown",
  component: BaseDropDown,
  parameters: {
    docs: {
      description: {
        component: "다양한 옵션과 설정을 제공하는 드롭다운 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BaseDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: "편집하기", onClick: () => alert("편집하기 클릭") },
  { label: "공유하기", onClick: () => alert("공유하기 클릭") },
  {
    label: "삭제하기",
    onClick: () => alert("삭제하기 클릭"),
    variant: "destructive" as const,
  },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 케밥 메뉴 아이콘을 사용하는 드롭다운입니다.",
      },
    },
  },
};

export const WithCustomTrigger: Story = {
  args: {
    options: defaultOptions,
    trigger: (
      <button className="rounded-lg bg-primary-normal01 px-4 py-2 text-white">
        메뉴 열기
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 트리거 버튼을 사용한 드롭다운입니다.",
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      {
        label: "프로필 보기",
        onClick: () => alert("프로필 보기"),
        icon: <img src={SVG_PATHS.USER.inactive} className="h-4 w-4" />,
      },
      {
        label: "설정",
        onClick: () => alert("설정"),
        icon: <img src={SVG_PATHS.SETTING} className="h-4 w-4" />,
      },
      {
        label: "로그아웃",
        onClick: () => alert("로그아웃"),
        icon: <img src={SVG_PATHS.LOGOUT} className="h-4 w-4" />,
        variant: "destructive" as const,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "아이콘이 포함된 드롭다운 옵션들입니다.",
      },
    },
  },
};

export const Positions: Story = {
  args: {
    options: defaultOptions,
    position: "top",
    align: "center",
  },
  parameters: {
    docs: {
      description: {
        story:
          "다양한 위치 설정 (top, bottom, left, right)과 정렬 (start, center, end)을 지원합니다.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    fullWidth: true,
    width: "full",
    trigger: (
      <button className="w-full rounded-lg bg-secondary-normal02 px-4 py-2 text-left text-primary-dark01">
        전체 너비 메뉴
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "전체 너비를 사용하는 드롭다운입니다.",
      },
    },
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: "사용 가능한 옵션", onClick: () => alert("클릭됨") },
      { label: "비활성화된 옵션", onClick: () => {}, disabled: true },
      {
        label: "삭제하기",
        onClick: () => alert("삭제"),
        variant: "destructive" as const,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화된 옵션을 포함한 드롭다운입니다.",
      },
    },
  },
};
