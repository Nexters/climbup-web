import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Design System/Typography",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

// 타이포그래피 예시 컴포넌트
const TypographyExample = ({
  className,
  label,
  text,
}: {
  className: string;
  label: string;
  text: string;
}) => (
  <div className="mb-6">
    <div className="text-sm text-neutral-500 mb-2 font-mono">{label}</div>
    <div className={className}>{text}</div>
  </div>
);

// 전체 타이포그래피 시스템 스토리
export const TypographySystem: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Typography System</h1>
        <p className="text-neutral-600">
          Holdy 디자인 시스템 타이포그래피입니다.
        </p>
      </div>

      {/* Pretendard 폰트 */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Pretendard</h2>

        <TypographyExample
          className="t-p-42-b"
          label=".t-p-42-b (42px, Bold, 700)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-32-b"
          label=".t-p-32-b (32px, Bold, 700)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-28-b"
          label=".t-p-28-b (28px, Bold, 700)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-22-sb"
          label=".t-p-22-sb (22px, SemiBold, 600)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-20-sb"
          label=".t-p-20-sb (20px, SemiBold, 600)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-18-sb"
          label=".t-p-18-sb (18px, SemiBold, 600)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-16-m"
          label=".t-p-16-m (16px, Medium, 500)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-14-sb"
          label=".t-p-14-sb (14px, SemiBold, 600)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-14-m"
          label=".t-p-14-m (14px, Medium, 500)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-12-m"
          label=".t-p-12-m (12px, Medium, 500)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-p-10-sb"
          label=".t-p-10-sb (10px, SemiBold, 600)"
          text="해당 문구는 텍스트입니다"
        />
      </div>

      {/* Montserrat 폰트 */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Montserrat</h2>

        <TypographyExample
          className="t-m-56-b"
          label=".t-m-56-b (56px, Bold, 800)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-m-48-b"
          label=".t-m-48-b (48px, Bold, 800)"
          text="해당 문구는 텍스트입니다"
        />

        <TypographyExample
          className="t-m-24-b"
          label=".t-m-24-b (24px, Bold, 800)"
          text="해당 문구는 텍스트입니다"
        />
      </div>
    </div>
  ),
};

// Pretendard 개별 스토리
export const PretendardFont: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Pretendard 폰트</h2>

      <TypographyExample
        className="t-p-42-b"
        label=".t-p-42-b (42px, Bold, 700)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-32-b"
        label=".t-p-32-b (32px, Bold, 700)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-28-b"
        label=".t-p-28-b (28px, Bold, 700)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-22-sb"
        label=".t-p-22-sb (22px, SemiBold, 600)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-20-sb"
        label=".t-p-20-sb (20px, SemiBold, 600)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-18-sb"
        label=".t-p-18-sb (18px, SemiBold, 600)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-16-m"
        label=".t-p-16-m (16px, Medium, 500)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-14-sb"
        label=".t-p-14-sb (14px, SemiBold, 600)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-14-m"
        label=".t-p-14-m (14px, Medium, 500)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-12-m"
        label=".t-p-12-m (12px, Medium, 500)"
        text="해당 문구는 텍스트입니다"
      />

      <TypographyExample
        className="t-p-10-sb"
        label=".t-p-10-sb (10px, SemiBold, 600)"
        text="해당 문구는 텍스트입니다"
      />
    </div>
  ),
};

// Montserrat 개별 스토리
export const MontserratFont: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Montserrat 폰트</h2>

      <TypographyExample
        className="t-m-56-b"
        label=".t-m-56-b (56px, Bold, 800)"
        text="HOLDY"
      />

      <TypographyExample
        className="t-m-48-b"
        label=".t-m-48-b (48px, Bold, 800)"
        text="HOLDY"
      />

      <TypographyExample
        className="t-m-24-b"
        label=".t-m-24-b (24px, Bold, 800)"
        text="HOLDY"
      />
    </div>
  ),
};
