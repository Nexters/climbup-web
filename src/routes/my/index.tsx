import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MyInfo } from "./-components/MyInfo";
import { MyScore } from "./-components/MyScore";
import { VideoCard } from "./-components/VideoCard";
import { VideoTab, type VideoTabId } from "./-components/VideoTab";

export const Route = createFileRoute("/my/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTab, setSelectedTab] = useState<VideoTabId>("all");

  return (
    <main className="min-h-dvh h-full bg-neutral-200 relative">
      <div className="flex flex-col h-full relative">
        <header className="flex-center h-[52px] w-full">
          <Link to="/" className="flex-center">
            <h1 className="t-m-24-b text-neutral-800">Holdy</h1>
          </Link>
        </header>
        <MyInfo />
        <MyScore />
        <div className="flex flex-col gap-4 pt-6 px-6">
          {/* TODO: 레벨 보기 Dialog */}
          <button
            type="button"
            className="flex items-start justify-between t-p-14-sb text-neutral-500"
          >
            <span>레벨은 어떻게 올리나요?</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="레벨 보기 바로가기"
              role="img"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#6C737F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com"
            className="flex items-start justify-between t-p-14-sb text-neutral-500"
          >
            <span>홀디에게 의견 보내기</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="홀디에게 의견 보내기 바로가기"
              role="img"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#6C737F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="w-full mt-6 mb-4 h-1 bg-[#E9EBEE]" />
        <nav className="flex px-4 py-3 top-0 sticky bg-neutral-200 z-20 items-center justify-between">
          <h2 className="t-p-20-sb text-neutral-700">성공 영상</h2>
          <VideoTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </nav>
        <div className="grid grid-cols-2 gap-x-2 gap-y-3 px-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const key = `video-card-${index}`;
            return (
              <VideoCard
                key={key}
                imageUrl="https://picsum.photos/200/300"
                sectorName="강남점"
                score={100}
                completedAt="2025-01-01"
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
