import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import MissionCapturing from "./-components/MissionCapturing";
import MissionFailure from "./-components/MissionFailure";
import MissionReviewing from "./-components/MissionReviewing";
import MissionSuccess from "./-components/MissionSuccess";

export const Route = createFileRoute("/mission/$missionId")({
  component: MissionDetail,
});

type CapturedMedia = {
  file: File;
  preview: string;
} | null;

type ResultState = "capturing" | "reviewing" | "success" | "failure";

function MissionDetail() {
  const { missionId } = Route.useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedMedia, setCapturedMedia] = useState<CapturedMedia>(null);
  const [resultState, setResultState] = useState<ResultState>("capturing");

  const handleCapture = () => {
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
    setResultState("reviewing");
  };

  const handleRetry = () => {
    if (capturedMedia) {
      URL.revokeObjectURL(capturedMedia.preview);
    }
    setCapturedMedia(null);
    setResultState("capturing");
    handleCapture();
  };

  const handleSuccess = () => {
    setResultState("success");
  };

  const handleFailure = () => {
    setResultState("failure");
  };

  const renderContent = () => {
    switch (resultState) {
      case "capturing":
        return <MissionCapturing onCapture={handleCapture} />;

      case "reviewing":
        return (
          <MissionReviewing
            videoUrl={capturedMedia?.preview || ""}
            onFailure={handleFailure}
            onRetry={handleRetry}
            onSuccess={handleSuccess}
          />
        );

      case "success":
        return <MissionSuccess />;

      case "failure":
        return <MissionFailure onRetry={handleRetry} />;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">미션 {missionId}</h1>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={() => window.history.back()}
        >
          닫기
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      {renderContent()}
    </div>
  );
}
