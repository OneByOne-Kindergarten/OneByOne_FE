import { useState } from "react";

import { BaseModal, ModalContent, ModalFooter, ModalHeader } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Modal/BaseModal",
  component: BaseModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
컴파운드 패턴 모달 컴포넌트입니다.

**구성 요소:**
- BaseModal: 컨테이너
- ModalHeader: 상단 타이틀 영역
- ModalContent: 중앙 내용 영역
- ModalFooter: 하단 버튼 영역

**기능:**
- 위치 설정 (center, bottom, top)
- 크기 설정 (sm, md, lg, full)
- 둥근 모서리 옵션 (none, sm, md, lg, xl, bottom, top)
- 오버레이 블러 효과 설정 (none, sm, md, lg)
- 외부 클릭 시 자동 닫기
- 상단 X 버튼 표시 여부 설정
- 모달 닫기 핸들러 설정

**사용 시나리오:**
- 속성을 조합하여 다양한 모달 컴포넌트에서 사용 (BottomSheet, PopUp)
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "모달 열림/닫힘 상태",
      control: "boolean",
    },
    position: {
      description: "모달 위치",
      control: "select",
      options: ["center", "bottom", "top"],
    },
    size: {
      description: "모달 크기",
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    rounded: {
      description: "모서리 둥글기",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "bottom", "top"],
    },
    overlay: {
      description: "오버레이 블러 효과",
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    hasCloseButton: {
      description: "닫기 버튼 표시 여부",
      control: "boolean",
    },
    closeOnOverlayClick: {
      description: "오버레이 클릭 시 닫기",
      control: "boolean",
    },
    onClose: {
      description: "모달 닫기 핸들러",
      action: "modal closed",
    },
  },
} satisfies Meta<typeof BaseModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달
const BasicModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        모달 열기
      </button>

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="center"
        size="md"
        rounded="lg"
      >
        <ModalHeader hasCloseButton onClose={() => setIsOpen(false)}>
          <h2 className="text-lg font-semibold">기본 모달</h2>
        </ModalHeader>
        <ModalContent className="p-6">
          <p>이것은 기본 모달의 내용입니다.</p>
          <p>여러 줄의 텍스트를 포함할 수 있습니다.</p>
        </ModalContent>
        <ModalFooter className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            확인
          </button>
        </ModalFooter>
      </BaseModal>
    </>
  );
};

export const Default: Story = {
  render: () => <BasicModalDemo />,
  args: {
    isOpen: false,
    position: "center",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 모달 컴포넌트입니다. 버튼을 클릭하여 모달을 열어보세요.",
      },
    },
  },
};

// 위치별 모달
const PositionModalsDemo = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const positions = [
    { key: "center", label: "중앙", position: "center" as const },
    { key: "bottom", label: "하단", position: "bottom" as const },
    { key: "top", label: "상단", position: "top" as const },
  ];

  return (
    <>
      <div className="flex gap-2">
        {positions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setOpenModal(key)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {label} 모달
          </button>
        ))}
      </div>

      {positions.map(({ key, position }) => (
        <BaseModal
          key={key}
          isOpen={openModal === key}
          onClose={() => setOpenModal(null)}
          position={position}
          size="md"
        >
          <ModalHeader hasCloseButton onClose={() => setOpenModal(null)}>
            <h2 className="text-lg font-semibold">{position} 위치 모달</h2>
          </ModalHeader>
          <ModalContent className="p-6">
            <p>이 모달은 {position} 위치에 표시됩니다.</p>
          </ModalContent>
          <ModalFooter className="p-4">
            <button
              onClick={() => setOpenModal(null)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              닫기
            </button>
          </ModalFooter>
        </BaseModal>
      ))}
    </>
  );
};

export const Positions: Story = {
  render: () => <PositionModalsDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 위치의 모달을 확인할 수 있습니다.",
      },
    },
  },
};

// 크기별 모달
const SizeModalsDemo = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const sizes = [
    { key: "sm", label: "Small", size: "sm" as const },
    { key: "md", label: "Medium", size: "md" as const },
    { key: "lg", label: "Large", size: "lg" as const },
    { key: "full", label: "Full", size: "full" as const },
  ];

  return (
    <>
      <div className="flex gap-2">
        {sizes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setOpenModal(key)}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            {label}
          </button>
        ))}
      </div>

      {sizes.map(({ key, size }) => (
        <BaseModal
          key={key}
          isOpen={openModal === key}
          onClose={() => setOpenModal(null)}
          position="center"
          size={size}
        >
          <ModalHeader hasCloseButton onClose={() => setOpenModal(null)}>
            <h2 className="text-lg font-semibold">
              {size.toUpperCase()} 크기 모달
            </h2>
          </ModalHeader>
          <ModalContent className="p-6">
            <p>이 모달의 크기는 {size}입니다.</p>
            <p>다양한 크기로 모달을 사용할 수 있습니다.</p>
          </ModalContent>
          <ModalFooter className="p-4">
            <button
              onClick={() => setOpenModal(null)}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              닫기
            </button>
          </ModalFooter>
        </BaseModal>
      ))}
    </>
  );
};

export const Sizes: Story = {
  render: () => <SizeModalsDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "다양한 크기의 모달을 확인할 수 있습니다.",
      },
    },
  },
};
