/**
 * 영상 다운로드 관련 유틸리티 함수들
 */

interface DownloadOptions {
  filename?: string;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

/**
 * 영상 URL로부터 파일을 다운로드하는 함수
 */
export function downloadVideo(
  videoUrl: string,
  options: DownloadOptions = {}
): void {
  const { filename = `video_${Date.now()}.mp4`, onError, onComplete } = options;

  try {
    // 다운로드 링크 생성 및 클릭
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = filename;
    link.target = "_blank"; // 새 탭에서 열기

    // 링크를 DOM에 임시로 추가하고 클릭
    document.body.appendChild(link);
    link.click();

    // 정리
    document.body.removeChild(link);

    onComplete?.();
  } catch (error) {
    console.error("Video download failed:", error);
    onError?.(error as Error);
    throw error;
  }
}

/**
 * 파일명을 안전하게 생성하는 함수
 */
export function generateSafeFilename(
  sectorName: string,
  completedAt: string,
  score: number
): string {
  // 날짜 포맷팅 (YYYY-MM-DD 형식으로 변환)
  const dateObj = new Date(completedAt);
  const dateString = dateObj.toISOString().split("T")[0];

  // 특수문자 제거 및 공백을 언더스코어로 변경
  const safeSectorName = sectorName
    .replace(/[^a-zA-Z0-9가-힣\s]/g, "")
    .replace(/\s+/g, "_");

  return `${safeSectorName}_${dateString}_score${score}.mp4`;
}

/**
 * 다운로드 상태를 관리하는 커스텀 훅에서 사용할 수 있는 타입들
 */
export type { DownloadOptions };
