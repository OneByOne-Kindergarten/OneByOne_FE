import "@/styles/global.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import QueryProvider from "../src/components/@shared/providers/QueryProvider";

import type { Preview } from "@storybook/react";

// 스토리북 환경에서 카카오맵 API 키를 모킹
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).kakao = {
    maps: {
      load: () => {
        console.warn("Kakao Maps API is mocked in Storybook");
      },
    },
  };
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryProvider>
          <Story />
        </QueryProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 스토리북에서 환경변수 모킹
    env: {
      VITE_KAKAO_JAVASCRIPT_KEY: "mocked-key-for-storybook",
    },
  },
};

export default preview;
