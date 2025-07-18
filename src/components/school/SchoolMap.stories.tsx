import MapError from "./MapError";
import MapSkeleton from "./MapSkeleton";

import type { Meta, StoryObj } from "@storybook/react";

const SEOUL_CITY = {
  latitude: 37.5663,
  longitude: 126.9779,
};

const MapErrorMeta = {
  title: "Components/School/Map/Status",
  component: MapError,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "카카오맵 로딩, 에러 상태를 보여줍니다.",
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
    mapError: {
      control: { type: "text" },
      description: "에러 메시지",
    },
  },
} satisfies Meta<typeof MapError>;

export default MapErrorMeta;
type MapErrorStory = StoryObj<typeof MapErrorMeta>;

export const Error: MapErrorStory = {
  args: {
    height: "h-72",
    latitude: SEOUL_CITY.latitude,
    longitude: SEOUL_CITY.longitude,
    mapError: "카카오맵 키가 설정되지 않았습니다",
  },
};

export const Loading: StoryObj<Meta<typeof MapSkeleton>> = {
  render: () => (
    <div className="h-72 w-96 overflow-hidden rounded-lg border border-gray-200">
      <MapSkeleton />
    </div>
  ),
};
