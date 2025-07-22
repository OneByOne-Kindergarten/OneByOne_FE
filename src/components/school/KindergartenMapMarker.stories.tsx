import {
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";
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
        component: "유치원 지도 마커 컴포넌트 (스토리북용 모킹 버전)",
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
    onClick: {
      description: "클릭 이벤트 핸들러",
      action: "마커 클릭",
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

export const Playground: Story = {
  args: {
    name: "서울유치원",
    establishment: "공립",
    size: "md",
    showLabel: true,
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
              ["name", "string", "유치원 이름 (필수)"],
              ["establishment", "'공립' | '사립'", "설립 유형 (선택)"],
              ["size", "'sm' | 'md' | 'lg'", "마커 크기 (기본: md)"],
              ["showLabel", "boolean", "라벨 표시 여부 (기본: true)"],
              ["onClick", "function", "클릭 핸들러 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Size Variants"
            headers={["size", "marker", "text", "label", "use case"]}
            data={[
              ["sm", "24x24px", "12px", "12px", "밀집 지역, 줌 아웃"],
              ["md", "32x32px", "12px", "12px", "일반적 사용 (권장)"],
              ["lg", "40x40px", "14px", "14px", "상세 보기, 줌 인"],
            ]}
            codeColumns={[0, 1, 2, 3]}
          />

          <SpecTable
            title="Establishment Styles"
            headers={["type", "background", "border", "text"]}
            data={[
              ["공립", "파란색", "진한 파란색", "흰색"],
              ["사립", "주황색", "진한 주황색", "흰색"],
              ["기타", "회색", "진한 회색", "흰색"],
            ]}
            codeColumns={[0]}
          />

          <SpecTable
            title="Interactive Features"
            headers={["feature", "behavior", "accessibility"]}
            data={[
              ["hover", "1.1배 확대", "마우스 오버 피드백"],
              ["click", "onClick 핸들러 실행", "키보드 접근 가능"],
              ["tooltip", "이름과 설립유형 표시", "title 속성 지원"],
              ["label", "유치원 이름 표시", "텍스트 잘림 처리"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "마커 크기 선택 기준",
                items: [
                  { label: "sm", description: "줌 레벨 낮음, 많은 마커" },
                  { label: "md", description: "일반적 사용, 균형잡힌 크기" },
                  { label: "lg", description: "줌 레벨 높음, 상세 정보" },
                  { label: "반응형", description: "줌 레벨에 따라 동적 조정" },
                ],
              },
              {
                title: "설립 유형별 스타일링",
                items: [
                  "공립: 파란색 계열로 공공성 강조",
                  "사립: 주황색 계열로 민간 구분",
                  "일관된 색상 체계 유지",
                  "색맹 사용자를 위한 대비 확보",
                  "아이콘과 텍스트 조합 사용",
                ],
              },
              {
                title: "라벨 표시 전략",
                items: [
                  "줌 레벨에 따라 표시/숨김",
                  "긴 이름은 말줄임표 처리",
                  "배경 반투명으로 가독성 확보",
                  "충분한 여백으로 터치 영역 확보",
                  "지도 요소와 겹치지 않도록 배치",
                ],
              },
              {
                title: "인터랙션 & 접근성",
                items: [
                  "호버 시 시각적 피드백 제공",
                  "클릭 영역 충분히 확보 (44px+)",
                  "키보드 네비게이션 지원",
                  "스크린 리더용 대체 텍스트",
                  "터치 디바이스 최적화",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    name: "서울유치원",
    establishment: "공립",
    size: "md",
    showLabel: true,
  },
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
      <Section title="Establishment Types">
        <div className="flex gap-8">
          <MockedKindergartenMarker
            name="서울공립유치원"
            establishment="공립"
            size="md"
            showLabel={true}
          />
          <MockedKindergartenMarker
            name="서울사립유치원"
            establishment="사립"
            size="md"
            showLabel={true}
          />
          <MockedKindergartenMarker
            name="기타유치원"
            size="md"
            showLabel={true}
          />
        </div>
      </Section>

      <Section title="Size Variants">
        <div className="flex items-end gap-8">
          <MockedKindergartenMarker
            name="작은마커"
            establishment="공립"
            size="sm"
            showLabel={true}
          />
          <MockedKindergartenMarker
            name="중간마커"
            establishment="공립"
            size="md"
            showLabel={true}
          />
          <MockedKindergartenMarker
            name="큰마커"
            establishment="공립"
            size="lg"
            showLabel={true}
          />
        </div>
      </Section>

      <Section title="Label Options">
        <div className="flex gap-8">
          <MockedKindergartenMarker
            name="라벨표시"
            establishment="사립"
            size="md"
            showLabel={true}
          />
          <MockedKindergartenMarker
            name="라벨숨김"
            establishment="사립"
            size="md"
            showLabel={false}
          />
        </div>
      </Section>
    </main>
  ),
  args: {
    name: "서울유치원",
    establishment: "공립",
    size: "md",
    showLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: "모든 마커 스타일 프리뷰",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">공립 유치원</h3>
        <div className="flex items-center justify-center rounded-lg bg-primary-normal02 p-8">
          <MockedKindergartenMarker
            name="서울공립유치원"
            establishment="공립"
            size="md"
            showLabel={true}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          파란색 계열로 공공 기관임을 표시
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">사립 유치원</h3>
        <div className="flex items-center justify-center rounded-lg bg-primary-normal02 p-8">
          <MockedKindergartenMarker
            name="서울사립유치원"
            establishment="사립"
            size="md"
            showLabel={true}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          주황색 계열로 민간 기관임을 표시
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">기타 유치원</h3>
        <div className="flex items-center justify-center rounded-lg bg-primary-normal02 p-8">
          <MockedKindergartenMarker
            name="기타유치원"
            size="md"
            showLabel={true}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          회색 계열로 기타 유형을 표시
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">크기 비교</h3>
        <div className="flex items-end justify-center gap-8 rounded-lg bg-primary-normal02 p-8">
          <MockedKindergartenMarker
            name="소형"
            establishment="공립"
            size="sm"
            showLabel={true}
          />
          <MockedKindergartenMarker
            name="중형"
            establishment="공립"
            size="md"
            showLabel={true}
          />
          <MockedKindergartenMarker
            name="대형"
            establishment="공립"
            size="lg"
            showLabel={true}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          줌 레벨에 따라 적절한 크기 선택
        </p>
      </div>
    </div>
  ),
  args: {
    name: "서울유치원",
    establishment: "공립",
    size: "md",
    showLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: "상태 별 마커 스타일",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">일반 지도 뷰</h3>
        <div className="w-full max-w-2xl rounded-lg bg-primary-normal02 p-6">
          <div className="grid grid-cols-3 gap-8">
            <MockedKindergartenMarker
              name="강남유치원"
              establishment="공립"
              size="md"
              showLabel={true}
            />
            <MockedKindergartenMarker
              name="서초사립유치원"
              establishment="사립"
              size="md"
              showLabel={true}
            />
            <MockedKindergartenMarker
              name="송파유치원"
              establishment="공립"
              size="md"
              showLabel={true}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">줌 아웃 뷰 (밀집 지역)</h3>
        <div className="w-full max-w-2xl rounded-lg bg-primary-normal02 p-6">
          <div className="grid grid-cols-4 gap-4">
            {[
              "강남유치원",
              "서초유치원",
              "송파유치원",
              "영등포유치원",
              "마포유치원",
              "성동유치원",
              "중구유치원",
              "용산유치원",
            ].map((name, index) => (
              <MockedKindergartenMarker
                key={name}
                name={name}
                establishment={index % 2 === 0 ? "공립" : "사립"}
                size="sm"
                showLabel={false}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">줌 인 뷰 (상세 정보)</h3>
        <div className="w-full max-w-2xl rounded-lg bg-primary-normal02 p-6">
          <div className="flex justify-center">
            <MockedKindergartenMarker
              name="서울시립어린이집"
              establishment="공립"
              size="lg"
              showLabel={true}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">검색 결과 하이라이트</h3>
        <div className="w-full max-w-2xl rounded-lg bg-primary-normal02 p-6">
          <div className="grid grid-cols-3 gap-8">
            <MockedKindergartenMarker
              name="검색된유치원"
              establishment="공립"
              size="lg"
              showLabel={true}
            />
            <MockedKindergartenMarker
              name="일반유치원1"
              establishment="사립"
              size="md"
              showLabel={true}
            />
            <MockedKindergartenMarker
              name="일반유치원2"
              establishment="공립"
              size="md"
              showLabel={true}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    name: "서울유치원",
    establishment: "공립",
    size: "md",
    showLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
