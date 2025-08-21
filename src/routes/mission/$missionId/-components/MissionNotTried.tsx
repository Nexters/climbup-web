import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createAttempt } from "@/generated/attempts/attempts";
import { getHeaderToken } from "@/utils/cookie";
import { useUploadAttemptVideo } from "../-hooks/useUploadAttemptVideo";
import MissionNotTriedDefault from "./MissionNotTriedDefault";
import MissionNotTriedFailed from "./MissionNotTriedFailed";
import MissionNotTriedReviewing from "./MissionNotTriedReviewing";
import MissionNotTriedSuccess from "./MissionNotTriedSuccess";
import MissionVideoUploadOverlay from "./MissionVideoUploadOverlay";

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
  const [successAttemptId, setSuccessAttemptId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadVideo, isUploading, percentage } = useUploadAttemptVideo();

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

  const handleReviewSuccess = async () => {
    await handleReview(true);
  };

  const handleReviewFailed = async () => {
    await handleReview(false);
  };

  const handleReview = async (isSuccess: boolean) => {
    try {
      const response = await createAttemptMutate(isSuccess);
      const newAttemptId = response.data?.missionAttemptId;

      if (newAttemptId && capturedMedia?.file) {
        await uploadVideo(newAttemptId, capturedMedia.file, {
          onSuccess: () => {
            if (isSuccess) {
              setSuccessAttemptId(newAttemptId);
            }
            setState(isSuccess ? "SUCCESS" : "FAILED");
          },
          onError: (error) => {
            console.error("Upload failed:", error);
            setState("FAILED");
          },
        });
      } else {
        setState(isSuccess ? "SUCCESS" : "FAILED");
      }
    } catch (error) {
      console.error("Review failed:", error);
      setState(isSuccess ? "SUCCESS" : "FAILED");
    }
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
      className={`fixed inset-0 flex flex-col ${state === "REVIEWING" || state === "FAILED" ? "bg-neutral-500" : "bg-neutral-800"}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {isUploading && <MissionVideoUploadOverlay percentage={percentage} />}

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
            return (
              <MissionNotTriedSuccess
                attemptId={successAttemptId}
                onStart={() => setState("DEFAULT")}
              />
            );
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
