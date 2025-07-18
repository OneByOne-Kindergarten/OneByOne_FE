import { SVG_PATHS } from "@/constants/assets-path";
import { getMarkerStyles } from "@/utils/mapUtils";

import type { Meta, StoryObj } from "@storybook/react";

// 스토리북용 모킹된 마커 컴포넌트
interface MockedMarkerProps {
  name: string;
  establishment?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  onClick?: () => void;
}

const MockedKindergartenMarker = ({
  name,
  establishment,
  size = "md",
  showLabel = true,
  onClick,
}: MockedMarkerProps) => {
  const styles = getMarkerStyles(establishment);

  const sizeConfig = {
    sm: {
      markerSize: "w-6 h-6",
      textSize: "text-xs",
      labelSize: "text-xs",
      labelPadding: "p-0.5",
      labelMaxWidth: "max-w-20",
    },
    md: {
      markerSize: "w-8 h-8",
      textSize: "text-xs",
      labelSize: "text-xs",
      labelPadding: "p-0.5",
      labelMaxWidth: "max-w-24",
    },
    lg: {
      markerSize: "w-10 h-10",
      textSize: "text-sm",
      labelSize: "text-sm",
      labelPadding: "px-2 py-1",
      labelMaxWidth: "max-w-32",
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={`flex transform flex-col items-center transition-transform hover:scale-110 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      title={`${name} (${establishment || "기타"})`}
    >
      {/* 마커 아이콘 */}
      <div
        className={`${config.markerSize} flex items-center justify-center rounded-full border-2 shadow-xl`}
        style={{
          backgroundColor: styles.bgColor,
          borderColor: styles.borderColor,
          color: styles.textColor,
        }}
      >
        {styles.showIcon ? (
          <img
            src={SVG_PATHS.SCHOOL.active}
            alt={establishment || "유치원"}
            className="h-4 w-4 invert"
          />
        ) : (
          <span className={`${config.textSize} font-semibold`}>
            {styles.text}
          </span>
        )}
      </div>

      {/* 화살표 */}
      <div
        className="mb-1 h-0 w-0 border-l-2 border-r-2 border-t-4 border-transparent"
        style={{
          borderTopColor: styles.showIcon
            ? styles.bgColor
            : styles.borderColor === "transparent"
              ? styles.bgColor
              : styles.borderColor,
        }}
      />

      {/* 유치원 이름 라벨 */}
      {showLabel && (
        <div
          className={`bg-white opacity-90 ${config.labelPadding} rounded shadow-md ${config.labelSize} mt-0.5 font-semibold ${config.labelMaxWidth} truncate`}
        >
          {name}
        </div>
      )}
    </div>
  );
};

const meta = {
  title: "Components/School/Map/KindergartenMapMarker",
  component: MockedKindergartenMarker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "유치원 지도 마커 컴포넌트입니다. 스토리북에서는 모킹된 버전으로 마커 디자인을 확인할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "마커 크기",
    },
    establishment: {
      control: { type: "select" },
      options: ["공립", "사립"],
      description: "설립 유형",
    },
    showLabel: {
      control: { type: "boolean" },
      description: "라벨 표시 여부",
    },
    name: {
      control: { type: "text" },
      description: "유치원 이름",
    },
  },
  decorators: [
    (Story) => (
      <div className="relative flex h-32 w-96 items-center justify-center bg-primary-normal02">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MockedKindergartenMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PublicKindergarten: Story = {
  args: {
    name: "서울공립유치원",
    establishment: "공립",
    size: "md",
    showLabel: true,
  },
};

export const PrivateKindergarten: Story = {
  args: {
    name: "서울사립유치원",
    establishment: "사립",
    size: "md",
    showLabel: true,
  },
};
