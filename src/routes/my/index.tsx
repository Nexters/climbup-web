import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGroup, motion } from "motion/react";
import { Dialog } from "radix-ui";
import { useEffect, useMemo, useRef, useState } from "react";
import { DialogLevelDescriptionContent } from "@/components/dialog-level-description-content/DialogLevelDescriptionContent";
import { getAttempts } from "@/generated/attempts/attempts";
import { getHeaderToken } from "@/utils/cookie";
import { MyInfo } from "./-components/MyInfo";
import { MyScore } from "./-components/MyScore";
import { VideoCard } from "./-components/VideoCard";
import { VideoDetailSwiper } from "./-components/VideoDetailSwiper";
import { VideoTab, type VideoTabId } from "./-components/VideoTab";

export const Route = createFileRoute("/my/")({
  component: RouteComponent,
});

type VideoItem = {
  imageUrl: string;
  videoUrl: string;
  sectorName: string;
  score: number;
  completedAt: string;
};

const PAGE_SIZE = 10;

function RouteComponent() {
  const [selectedTab, setSelectedTab] = useState<VideoTabId>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fetchVideos = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }): Promise<{ items: VideoItem[]; nextPage?: number }> => {
    const gymId = selectedTab ? Number(selectedTab) : undefined;

    const response = await getAttempts(
      {
        page: pageParam,
        size: PAGE_SIZE,
        gymId,
        success: true,
      },
      {
        headers: getHeaderToken(),
      }
    );

    const items: VideoItem[] = (response.data?.content ?? []).map(
      (attempt) => ({
        imageUrl: attempt.thumbnailUrl ?? "",
        videoUrl: attempt.videoUrl ?? "",
        sectorName: attempt.sectorName ?? "",
        score: attempt.routeScore ?? 0,
        completedAt: attempt.attemptedAt ?? "",
      })
    );

    const hasNext = !response.data?.last;
    return {
      items,
      nextPage: hasNext ? pageParam + 1 : undefined,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["my-videos", selectedTab],
      queryFn: fetchVideos,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const flatItems = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  // 리스트 영역 무한스크롤: sentinel 관찰 시 다음 페이지 로드 (목업)
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="min-h-dvh h-full bg-neutral-200 relative">
      <LayoutGroup>
        <div className="flex flex-col h-full relative">
          <header className="flex-center h-[52px] w-full">
            <Link to="/mission" className="flex-center">
              <h1 className="t-m-24-b text-neutral-800">Holdy</h1>
            </Link>
          </header>
          <MyInfo />
          <MyScore />
          <div className="flex flex-col gap-4 pt-6 px-6">
            <Dialog.Root>
              <Dialog.Trigger
                type="button"
                className="flex items-start justify-between t-p-14-sb text-neutral-500"
              >
                {/* TODO: 레벨 보기 Dialog */}
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
              </Dialog.Trigger>
              <DialogLevelDescriptionContent />
            </Dialog.Root>
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
            <VideoTab
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </nav>
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 px-4">
            {flatItems.map((item, index) => {
              const key = `video-card-${index}`;
              return (
                <VideoCard
                  key={key}
                  layoutId={`video-card-${index}`}
                  imageUrl={item.imageUrl}
                  sectorName={item.sectorName}
                  score={item.score}
                  completedAt={item.completedAt}
                  onClick={() => setOpenIndex(index)}
                />
              );
            })}
            <div ref={sentinelRef} className="h-6 col-span-2" />
          </div>
          <Dialog.Root
            open={openIndex !== null}
            onOpenChange={(open: boolean) => {
              if (!open) setOpenIndex(null);
            }}
          >
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[95] bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
              {openIndex !== null ? (
                <Dialog.Content asChild>
                  <motion.div
                    layout
                    layoutId={`video-card-${openIndex}`}
                    className="fixed inset-0 z-[100]"
                  >
                    <VideoDetailSwiper
                      items={flatItems}
                      initialIndex={openIndex}
                      hasNextPage={!!hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                      fetchNextPage={() => fetchNextPage()}
                    />
                  </motion.div>
                </Dialog.Content>
              ) : null}
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </LayoutGroup>
    </main>
  );
}
