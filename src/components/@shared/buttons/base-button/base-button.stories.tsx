import Button from ".";

import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Component/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: [
        "primary",
        "secondary",
        "transparent",
        "transparent_gray",
        "destructive",
        "link",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
    shape: {
      options: ["default", "rounded", "full"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Submit: Story = {
  render: () => (
    <div className="flex w-24 flex-col gap-4">
      <Button variant="primary" size="lg" shape="default">
        로그인
      </Button>
      <Button variant="primary" size="lg" shape="default" disabled>
        로그인
      </Button>
    </div>
  ),
};

export const Confirm: Story = {
  args: {
    children: "확인",
    variant: "transparent",
    size: "sm",
  },
};

export const Cancel: Story = {
  args: {
    children: "취소",
    variant: "transparent_gray",
    size: "sm",
  },
};

export const Work_Term: Story = {
  args: {
    children: "근무",
    variant: "secondary",
    size: "sm",
    shape: "rounded",
  },
};
