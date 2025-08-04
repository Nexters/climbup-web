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
    variant: "blue",
    children: "label",
  },
};

export const Red: Story = {
  args: {
    variant: "red",
    children: "label",
  },
};

export const Green: Story = {
  args: {
    variant: "green",
    children: "label",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "label",
  },
};

export const AllVariants: Story = {
  args: {
    children: "label",
  },
  render: () => (
    <div className="flex gap-2">
      <Tag variant="blue">label</Tag>
      <Tag variant="red">label</Tag>
      <Tag variant="green">label</Tag>
      <Tag variant="neutral">label</Tag>
    </div>
  ),
};
