import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["blue", "red", "green", "neutral"],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    variant: "BLUE",
    children: "label",
  },
};

export const Red: Story = {
  args: {
    variant: "RED",
    children: "label",
  },
};

export const Green: Story = {
  args: {
    variant: "GREEN",
    children: "label",
  },
};

export const Neutral: Story = {
  args: {
    variant: "NEUTRAL",
    children: "label",
  },
};

export const AllVariants: Story = {
  args: {
    children: "label",
  },
  render: () => (
    <div className="flex gap-2">
      <Tag variant="BLUE">label</Tag>
      <Tag variant="RED">label</Tag>
      <Tag variant="GREEN">label</Tag>
      <Tag variant="NEUTRAL">label</Tag>
    </div>
  ),
};
