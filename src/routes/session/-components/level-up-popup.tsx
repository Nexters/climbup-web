import { motion } from "motion/react";
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import assetHighlight from "@/assets/images/ic_highlight.png";
import assetBadge from "@/assets/images/ic_levelup_badge.png";
import assetGradient from "@/assets/images/ic_levelup_gr.png";
import assetTextLevelup from "@/assets/images/text_levelup.png";

interface LevelUpPopupProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
}

export const LevelUpPopup = ({ isOpen, onClose }: LevelUpPopupProps) => {
  // 3초 후 자동으로 닫기
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-50 bg-neutral-800">
          {/* 레벨업 텍스트와 뱃지 */}
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 flex flex-center">
            <motion.img
              className="absolute object-cover w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src={assetGradient}
              alt="백그라운드 그라데이션"
            />
            {/* 하이라이트 - 360도 회전 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
              <motion.img
                className="absolute object-cover will-change-transform w-full h-full"
                src={assetHighlight}
                alt="하이라이트"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>

          <div className="absolute top-[calc(50%-66px)] left-1/2 -translate-x-1/2 -translate-y-[calc(50%-33px)] flex flex-col gap-4 items-center justify-center">
            {/* 레벨업 텍스트 - 위로 바운스 */}
            <motion.img
              src={assetTextLevelup}
              alt="레벨업"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                bounce: 0.6,
                delay: 0.3,
              }}
            />

            {/* 뱃지 */}
            <motion.img
              className="w-[130px] h-[140px] z-10"
              src={assetBadge}
              alt="뱃지"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                bounce: 0.4,
                delay: 0.6,
              }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
