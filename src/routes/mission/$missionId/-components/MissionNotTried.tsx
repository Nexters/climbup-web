import { useRef, useState } from "react";
import MissionNotTriedDefault from "./MissionNotTriedDefault";
import MissionNotTriedFailed from "./MissionNotTriedFailed";
import MissionNotTriedReviewing from "./MissionNotTriedReviewing";
import MissionNotTriedSuccess from "./MissionNotTriedSuccess";

interface MissionNotTriedProps {
  sectorName: string;
  missionImage: string;
  score: number;
}

type MissionState = "DEFAULT" | "REVIEWING" | "SUCCESS" | "FAILED";

type CapturedMedia = {
  file: File;
  preview: string;
} | null;

export default function MissionNotTried(props: MissionNotTriedProps) {
  const [state, setState] = useState<MissionState>("DEFAULT");
  const [capturedMedia, setCapturedMedia] = useState<CapturedMedia>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setState("SUCCESS");
  };

  const handleReviewFailed = () => {
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
            return <MissionNotTriedSuccess />;
          case "FAILED":
            return <MissionNotTriedFailed onRetry={handleRetry} />;
        }
      })()}
    </div>
  );
}
