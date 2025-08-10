import { useState } from "react";

import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/shared/ui/layout/storybook-layout";

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
        component: "중앙 고정 팝업 모달 컴포넌트",
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
type Story = StoryObj;

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

export const Playground: Story = {
  render: () => <BasicPopupDemo />,
  args: {
    isOpen: false,
    title: "알림",
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
              ["isOpen", "boolean", "팝업 표시 상태 (필수)"],
              ["title", "string", "제목 텍스트 (선택)"],
              ["hasCloseButton", "boolean", "닫기 버튼 표시 (기본: false)"],
              ["closeOnOverlayClick", "boolean", "외부 클릭 시 닫기"],
              ["size", "'sm' | 'md' | 'lg' | 'full'", "팝업 크기 (기본: md)"],
              ["footer", "ReactNode", "하단 액션 영역 (선택)"],
              ["onClose", "function", "닫기 핸들러 (필수)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Size Variants"
            headers={["size", "width", "max-width", "max-height"]}
            data={[
              ["sm", "90%", "320px", "50vh"],
              ["md", "90%", "480px", "50vh"],
              ["lg", "95%", "640px", "50vh"],
              ["full", "100%", "100vw", "100vh"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["position", "fixed center", "fixed inset-0"],
              ["border radius", "12px", "rounded-xl"],
              ["background", "white", "bg-white"],
              ["shadow", "large shadow", "shadow-2xl"],
              ["z-index", "50", "z-50"],
              ["overflow", "hidden", "overflow-hidden"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Animation"
            headers={["property", "enter", "exit"]}
            data={[
              ["backdrop", "fade in", "fade out"],
              ["modal", "scale up + fade", "scale down + fade"],
              ["duration", "200ms", "150ms"],
              ["easing", "ease-out", "ease-in"],
            ]}
            codeColumns={[0, 1, 2]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "적절한 사용 시나리오",
                items: [
                  "확인/취소 다이얼로그",
                  "중요한 알림 메시지",
                  "간단한 폼 입력",
                  "사용자 확인이 필요한 액션",
                  "오류 또는 성공 메시지",
                ],
              },
              {
                title: "크기 선택 기준",
                items: [
                  { label: "sm", description: "간단한 확인 메시지" },
                  { label: "md", description: "일반적인 알림, 폼 (기본)" },
                  { label: "lg", description: "상세한 내용, 긴 텍스트" },
                  { label: "full", description: "전체화면 모드" },
                ],
              },
              {
                title: "디자인 원칙",
                items: [
                  "중앙 정렬로 사용자 집중",
                  "둥근 모서리로 친근한 느낌",
                  "적절한 그림자로 깊이감",
                  "제한된 높이로 스크롤 방지",
                  "명확한 액션 버튼 배치",
                ],
              },
              {
                title: "접근성 고려사항",
                items: [
                  "포커스 트랩 구현",
                  "ESC 키로 닫기",
                  "적절한 aria-label 제공",
                  "키보드 네비게이션 지원",
                  "스크린 리더 호환",
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
        story: "컴포넌트 스펙과 사용 가이드라인",
      },
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Size">
        {[
          { size: "sm", label: "Small" },
          { size: "md", label: "Medium" },
          { size: "lg", label: "Large" },
        ].map(({ size, label }) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={size}>
              <button
                onClick={() => setIsOpen(true)}
                className="w-full rounded bg-secondary-main px-4 py-2 font-semibold text-primary"
              >
                {label}
              </button>
              <PopupModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={`${label} 크기 팝업`}
                size={size as "sm" | "md" | "lg"}
                footer={
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded bg-secondary-main px-4 py-2 font-semibold text-primary"
                  >
                    닫기
                  </button>
                }
              >
                <p>이 팝업의 크기는 {size}입니다.</p>
              </PopupModal>
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

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">경고</h3>
        {(() => {
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
                className="rounded bg-primary px-4 py-2 text-white hover:bg-red-600"
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
        })()}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
