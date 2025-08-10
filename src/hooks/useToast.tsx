import { type OverlayControllerComponent, overlay } from "overlay-kit";
import { useCallback } from "react";
import CloseIcon from "@/components/icons/CloseIcon";

let currentToastId: string | null = null;
let lastMessage = "";
let lastShownAt = 0;

function createToastController(message: string) {
  const Controller: OverlayControllerComponent = ({
    isOpen,
    close,
    unmount,
    overlayId,
  }) => {
    return (
      <div className="fixed inset-x-0 top-6 z-[1000] pointer-events-none">
        <div className="max-w-[600px] mx-auto px-4 flex justify-center">
          <div
            aria-live="polite"
            className={
              `pointer-events-auto bg-white text-neutral-900 rounded-[32px] shadow-xl p-6 flex items-start gap-3 ` +
              `transition-all duration-200 ease-in-out ` +
              (isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2")
            }
          >
            <div className="t-p-16-m whitespace-pre-line">{message}</div>
            <button
              type="button"
              aria-label="닫기"
              onClick={() => {
                try {
                  close();
                } finally {
                  setTimeout(unmount, 200);
                  if (currentToastId === overlayId) {
                    currentToastId = null;
                  }
                }
              }}
              className="shrink-0"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return Controller;
}

export const useToast = () => {
  const showToast = useCallback((message: string) => {
    const now = Date.now();
    if (message === lastMessage && now - lastShownAt < 1000) {
      return;
    }
    lastMessage = message;
    lastShownAt = now;

    if (currentToastId) {
      try {
        overlay.close(currentToastId);
      } catch {}
      currentToastId = null;
    }

    currentToastId = overlay.open(createToastController(message));
  }, []);

  return { showToast };
};

export default useToast;
