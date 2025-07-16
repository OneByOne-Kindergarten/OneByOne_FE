import { Provider } from "jotai";
import { BrowserRouter } from "react-router-dom";

import ReportDropDown from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feedback/DropDown/ReportDropDown",
  component: ReportDropDown,
  parameters: {
    docs: {
      description: {
        component:
          "게시글, 댓글, 리뷰에 대한 신고/삭제 기능을 제공하는 드롭다운입니다.",
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <Provider>
        <BrowserRouter>
          <div style={{ padding: "20px" }}>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ReportDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostByOtherUser: Story = {
  args: {
    targetId: 123,
    targetType: "POST",
    authorNickname: "다른사용자",
  },
  parameters: {
    docs: {
      description: {
        story: "다른 사용자의 게시글 - 신고하기만 표시됩니다.",
      },
    },
  },
};

export const PostByCurrentUser: Story = {
  args: {
    targetId: 123,
    targetType: "POST",
    authorNickname: "testUser",
  },
  parameters: {
    docs: {
      description: {
        story: "본인 게시글 - 삭제하기와 신고하기가 모두 표시됩니다.",
      },
    },
  },
};

export const CommentByOtherUser: Story = {
  args: {
    targetId: 456,
    targetType: "COMMENT",
    postId: 123,
    authorNickname: "다른사용자",
  },
  parameters: {
    docs: {
      description: {
        story: "다른 사용자의 댓글 - 신고하기만 표시됩니다.",
      },
    },
  },
};

export const Review: Story = {
  args: {
    targetId: 789,
    targetType: "REVIEW",
    authorNickname: "다른사용자",
  },
  parameters: {
    docs: {
      description: {
        story: "리뷰에 대한 드롭다운 - 신고하기만 표시됩니다.",
      },
    },
  },
};
