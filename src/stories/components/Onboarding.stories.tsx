import type { Meta, StoryObj } from "@storybook/react-vite";
import { DriverExample } from "@/components/onboarding/DriverExample";

const meta = {
  component: DriverExample,
  title: "Components/Onboarding/DriverExample",
} satisfies Meta<typeof DriverExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
