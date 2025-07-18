import { useState } from "react";

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
        component: `
화면 하단에서 올라오는 바텀 시트 컴포넌트입니다.

**특징:**
- 하단에서 슬라이드업 애니메이션
- 드래그 핸들 포함
- 최대 높이 80vh로 제한
- 모바일 친화적 UI

**사용 시나리오:**
- 옵션 선택 메뉴
- 필터 설정
- 액션 시트
        `,
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
    },
    closeOnOverlayClick: {
      description: "오버레이 클릭 시 닫기",
      control: "boolean",
    },
    onClose: {
      description: "바텀시트 닫기 핸들러",
      action: "bottomsheet closed",
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 바텀시트
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

export const Default: Story = {
  render: () => <BasicBottomSheetDemo />,
  args: {
    isOpen: false,
    title: "기본 바텀시트",
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 바텀시트 컴포넌트입니다. 버튼을 클릭하여 바텀시트를 열어보세요.",
      },
    },
  },
};

// 옵션 선택 메뉴
const OptionMenuDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    { id: "edit", label: "수정하기", icon: "✏️" },
    { id: "share", label: "공유하기", icon: "📤" },
    { id: "copy", label: "링크 복사", icon: "🔗" },
    { id: "report", label: "신고하기", icon: "🚨", danger: true },
    { id: "delete", label: "삭제하기", icon: "🗑️", danger: true },
  ];

  const handleOptionClick = (optionId: string, label: string) => {
    setSelectedOption(label);
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          옵션 메뉴
        </button>

        {selectedOption && (
          <p className="text-sm text-gray-600">선택: {selectedOption}</p>
        )}
      </div>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="옵션 선택"
      >
        <div className="space-y-2 py-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id, option.label)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-100 ${
                option.danger ? "text-red-600" : ""
              }`}
            >
              <span className="text-xl">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
};

export const OptionMenu: Story = {
  render: () => <OptionMenuDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "옵션 선택을 위한 액션 시트입니다.",
      },
    },
  },
};

// 필터 설정
const FilterSheetDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    price: [0, 100],
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

  const applyFilters = () => {
    console.log("적용된 필터:", filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      price: [0, 100],
      rating: 0,
      features: [],
    });
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
              onClick={resetFilters}
              className="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-700"
            >
              초기화
            </button>
            <button
              onClick={applyFilters}
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
                  onClick={() => setFilters((prev) => ({ ...prev, category }))}
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
            <h4 className="mb-3 font-medium">별점</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters((prev) => ({ ...prev, rating }))}
                  className={`rounded px-3 py-1 text-sm ${
                    filters.rating === rating
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {rating}★
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-medium">특징</h4>
            <div className="space-y-2">
              {features.map((feature) => (
                <label key={feature} className="flex items-center gap-2">
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
};

export const FilterSheet: Story = {
  render: () => <FilterSheetDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "검색 필터 설정을 위한 바텀시트입니다.",
      },
    },
  },
};

// 닫기 버튼이 있는 버전
const WithCloseButtonDemo = () => {
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
};

export const WithCloseButton: Story = {
  render: () => <WithCloseButtonDemo />,
  args: {
    isOpen: false,
    showCloseButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: "닫기 버튼이 포함된 바텀시트입니다.",
      },
    },
  },
};

// 긴 콘텐츠 스크롤
const LongContentDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = Array.from({ length: 50 }, (_, i) => `항목 ${i + 1}`);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
      >
        긴 콘텐츠
      </button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="긴 콘텐츠 목록"
      >
        <div className="space-y-2 py-4">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
            >
              <span>{item}</span>
              <button className="text-sm text-blue-500">선택</button>
            </div>
          ))}
        </div>
      </BottomSheet>
    </>
  );
};

export const LongContent: Story = {
  render: () => <LongContentDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "긴 콘텐츠가 포함된 바텀시트입니다. 스크롤이 가능합니다.",
      },
    },
  },
};

// 유치원 정보 시나리오
const KindergartenInfoDemo = () => {
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

          <div>
            <span className="font-medium">소개</span>
            <p className="mt-2 text-sm text-gray-600">
              30년 전통의 해솔 유치원입니다. 아이들의 창의성과 인성을 기르는
              교육을 지향하며, 안전하고 즐거운 환경에서 건강한 성장을 돕고
              있습니다.
            </p>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export const KindergartenInfo: Story = {
  render: () => <KindergartenInfoDemo />,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: "유치원 정보 표시를 위한 바텀시트 사용 예시입니다.",
      },
    },
  },
};
