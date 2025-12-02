import "@/app/styles/global.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import QueryProvider from "../src/app/providers/QueryProvider";

import type { Preview } from "@storybook/react";

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
  },
};

export default preview;
