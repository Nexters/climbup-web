import { AnimatePresence, motion } from "motion/react";
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import assetLevelup from "@/assets/images/levelup.png";
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
      <Dialog.Title className="hidden">레벨업</Dialog.Title>
      <Dialog.Description className="hidden">레벨업</Dialog.Description>
      <AnimatePresence>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral-800 max-w-[600px] mx-auto" />
          <Dialog.Content className="fixed inset-0 z-50 bg-neutral-800 max-w-[600px] mx-auto">
            {/* 레벨업 텍스트와 뱃지 */}
            {/* 배경 그라데이션 */}
            <div className="absolute inset-0 flex flex-center">
              <motion.img
                className="z-20 max-w-[240px] w-full object-cover absolute top-[20%]"
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
              <motion.img
                className="absolute object-cover w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src={assetLevelup}
                alt="백그라운드 그라데이션"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </AnimatePresence>
    </Dialog.Root>
  );
};
