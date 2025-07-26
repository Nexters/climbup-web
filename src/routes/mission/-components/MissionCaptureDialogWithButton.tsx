import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import MissionCapturing from "./MissionCapturing";
import MissionFailure from "./MissionFailure";
import MissionReviewing from "./MissionReviewing";
import MissionSuccess from "./MissionSuccess";

interface MissionCaptureDialogWithButtonProps {
  sectorName: string;
}

type CapturedMedia = {
  file: File;
  preview: string;
} | null;

type ResultState = "capturing" | "reviewing" | "success" | "failure";

export default function MissionCaptureDialogWithButton({
  sectorName,
}: MissionCaptureDialogWithButtonProps) {
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="w-full py-2 px-4 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          도전하기
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 flex flex-col bg-white">
          <div className="flex justify-between items-center p-4">
            <Dialog.Title className="text-xl font-bold">
              {sectorName}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                닫기
              </button>
            </Dialog.Close>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
