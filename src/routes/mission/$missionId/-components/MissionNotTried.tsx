import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createAttempt } from "@/generated/attempts/attempts";
import { getHeaderToken } from "@/utils/cookie";
import MissionNotTriedDefault from "./MissionNotTriedDefault";
import MissionNotTriedFailed from "./MissionNotTriedFailed";
import MissionNotTriedReviewing from "./MissionNotTriedReviewing";
import MissionNotTriedSuccess from "./MissionNotTriedSuccess";

interface MissionNotTriedProps {
  sectorName: string;
  sectorImage: string;
  difficulty: string;
  missionImage: string;
  score: number;
  videoUrl: string;
  attemptId: number | null;
  missionId: number;
}

type MissionState = "DEFAULT" | "REVIEWING" | "SUCCESS" | "FAILED";

type CapturedMedia = {
  file: File;
  preview: string;
} | null;

export default function MissionNotTried(props: MissionNotTriedProps) {
  const queryClient = useQueryClient();

  const [state, setState] = useState<MissionState>("DEFAULT");
  const [capturedMedia, setCapturedMedia] = useState<CapturedMedia>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createAttemptMutate } = useMutation({
    mutationFn: (success: boolean) =>
      createAttempt(
        {
          missionId: props.missionId,
          success,
        },
        { headers: getHeaderToken() }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recommendations"],
      });
    },
  });

  const handleStart = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setCapturedMedia({
      file,
      preview: previewUrl,
    });
    setState("REVIEWING");
  };

  const handleReviewSuccess = () => {
    createAttemptMutate(true, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["recommendations"],
        });
      },
    });
    setState("SUCCESS");
  };

  const handleReviewFailed = () => {
    createAttemptMutate(false, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["recommendations"],
        });
      },
    });
    setState("FAILED");
  };

  const handleRetry = () => {
    if (capturedMedia) {
      URL.revokeObjectURL(capturedMedia.preview);
    }
    setCapturedMedia(null);
    handleStart();
  };

  return (
    <div
      className={`fixed inset-0 flex flex-col ${state === "REVIEWING" ? "bg-neutral-500" : "bg-neutral-900"}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {(() => {
        switch (state) {
          case "DEFAULT":
            return <MissionNotTriedDefault {...props} onStart={handleStart} />;
          case "REVIEWING":
            return (
              <MissionNotTriedReviewing
                videoUrl={capturedMedia?.preview || ""}
                onSuccess={handleReviewSuccess}
                onFailed={handleReviewFailed}
                onRetry={handleRetry}
              />
            );
          case "SUCCESS":
            return <MissionNotTriedSuccess attemptId={props.attemptId} />;
          case "FAILED":
            return (
              <MissionNotTriedFailed
                videoUrl={props.videoUrl}
                onRetry={handleRetry}
              />
            );
        }
      })()}
    </div>
  );
}
