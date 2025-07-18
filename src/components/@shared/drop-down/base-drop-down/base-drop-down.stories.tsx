import { action } from "@storybook/addon-actions";

import { SVG_PATHS } from "@/constants/assets-path";

import BaseDropDown from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/DropDowns/BaseDropDown",
  component: BaseDropDown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
케밥 아이콘 트리거와 옵션을 제공하는 드롭다운 컴포넌트입니다.

**Props:**
- \`options\`: 드롭다운 옵션 배열 (icon, variant, disabled 지원)
- \`position\`: 드롭다운 위치 (top, bottom, left, right)
- \`align\`: 드롭다운 정렬 (start, center, end)
- \`width\`: 메뉴 너비 (auto, full)
- \`fullWidth\`: 컨테이너 전체 너비 사용 여부
- \`trigger\`: 커스텀 트리거 요소
- \`closeOnClick\`: 옵션 클릭 시 닫기 여부
- \`closeOnOutsideClick\`: 외부 클릭 시 닫기 여부


**사용 시나리오:**
- 프로필 메뉴
- 설정 메뉴
- 게시글/댓글 관리
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-80 w-full max-w-2xl items-center justify-center pb-40">
        <div className="relative">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    options: {
      description: "드롭다운 옵션 배열",
      control: "object",
    },
    position: {
      description: "드롭다운 메뉴 위치",
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    align: {
      description: "드롭다운 메뉴 정렬",
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    width: {
      description: "드롭다운 메뉴 너비",
      control: { type: "select" },
      options: ["auto", "full"],
    },
    fullWidth: {
      description: "컨테이너 전체 너비 사용",
      control: "boolean",
    },
    closeOnClick: {
      description: "옵션 클릭 시 드롭다운 닫기",
      control: "boolean",
    },
    closeOnOutsideClick: {
      description: "외부 클릭 시 드롭다운 닫기",
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BaseDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  {
    label: "편집하기",
    onClick: () => action("편집하기 클릭")(),
  },
  {
    label: "공유하기",
    onClick: () => action("공유하기 클릭")(),
  },
  {
    label: "삭제하기",
    onClick: () => action("삭제하기 클릭")(),
    variant: "destructive" as const,
  },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    position: "bottom",
    align: "start",
    width: "auto",
    fullWidth: false,
    closeOnClick: true,
    closeOnOutsideClick: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "케밥 아이콘을 클릭하면 옵션이 나타납니다. 옵션을 클릭 시 옵션의 onClick 함수가 실행됩니다.",
      },
    },
  },
};

export const Positions: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="space-y-4">
        <h3 className="text-center text-sm font-semibold">Bottom 위치</h3>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="mb-2 text-xs">Start</p>
            <BaseDropDown
              options={defaultOptions}
              position="bottom"
              align="start"
            />
          </div>
          <div className="text-center">
            <p className="mb-2 text-xs">Center</p>
            <BaseDropDown
              options={defaultOptions}
              position="bottom"
              align="center"
            />
          </div>
          <div className="text-center">
            <p className="mb-2 text-xs">End</p>
            <BaseDropDown
              options={defaultOptions}
              position="bottom"
              align="end"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-center text-sm font-semibold">Top 위치</h3>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="mb-2 text-xs">Start</p>
            <BaseDropDown
              options={defaultOptions}
              position="top"
              align="start"
            />
          </div>
          <div className="text-center">
            <p className="mb-2 text-xs">Center</p>
            <BaseDropDown
              options={defaultOptions}
              position="top"
              align="center"
            />
          </div>
          <div className="text-center">
            <p className="mb-2 text-xs">End</p>
            <BaseDropDown options={defaultOptions} position="top" align="end" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "드롭다운의 position과 align 조합을 보여줍니다.",
      },
    },
  },
};

export const Widths: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Auto Width (Default)</h3>
        <BaseDropDown
          options={[
            { label: "짧은 옵션", onClick: () => action("클릭")() },
            {
              label: "조금 더 긴 옵션 텍스트",
              onClick: () => action("클릭")(),
            },
          ]}
          width="auto"
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Full Width Menu</h3>
        <BaseDropDown
          options={defaultOptions}
          width="full"
          trigger={
            <button className="w-40 rounded-lg bg-secondary-normal02 px-4 py-2 text-left text-primary-dark01">
              전체 너비 메뉴
            </button>
          }
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Full Width Container</h3>
        <BaseDropDown
          options={defaultOptions}
          fullWidth={true}
          trigger={
            <button className="bg-primary-light03 w-full rounded-lg px-4 py-2 text-left text-primary-dark01">
              전체 너비 컨테이너
            </button>
          }
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "드롭다운의 다양한 너비 설정을 보여줍니다.",
      },
    },
  },
};

export const CustomTriggers: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold">버튼 트리거</h3>
        <BaseDropDown
          options={defaultOptions}
          trigger={
            <button className="rounded-lg bg-primary-normal01 px-4 py-2 text-white hover:bg-primary-normal02">
              메뉴 열기
            </button>
          }
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">텍스트 트리거</h3>
        <BaseDropDown
          options={defaultOptions}
          trigger={
            <span className="cursor-pointer text-blue-600 underline hover:text-blue-800">
              더보기
            </span>
          }
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">아이콘 트리거</h3>
        <BaseDropDown
          options={defaultOptions}
          trigger={
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
              <img src={SVG_PATHS.SETTING} alt="설정" className="h-4 w-4" />
            </div>
          }
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "다양한 커스텀 트리거 예시입니다.",
      },
    },
  },
};

export const CustomOptions: Story = {
  args: {
    fullWidth: true,
    options: [
      {
        label: "프로필 보기",
        onClick: () => action("프로필 보기")(),
        icon: <img src={SVG_PATHS.USER.inactive} className="h-4 w-10" />,
      },
      {
        label: "설정",
        onClick: () => action("설정")(),
        icon: <img src={SVG_PATHS.SETTING} className="h-4 w-10" />,
      },
      {
        label: "비활성화된 옵션",
        onClick: () => action("비활성화 클릭")(),
        icon: <img src={SVG_PATHS.ALARM} className="h-4 w-10" />,
        disabled: true,
      },
      {
        label: "로그아웃",
        onClick: () => action("로그아웃")(),
        icon: <img src={SVG_PATHS.LOGOUT} className="h-4 w-10" />,
        variant: "destructive" as const,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 커스텀 옵션 예시입니다.",
      },
    },
  },
};
