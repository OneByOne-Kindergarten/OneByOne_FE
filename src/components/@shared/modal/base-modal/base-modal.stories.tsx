import { useState } from "react";

import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

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
        component: "컴파운드 패턴 기반 범용 모달 컴포넌트",
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
      table: {
        defaultValue: { summary: "center" },
      },
    },
    size: {
      description: "모달 크기",
      control: "select",
      options: ["sm", "md", "lg", "full"],
      table: {
        defaultValue: { summary: "md" },
      },
    },
    rounded: {
      description: "모서리 둥글기",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "bottom", "top"],
      table: {
        defaultValue: { summary: "lg" },
      },
    },
    overlay: {
      description: "오버레이 블러 효과",
      control: "select",
      options: ["none", "sm", "md", "lg"],
      table: {
        defaultValue: { summary: "none" },
      },
    },
    hasCloseButton: {
      description: "닫기 버튼 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    closeOnOverlayClick: {
      description: "오버레이 클릭 시 닫기",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    onClose: {
      description: "모달 닫기 핸들러",
      action: "modal closed",
    },
  },
} satisfies Meta<typeof BaseModal>;

export default meta;
type Story = StoryObj;

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

export const Playground: Story = {
  render: () => <BasicModalDemo />,
  args: {
    isOpen: false,
    position: "center",
    size: "md",
  },
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Props"
            headers={["prop", "type", "description"]}
            data={[
              ["isOpen", "boolean", "모달 표시 상태 (필수)"],
              [
                "position",
                "'center' | 'bottom' | 'top'",
                "모달 위치 (기본: center)",
              ],
              ["size", "'sm' | 'md' | 'lg' | 'full'", "모달 크기 (기본: md)"],
              ["rounded", "string", "모서리 둥글기 (기본: lg)"],
              ["overlay", "'none' | 'sm' | 'md' | 'lg'", "오버레이 블러"],
              ["closeOnOverlayClick", "boolean", "외부 클릭 시 닫기"],
              ["onClose", "function", "닫기 핸들러 (필수)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Size Variants"
            headers={["size", "width", "max-width", "height"]}
            data={[
              ["sm", "80%", "320px", "auto"],
              ["md", "90%", "480px", "auto"],
              ["lg", "95%", "640px", "auto"],
              ["full", "100%", "100vw", "100vh"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />

          <SpecTable
            title="Position Variants"
            headers={["position", "alignment", "animation"]}
            data={[
              ["center", "중앙 정렬", "fade + scale"],
              ["bottom", "하단 고정", "slide up"],
              ["top", "상단 고정", "slide down"],
            ]}
            codeColumns={[0]}
          />

          <SpecTable
            title="Compound Components"
            headers={["component", "purpose", "required"]}
            data={[
              ["BaseModal", "메인 컨테이너", "Yes"],
              ["ModalHeader", "제목 및 닫기 버튼", "No"],
              ["ModalContent", "주요 내용 영역", "No"],
              ["ModalFooter", "액션 버튼 영역", "No"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "위치 선택 기준",
                items: [
                  { label: "center", description: "확인/알림, 폼 입력" },
                  { label: "bottom", description: "옵션 선택, 필터" },
                  { label: "top", description: "알림, 상태 메시지" },
                ],
              },
              {
                title: "크기 선택 기준",
                items: [
                  { label: "sm", description: "간단한 확인 다이얼로그" },
                  { label: "md", description: "일반적인 폼, 설정" },
                  { label: "lg", description: "상세 정보, 긴 내용" },
                  { label: "full", description: "전체화면 모드" },
                ],
              },
              {
                title: "접근성 고려사항",
                items: [
                  "포커스 트랩 (모달 내부에 포커스 유지)",
                  "ESC 키로 닫기 기능",
                  "aria-modal='true' 속성",
                  "적절한 aria-labelledby 설정",
                  "배경 스크롤 방지",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "사용자 확인이 필요한 액션",
                  "폼 입력 및 데이터 편집",
                  "상세 정보 표시",
                  "설정 및 옵션 변경",
                  "경고 및 알림 메시지",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Position">
        {[
          { position: "center", label: "중앙", color: "blue" },
          { position: "bottom", label: "하단", color: "green" },
          { position: "top", label: "상단", color: "purple" },
        ].map(({ position, label, color }) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={position}>
              <button
                onClick={() => setIsOpen(true)}
                className={`rounded bg-${color}-500 px-4 py-2 text-white hover:bg-${color}-600`}
              >
                {label} 모달
              </button>
              <BaseModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                position={position as "center" | "bottom" | "top"}
                size="md"
              >
                <ModalHeader hasCloseButton onClose={() => setIsOpen(false)}>
                  <h2 className="text-lg font-semibold">{label} 위치 모달</h2>
                </ModalHeader>
                <ModalContent className="p-6">
                  <p>이 모달은 {label} 위치에 표시됩니다.</p>
                </ModalContent>
                <ModalFooter className="p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`rounded bg-${color}-500 px-4 py-2 text-white hover:bg-${color}-600`}
                  >
                    닫기
                  </button>
                </ModalFooter>
              </BaseModal>
            </div>
          );
        })}
      </Section>

      <Section title="Size">
        {[
          { size: "sm", label: "Small" },
          { size: "md", label: "Medium" },
          { size: "lg", label: "Large" },
          { size: "full", label: "Full" },
        ].map(({ size, label }) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={size}>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                {label}
              </button>
              <BaseModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                position="center"
                size={size as "sm" | "md" | "lg" | "full"}
              >
                <ModalHeader hasCloseButton onClose={() => setIsOpen(false)}>
                  <h2 className="text-lg font-semibold">{label} 크기 모달</h2>
                </ModalHeader>
                <ModalContent className="p-6">
                  <p>이 모달의 크기는 {size}입니다.</p>
                </ModalContent>
                <ModalFooter className="p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                  >
                    닫기
                  </button>
                </ModalFooter>
              </BaseModal>
            </div>
          );
        })}
      </Section>
      <Section title="Rounded">
        {[
          { rounded: "none", label: "None" },
          { rounded: "sm", label: "Small" },
          { rounded: "md", label: "Medium" },
          { rounded: "lg", label: "Large" },
          { rounded: "xl", label: "Extra Large" },
          { rounded: "bottom", label: "Bottom" },
          { rounded: "top", label: "Top" },
        ].map(({ rounded, label }) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={rounded}>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                {label}
              </button>
              <BaseModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                position="center"
                size="sm"
                rounded={
                  rounded as
                    | "none"
                    | "sm"
                    | "md"
                    | "lg"
                    | "xl"
                    | "bottom"
                    | "top"
                }
              >
                <ModalHeader hasCloseButton onClose={() => setIsOpen(false)}>
                  <h2 className="text-lg font-semibold">{label} 모달</h2>
                </ModalHeader>
                <ModalContent className="p-6">
                  <p>이 모달은 {rounded} 모서리 둥글기를 사용합니다.</p>
                </ModalContent>
                <ModalFooter className="p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                  >
                    닫기
                  </button>
                </ModalFooter>
              </BaseModal>
            </div>
          );
        })}
      </Section>
      <Section title="Overlay">
        {[
          { overlay: "none", label: "None" },
          { overlay: "sm", label: "Small" },
          { overlay: "md", label: "Medium" },
          { overlay: "lg", label: "Large" },
        ].map(({ overlay, label }) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={overlay}>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                {label}
              </button>
              <BaseModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                position="center"
                size="sm"
                overlay={overlay as "none" | "sm" | "md" | "lg"}
              >
                <ModalHeader hasCloseButton onClose={() => setIsOpen(false)}>
                  <h2 className="text-lg font-semibold">{label} 모달</h2>
                </ModalHeader>
                <ModalContent className="p-6">
                  <p>이 모달은 {overlay} 오버레이를 사용합니다.</p>
                </ModalContent>
                <ModalFooter className="p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                  >
                    닫기
                  </button>
                </ModalFooter>
              </BaseModal>
            </div>
          );
        })}
      </Section>
    </main>
  ),
  parameters: {
    docs: {
      description: {
        story: "옵션 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};
