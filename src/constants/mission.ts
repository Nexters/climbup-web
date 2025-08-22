export const MISSION_GUIDE_COMPLETED_KEY = "MISSION_GUIDE_COMPLETED";

export const MISSION_STATUS_MESSAGES = {
  success: [
    "방금 그 루트 멋지게 완등했어요!",
    "이 정도면 다음 루트도 충분해요",
    "깔끔하게 올라왔네요",
    "조금씩 성장하고 있어요",
    "방금 루트 좋았어요!",
  ],
  failed: [
    "시도 자체가 멋져요",
    "다음엔 더 잘할 수 있어요",
    "아쉽지만 괜찮아요",
    "다음 도전도 기대돼요",
    "이 정도면 절반은 성공!",
  ],
  not_tried: [
    "이 루트가 궁금하지 않으신가요?",
    "내 레벨에 맞는 추천 루트에요",
    "내 실력 상승에 좋은 루트에요",
  ],
} as const;
