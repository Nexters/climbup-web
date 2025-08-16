import { motion } from "motion/react";

const TABS = [
  {
    id: null,
    name: "전체",
  },
  {
    id: "1",
    name: "강남점",
  },
  {
    id: "2",
    name: "양재점",
  },
] as const;

export type VideoTabId = (typeof TABS)[number]["id"];

interface VideoTabProps {
  selectedTab: VideoTabId;
  setSelectedTab: (tabId: VideoTabId) => void;
}

export const VideoTab = ({ selectedTab, setSelectedTab }: VideoTabProps) => {
  return (
    <div className="flex items-center gap-2">
      {TABS.map(({ id, name }) => (
        <button
          type="button"
          className="relative flex-center px-4 py-2"
          key={id}
          onClick={() => setSelectedTab(id)}
        >
          <span className="t-p-14-sb text-neutral-500 z-10">{name}</span>
          {selectedTab === id && (
            <motion.div
              layoutId="video-tab-indicator"
              className="w-full bg-neutral-300 rounded-[24px] absolute inset-0 z-0"
            />
          )}
        </button>
      ))}
    </div>
  );
};
