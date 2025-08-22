import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getAllGyms } from "@/generated/climbing-gym/climbing-gym";
import type { GymResponse } from "@/generated/model";
import { ALL_TAB_ID } from "..";

export type VideoTabId = GymResponse["id"];

interface VideoTabProps {
  selectedTab: VideoTabId;
  setSelectedTab: (tabId: VideoTabId) => void;
}

export const VideoTab = ({ selectedTab, setSelectedTab }: VideoTabProps) => {
  const { data: gyms = [{ id: ALL_TAB_ID, branchName: "전체" }] } = useQuery({
    queryKey: ["gyms"],
    queryFn: () => getAllGyms(),
    select: (data) => [
      { id: ALL_TAB_ID, branchName: "전체" },
      ...(data.data ?? []),
    ],
  });

  return (
    <div className="flex items-center gap-2">
      {gyms?.map(({ id, branchName }) => (
        <button
          type="button"
          className="relative flex-center px-4 py-2"
          key={id}
          onClick={() => setSelectedTab(id)}
        >
          <span className="t-p-14-sb text-neutral-500 z-10">{branchName}</span>
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
