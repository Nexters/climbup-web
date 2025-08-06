import type { UserMissionAttemptResponse } from "@/generated/model";

export const calculateMissionStatus = (
  attempts: UserMissionAttemptResponse[] = []
): "not_tried" | "success" | "failed" => {
  if (attempts.length === 0) {
    return "not_tried";
  }
  if (attempts.some((attempt) => attempt.success)) {
    return "success";
  }
  return "failed";
};
