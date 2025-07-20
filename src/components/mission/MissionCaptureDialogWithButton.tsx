import * as Dialog from "@radix-ui/react-dialog";
import { useRef } from "react";

interface MissionCaptureDialogWithButtonProps {
  sectorName: string;
}

export default function MissionCaptureDialogWithButton({
  sectorName,
}: MissionCaptureDialogWithButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // TODO: 파일 처리 로직
    console.log("Selected file:", file);
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

          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <img
              src={`https://placehold.co/800x1000`}
              alt="미션 이미지"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="p-4">
            <button
              type="button"
              onClick={handleCapture}
              className="w-full py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              촬영하기
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
