import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import MapError from "./MapError";
import MapSkeleton from "./MapSkeleton";

import type { Meta, StoryObj } from "@storybook/react";

const SEOUL_CITY = {
  latitude: 37.5663,
  longitude: 126.9779,
};

const meta = {
  title: "Components/School/Map/Status",
  component: MapError,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "카카오맵 로딩, 에러 상태를 보여주는 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: { type: "text" },
      description: "지도 높이 (Tailwind CSS 클래스)",
    },
    latitude: {
      control: { type: "number", step: 0.000001 },
      description: "지도 중심의 위도",
    },
    longitude: {
      control: { type: "number", step: 0.000001 },
      description: "지도 중심의 경도",
    },
    error: {
      control: { type: "object" },
      description: "에러 객체",
    },
  },
} satisfies Meta<typeof MapError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    height: "h-72",
    latitude: SEOUL_CITY.latitude,
    longitude: SEOUL_CITY.longitude,
    error: new Error("카카오맵 키가 설정되지 않았습니다"),
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
              ["height", "string", "지도 높이 Tailwind 클래스 (필수)"],
              ["latitude", "number", "지도 중심의 위도 (필수)"],
              ["longitude", "number", "지도 중심의 경도 (필수)"],
              ["mapError", "string", "에러 메시지 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["container", "relative", "relative"],
              ["background", "gray-100", "bg-gray-100"],
              ["border", "gray-200", "border-gray-200"],
              ["border radius", "8px", "rounded-lg"],
              ["overflow", "hidden", "overflow-hidden"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Error States"
            headers={["state", "message", "behavior"]}
            data={[
              [
                "API key error",
                "카카오맵 키가 설정되지 않았습니다",
                "설정 안내",
              ],
              ["load error", "지도를 불러올 수 없습니다", "재시도 버튼"],
              [
                "network error",
                "네트워크 연결을 확인해주세요",
                "새로고침 안내",
              ],
              ["timeout", "지도 로딩 시간이 초과되었습니다", "재시도 옵션"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Loading States"
            headers={["component", "appearance", "duration"]}
            data={[
              ["skeleton", "회색 박스 애니메이션", "1-3초"],
              ["spinner", "로딩 스피너", "즉시 표시"],
              ["placeholder", "지도 모양 아이콘", "대체 표시"],
              ["progress", "진행률 표시", "긴 로딩 시"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "적절한 사용 시나리오",
                items: [
                  "카카오맵 API 로딩 중",
                  "지도 데이터 불러오기 실패",
                  "네트워크 연결 오류",
                  "API 키 설정 오류",
                  "위치 권한 거부",
                ],
              },
              {
                title: "에러 메시지 가이드라인",
                items: [
                  {
                    label: "명확성",
                    description: "사용자가 이해하기 쉬운 언어",
                  },
                  { label: "행동 유도", description: "다음 할 일 명시" },
                  { label: "기술적 상세", description: "개발자용 정보 최소화" },
                  { label: "해결 방법", description: "가능한 해결책 제시" },
                ],
              },
              {
                title: "로딩 상태 관리",
                items: [
                  "스켈레톤 UI로 예상 레이아웃 표시",
                  "적절한 로딩 애니메이션 사용",
                  "3초 이상 시 진행률 표시",
                  "사용자 취소 옵션 제공",
                  "재시도 기능 포함",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "스크린 리더용 상태 안내",
                  "키보드 네비게이션 지원",
                  "충분한 색상 대비",
                  "로딩 중 다른 액션 차단",
                  "명확한 에러 상태 표시",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    height: "h-72",
    latitude: SEOUL_CITY.latitude,
    longitude: SEOUL_CITY.longitude,
    error: new Error("카카오맵 키가 설정되지 않았습니다"),
  },
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Loading</h4>
          <div className="h-48 w-80 overflow-hidden rounded-lg border border-gray-200">
            <MapSkeleton />
          </div>
        </div>

        <h3 className="mb-4 text-lg font-semibold">API Key Error</h3>
        <div className="w-96">
          <MapError
            height="h-64"
            latitude={SEOUL_CITY.latitude}
            longitude={SEOUL_CITY.longitude}
            error={new Error("카카오맵 키가 설정되지 않았습니다")}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          카카오맵 API 키가 설정되지 않았을 때의 에러 상태
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Network Error</h3>
        <div className="w-96">
          <MapError
            height="h-64"
            latitude={SEOUL_CITY.latitude}
            longitude={SEOUL_CITY.longitude}
            error={new Error("네트워크 연결을 확인해주세요")}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          네트워크 연결 오류 시 표시되는 에러 상태
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Load Error</h3>
        <div className="w-96">
          <MapError
            height="h-64"
            latitude={SEOUL_CITY.latitude}
            longitude={SEOUL_CITY.longitude}
            error={new Error("지도를 불러올 수 없습니다")}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          일반적인 지도 로딩 실패 시 표시되는 에러 상태
        </p>
      </div>
    </div>
  ),
  args: {
    height: "h-72",
    latitude: SEOUL_CITY.latitude,
    longitude: SEOUL_CITY.longitude,
    error: new Error("카카오맵 키가 설정되지 않았습니다"),
  },
  parameters: {
    docs: {
      description: {
        story: "상태 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">유치원 상세 페이지</h3>
        <div className="w-full max-w-2xl rounded-lg border p-4">
          <div className="space-y-4">
            <h4 className="font-medium">서울유치원 위치</h4>
            <div className="w-full">
              <MapError
                height="h-64"
                latitude={37.5665}
                longitude={126.978}
                error={
                  new Error("카카오맵 서비스에 일시적인 문제가 발생했습니다")
                }
              />
            </div>
            <p className="text-sm text-gray-600">
              서울시 중구 명동길 123 (우)04000
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    height: "h-80",
    latitude: SEOUL_CITY.latitude,
    longitude: SEOUL_CITY.longitude,
    error: new Error("카카오맵 서비스에 일시적인 문제가 발생했습니다"),
  },
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
