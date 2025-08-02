import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { LevelProgress } from "./LevelProgress";

const meta: Meta<typeof LevelProgress> = {
  title: "Components/LevelProgress",
  component: LevelProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentExp: {
      control: { type: "number", min: 0 },
      description: "현재 경험치",
    },
    levelExp: {
      control: { type: "number", min: 1 },
      description: "레벨업에 필요한 경험치",
    },
    level: {
      control: { type: "number", min: 1 },
      description: "현재 레벨",
    },
    progress: {
      control: { type: "number", min: 0, max: 100 },
      description: "진행률 (0-100%)",
    },
    onLevelUp: {
      action: "levelUp",
      description: "레벨업 시 호출되는 콜백",
    },
    onProgressChange: {
      action: "progressChange",
      description: "진행률 변경 시 호출되는 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 피그마 디자인 기반 기본 스토리
export const Default: Story = {
  args: {
    currentExp: 1550,
    levelExp: 1800,
    level: 4,
  },
};

// 초기 레벨 (낮은 진행률)
export const LowProgress: Story = {
  args: {
    currentExp: 150,
    levelExp: 500,
    level: 1,
  },
};

// 높은 진행률
export const HighProgress: Story = {
  args: {
    currentExp: 1700,
    levelExp: 1800,
    level: 10,
  },
};

// 최대 진행률 (100%)
export const MaxProgress: Story = {
  args: {
    currentExp: 1800,
    levelExp: 1800,
    level: 15,
  },
};

// 높은 레벨
export const HighLevel: Story = {
  args: {
    currentExp: 25000,
    levelExp: 30000,
    level: 50,
  },
};

// Controlled Progress 스토리
export const ControlledProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(30);

    return (
      <div className="space-y-4">
        <LevelProgress
          currentExp={1550}
          levelExp={1800}
          level={4}
          progress={progress}
          onProgressChange={setProgress}
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setProgress(Math.max(0, progress - 10))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -10%
          </button>
          <button
            type="button"
            onClick={() => setProgress(Math.min(100, progress + 10))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +10%
          </button>
        </div>
      </div>
    );
  },
};

// 레벨업 시뮬레이션 스토리
export const LevelUpSimulation: Story = {
  render: () => {
    const [level, setLevel] = useState(4);
    const [currentExp, setCurrentExp] = useState(1700);
    const levelExp = 1800;

    const handleLevelUp = () => {
      console.log("🎉 Level Up!");
    };

    const addExp = () => {
      if (currentExp >= levelExp) {
        setLevel((prev) => prev + 1);
        setCurrentExp(0);
      } else {
        setCurrentExp((prev) => Math.min(levelExp, prev + 100));
      }
    };

    return (
      <div className="space-y-4">
        <LevelProgress
          currentExp={currentExp}
          levelExp={levelExp}
          level={level}
          onLevelUp={handleLevelUp}
        />
        <button
          type="button"
          onClick={addExp}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          경험치 +100 추가
        </button>
        <div className="text-sm text-gray-600">
          현재: {currentExp}/{levelExp} EXP (레벨 {level})
        </div>
      </div>
    );
  },
};

// 다양한 레벨 시나리오
export const LevelScenarios: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">레벨 1 (초보자)</h3>
          <LevelProgress currentExp={250} levelExp={500} level={1} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">레벨 4 (피그마 디자인)</h3>
          <LevelProgress currentExp={1550} levelExp={1800} level={4} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">레벨 10 (중급자)</h3>
          <LevelProgress currentExp={7500} levelExp={10000} level={10} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">레벨 50 (고급자)</h3>
          <LevelProgress currentExp={45000} levelExp={50000} level={50} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">레벨 100 (마스터)</h3>
          <LevelProgress currentExp={99000} levelExp={100000} level={100} />
        </div>
      </div>
    );
  },
};

// 에지 케이스들
export const EdgeCases: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">0% 진행률</h3>
          <LevelProgress currentExp={0} levelExp={1800} level={1} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">100% 진행률</h3>
          <LevelProgress currentExp={1800} levelExp={1800} level={1} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">
            경험치가 필요 경험치보다 많은 경우
          </h3>
          <LevelProgress currentExp={2000} levelExp={1800} level={1} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">매우 높은 레벨</h3>
          <LevelProgress currentExp={999999} levelExp={1000000} level={999} />
        </div>
      </div>
    );
  },
};

// 피그마 디자인 정확한 복제
export const FigmaDesign: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">
            피그마 디자인 정확한 복제
          </h3>
          <LevelProgress currentExp={1550} levelExp={1800} level={4} />
        </div>
        <div className="text-xs text-gray-500">
          <p>• 진행률 바: 211px × 20px</p>
          <p>• 레벨 원형: 32px × 32px</p>
          <p>• 현재 경험치: 1550 / 목표: 1800</p>
          <p>• 레벨: 4</p>
        </div>
      </div>
    );
  },
};
