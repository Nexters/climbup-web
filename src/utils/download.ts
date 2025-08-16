/**
 * 영상 다운로드 관련 유틸리티 함수들
 */

interface DownloadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface DownloadOptions {
  filename?: string;
  onProgress?: (progress: DownloadProgress) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

/**
 * 영상 URL로부터 파일을 다운로드하는 함수
 */
export async function downloadVideo(
  videoUrl: string,
  options: DownloadOptions = {}
): Promise<void> {
  const {
    filename = `video_${Date.now()}.mp4`,
    onProgress,
    onError,
    onComplete,
  } = options;

  try {
    // AbortController로 다운로드 취소 가능하게 구현
    const controller = new AbortController();

    const response = await fetch(videoUrl, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      loaded += value.length;

      // 진행률 콜백 호출
      if (onProgress && total > 0) {
        const percentage = Math.round((loaded / total) * 100);
        onProgress({ loaded, total, percentage });
      }
    }

    // Blob 생성
    const blob = new Blob(chunks, { type: "video/mp4" });

    // 다운로드 링크 생성 및 클릭
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // 링크를 DOM에 임시로 추가하고 클릭
    document.body.appendChild(link);
    link.click();

    // 정리
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

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
export type { DownloadProgress, DownloadOptions };
