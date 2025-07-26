import type { Meta, StoryObj } from "@storybook/react-vite";
import colors from "../../tailwind-config/colors";

const meta: Meta = {
  title: "Design System/Colors",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

const ColorPalette = ({
  colorName,
  colorValues,
}: {
  colorName: string;
  colorValues: Record<string, string>;
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4 capitalize">{colorName}</h3>
    <div className="flex flex-wrap gap-3">
      {Object.entries(colorValues).map(([shade, hex]) => (
        <div key={shade} className="flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            style={{ backgroundColor: hex }}
            title={`${colorName}-${shade}: ${hex}`}
          />
          <div className="text-xs font-medium text-neutral-600 mt-2">
            {shade}
          </div>
          <div className="text-xs text-neutral-400 font-mono">{hex}</div>
        </div>
      ))}
    </div>
  </div>
);

// 그라디언트 컴포넌트
const GradientPalette = ({
  gradients,
}: {
  gradients: Record<string, string>;
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4">Gradients</h3>
    <div className="flex flex-wrap gap-4">
      {Object.entries(gradients).map(([name, gradient]) => (
        <div key={name} className="flex flex-col items-center">
          <div
            className="w-32 h-20 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            style={{ background: gradient }}
            title={`${name}: ${gradient}`}
          />
          <div className="text-sm font-medium text-neutral-600 capitalize mt-2">
            {name}
          </div>
          <div className="text-xs text-neutral-400 font-mono break-all max-w-32 text-center">
            {gradient}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 전체 컬러 시스템 스토리
export const ColorSystem: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Color System</h1>
        <p className="text-neutral-600">
          Holdy 디자인 시스템 컬러 팔레트입니다.
        </p>
      </div>

      {/* Neutral Colors */}
      <ColorPalette colorName="neutral" colorValues={colors.neutral} />

      {/* Purple Colors */}
      <ColorPalette colorName="purple" colorValues={colors.purple} />

      {/* Green Colors */}
      <ColorPalette colorName="green" colorValues={colors.green} />

      {/* Orange Colors */}
      <ColorPalette colorName="orange" colorValues={colors.orange} />

      {/* Red Colors */}
      <ColorPalette colorName="red" colorValues={colors.red} />

      {/* Blue Colors */}
      <ColorPalette colorName="blue" colorValues={colors.blue} />

      {/* Gradients */}
      <GradientPalette gradients={colors.gradient} />
    </div>
  ),
};

// 컬러 사용 예시 스토리
export const ColorUsage: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">컬러 사용 예시</h2>

        {/* 텍스트 컬러 예시 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Text Colors</h3>
          <div className="space-y-2">
            <p className="text-neutral-900">Primary Text (neutral-900)</p>
            <p className="text-neutral-600">Secondary Text (neutral-600)</p>
            <p className="text-neutral-400">Muted Text (neutral-400)</p>
            <p className="text-purple-600">Accent Text (purple-600)</p>
            <p className="text-green-600">Success Text (green-600)</p>
            <p className="text-red-600">Error Text (red-600)</p>
          </div>
        </div>

        {/* 배경 컬러 예시 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Background Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-100 rounded-lg">
              <p className="text-neutral-900">Light Background (neutral-100)</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <p className="text-purple-900">Purple Background (purple-100)</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <p className="text-green-900">Green Background (green-100)</p>
            </div>
            <div className="p-4 bg-orange-100 rounded-lg">
              <p className="text-orange-900">Orange Background (orange-100)</p>
            </div>
          </div>
        </div>

        {/* 그라디언트 예시 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Gradient Example</h3>
          <div
            className="p-8 rounded-lg text-white text-center"
            style={{ background: colors.gradient.neutral }}
          >
            <h4 className="text-xl font-bold mb-2">Gradient Background</h4>
            <p>Neutral gradient from neutral-500 to neutral-900</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
