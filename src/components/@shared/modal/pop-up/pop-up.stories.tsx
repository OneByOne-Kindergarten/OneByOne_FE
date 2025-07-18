import { useState } from "react";

import PopupModal from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Modal/PopupModal",
  component: PopupModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
중앙에 표시되는 팝업 모달 컴포넌트입니다.

**특징:**
- 중앙 위치에 고정
- 둥근 모서리 디자인
- 최대 높이 50vh로 제한

**사용 시나리오:**
- 회원탈퇴 확인/취소 다이얼로그
- 알림 메시지
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "팝업 열림/닫힘 상태",
      control: "boolean",
    },
    title: {
      description: "팝업 제목",
      control: "text",
    },
    hasCloseButton: {
      description: "닫기 버튼 표시 여부",
      control: "boolean",
    },
    closeOnOverlayClick: {
      description: "오버레이 클릭 시 닫기",
      control: "boolean",
    },
    size: {
      description: "팝업 크기",
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    onClose: {
      description: "팝업 닫기 핸들러",
      action: "popup closed",
    },
  },
} satisfies Meta<typeof PopupModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicPopupDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        팝업 열기
      </button>

      <PopupModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="알림"
        footer={
          <button
            onClick={() => setIsOpen(false)}
            className="w-full rounded bg-secondary-main px-4 py-2 font-semibold text-primary"
          >
            확인
          </button>
        }
      >
        <p className="text-primary-dark02">이것은 기본 팝업 메시지입니다.</p>
      </PopupModal>
    </>
  );
};

export const Default: Story = {
  render: () => <BasicPopupDemo />,
  args: {
    isOpen: false,
    title: "알림",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 팝업 모달입니다. 간단한 메시지를 표시합니다.",
      },
    },
  },
};

const SizePopupDemo = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const sizes = [
    { key: "sm", label: "Small", size: "sm" as const },
    { key: "md", label: "Medium", size: "md" as const },
    { key: "lg", label: "Large", size: "lg" as const },
  ];

  return (
    <>
      <div className="flex gap-2">
        {sizes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setOpenModal(key)}
            className="w-full rounded bg-secondary-main px-4 py-2 font-semibold text-primary"
          >
            {label}
          </button>
        ))}
      </div>

      {sizes.map(({ key, size }) => (
        <PopupModal
          key={key}
          isOpen={openModal === key}
          onClose={() => setOpenModal(null)}
          title={`${size.toUpperCase()} 크기 팝업`}
          size={size}
          footer={
            <button
              onClick={() => setOpenModal(null)}
              className="w-full rounded bg-secondary-main px-4 py-2 font-semibold text-primary"
            >
              닫기
            </button>
          }
        >
          <p>이 팝업의 크기는 {size}입니다.</p>
        </PopupModal>
      ))}
    </>
  );
};

export const Sizes: Story = {
  render: () => <SizePopupDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "sm, md, lg 크기를 지원합니다.",
      },
    },
  },
};
const ConfirmPopupDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        회원탈퇴
      </button>
      <PopupModal
        isOpen={isOpen}
        onClose={handleCancel}
        title="회원탈퇴"
        closeOnOverlayClick={false}
        footer={
          <div className="flex w-full gap-2">
            <button
              onClick={handleCancel}
              className="flex-1 rounded bg-primary-dark02 px-4 py-2 font-semibold text-white"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 rounded bg-secondary-main px-4 py-2 font-semibold text-primary"
            >
              확인
            </button>
          </div>
        }
      >
        <div className="space-y-2">
          <p>정말로 계정을 삭제하시겠습니까?</p>
          <p className="text-sm text-primary-normal03">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
      </PopupModal>
    </>
  );
};

export const UserScenario: Story = {
  render: () => <ConfirmPopupDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "회원탈퇴 확인/취소 다이얼로그 시나리오입니다.",
      },
    },
  },
};
