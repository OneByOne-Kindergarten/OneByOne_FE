import { useState } from "react";

import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import BottomSheet from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Modal/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "하단 슬라이드 업 바텀시트 컴포넌트",
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "바텀시트 열림/닫힘 상태",
      control: "boolean",
    },
    title: {
      description: "바텀시트 제목",
      control: "text",
    },
    showCloseButton: {
      description: "닫기 버튼 표시 여부",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
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
      description: "바텀시트 닫기 핸들러",
      action: "bottomsheet closed",
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj;

const BasicBottomSheetDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        바텀시트 열기
      </button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="기본 바텀시트"
      >
        <div className="space-y-4 py-4">
          <p>바텀시트 내용입니다.</p>
          <p>하단에서 올라오는 형태로 표시됩니다.</p>
          <p>상단의 드래그 핸들을 확인해보세요.</p>
        </div>
      </BottomSheet>
    </>
  );
};

export const Playground: Story = {
  render: () => <BasicBottomSheetDemo />,
  args: {
    isOpen: false,
    title: "기본 바텀시트",
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
              ["isOpen", "boolean", "바텀시트 표시 상태 (필수)"],
              ["title", "string", "제목 텍스트 (선택)"],
              ["showCloseButton", "boolean", "닫기 버튼 표시 (기본: false)"],
              ["closeOnOverlayClick", "boolean", "외부 클릭 시 닫기"],
              ["footer", "ReactNode", "하단 액션 영역 (선택)"],
              ["onClose", "function", "닫기 핸들러 (필수)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["position", "fixed bottom", "fixed bottom-0"],
              ["width", "100%", "w-full"],
              ["max-height", "80vh", "max-h-[80vh]"],
              ["border radius", "16px top", "rounded-t-2xl"],
              ["background", "white", "bg-white"],
              ["z-index", "50", "z-50"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Features"
            headers={["feature", "description", "visual"]}
            data={[
              ["drag handle", "상단 드래그 핸들", "회색 둥근 바"],
              [
                "slide animation",
                "하단에서 슬라이드 업",
                "transform transition",
              ],
              ["backdrop blur", "배경 블러 효과", "backdrop-blur-sm"],
              ["scroll area", "긴 내용 시 스크롤", "overflow-y-auto"],
            ]}
            codeColumns={[0]}
          />

          <SpecTable
            title="Mobile Optimization"
            headers={["aspect", "optimization", "purpose"]}
            data={[
              ["touch area", "충분한 드래그 핸들", "쉬운 조작"],
              ["safe area", "iOS 하단 여백 고려", "notch 대응"],
              ["gesture", "드래그로 닫기", "자연스러운 UX"],
              ["scrolling", "내부 스크롤 지원", "긴 내용 처리"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "적절한 사용 시나리오",
                items: [
                  "옵션 선택 메뉴 (액션시트)",
                  "필터 및 정렬 설정",
                  "상세 정보 표시",
                  "폼 입력 (짧은 내용)",
                  "공유 옵션 메뉴",
                ],
              },
              {
                title: "UX 고려사항",
                items: [
                  "드래그 핸들로 직관적 조작",
                  "외부 터치로 쉬운 닫기",
                  "내용에 따른 적절한 높이",
                  "스크롤 가능한 긴 내용",
                  "하단 안전 영역 확보",
                ],
              },
              {
                title: "모바일 최적화",
                items: [
                  "터치 친화적 인터페이스",
                  "제스처 기반 조작 지원",
                  "화면 크기에 따른 반응형",
                  "iOS/Android 네이티브 느낌",
                  "키보드 표시 시 레이아웃 조정",
                ],
              },
              {
                title: "접근성 고려사항",
                items: [
                  "키보드 네비게이션 지원",
                  "ESC 키로 닫기",
                  "포커스 트랩 구현",
                  "스크린 리더 호환",
                  "적절한 aria 속성",
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
      <Section title="Basic Variants">
        <BasicBottomSheetDemo />

        {(() => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                닫기 버튼 포함
              </button>
              <BottomSheet
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="닫기 버튼이 있는 바텀시트"
                showCloseButton={true}
              >
                <div className="space-y-4 py-4">
                  <p>우상단에 닫기 버튼이 표시됩니다.</p>
                  <p>드래그 핸들과 닫기 버튼 둘 다 사용할 수 있습니다.</p>
                </div>
              </BottomSheet>
            </>
          );
        })()}

        {(() => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
              >
                푸터 포함
              </button>
              <BottomSheet
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="푸터가 있는 바텀시트"
                footer={
                  <div className="flex w-full gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-700"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded bg-purple-500 px-4 py-2 text-white"
                    >
                      확인
                    </button>
                  </div>
                }
              >
                <div className="space-y-4 py-4">
                  <p>하단에 액션 버튼이 고정됩니다.</p>
                  <p>스크롤 시에도 푸터는 고정 위치를 유지합니다.</p>
                </div>
              </BottomSheet>
            </>
          );
        })()}
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
        <h3 className="mb-4 text-lg font-semibold">필터 설정</h3>
        {(() => {
          const [isOpen, setIsOpen] = useState(false);
          const [filters, setFilters] = useState({
            category: "",
            rating: 0,
            features: [] as string[],
          });

          const categories = ["전체", "유치원", "어린이집", "놀이시설"];
          const features = ["주차가능", "급식제공", "특별활동", "영어교육"];

          const handleFeatureToggle = (feature: string) => {
            setFilters((prev) => ({
              ...prev,
              features: prev.features.includes(feature)
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature],
            }));
          };

          return (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
              >
                필터 설정
              </button>

              <BottomSheet
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="검색 필터"
                footer={
                  <div className="flex w-full gap-2">
                    <button
                      onClick={() =>
                        setFilters({ category: "", rating: 0, features: [] })
                      }
                      className="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-700"
                    >
                      초기화
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded bg-purple-500 px-4 py-2 text-white"
                    >
                      적용
                    </button>
                  </div>
                }
              >
                <div className="space-y-6 py-4">
                  <div>
                    <h4 className="mb-3 font-medium">카테고리</h4>
                    <div className="flex gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, category }))
                          }
                          className={`rounded px-3 py-1 text-sm ${
                            filters.category === category
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-medium">특징</h4>
                    <div className="space-y-2">
                      {features.map((feature) => (
                        <label
                          key={feature}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={filters.features.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                            className="rounded"
                          />
                          <span className="text-sm">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </BottomSheet>
            </>
          );
        })()}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">유치원 정보</h3>
        {(() => {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
              >
                유치원 정보
              </button>

              <BottomSheet
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="해솔 유치원"
                footer={
                  <div className="flex w-full gap-2">
                    <button className="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-700">
                      전화걸기
                    </button>
                    <button className="flex-1 rounded bg-teal-500 px-4 py-2 text-white">
                      리뷰 작성
                    </button>
                  </div>
                }
              >
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">평점</span>
                    <span className="text-yellow-500">★★★★☆ 4.2</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">운영시간</span>
                    <span className="text-gray-600">07:30 - 19:30</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">주소</span>
                    <span className="text-gray-600">서울시 강남구 역삼동</span>
                  </div>

                  <div>
                    <span className="font-medium">특징</span>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                        주차가능
                      </span>
                      <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                        급식제공
                      </span>
                      <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700">
                        영어교육
                      </span>
                    </div>
                  </div>
                </div>
              </BottomSheet>
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
