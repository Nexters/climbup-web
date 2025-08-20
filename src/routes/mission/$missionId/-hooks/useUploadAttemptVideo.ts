import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  finalizeRouteMissionUploadSession,
  getRouteMissionUploadStatus,
  initializeRouteMissionUploadSession,
  uploadRouteMissionVideoChunk,
} from "@/generated/attempts/attempts";
import type { FinalizeRouteMissionUploadSessionBody } from "@/generated/model";
import { getHeaderToken } from "@/utils/cookie";
import type { BodyType } from "@/utils/http";

const CHUNK_SIZE = 512 * 1024;

export interface UploadProgress {
  currentChunk: number;
  totalChunks: number;
  percentage: number;
}

export interface UploadState {
  isUploading: boolean;
  progress: UploadProgress;
  uploadId?: string;
  error?: string;
}

export interface UploadCallbacks {
  onProgress?: (progress: UploadProgress) => void;
  onSuccess?: (fileName: string) => void;
  onError?: (error: Error) => void;
}

async function splitFileIntoChunks(
  file: File,
  chunkSize: number
): Promise<string[]> {
  const chunks: string[] = [];
  const totalChunks = Math.ceil(file.size / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const base64Chunk = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(chunk);
    });

    chunks.push(base64Chunk);
  }

  return chunks;
}

export function useUploadAttemptVideo() {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: { currentChunk: 0, totalChunks: 0, percentage: 0 },
  });

  const checkUploadStatusMutation = useMutation({
    mutationFn: (attemptId: number) =>
      getRouteMissionUploadStatus(attemptId, { headers: getHeaderToken() }),
  });

  const initializeUploadMutation = useMutation({
    mutationFn: ({
      attemptId,
      fileInfo,
    }: {
      attemptId: number;
      fileInfo: {
        fileName: string;
        fileType: string;
        fileSize: number;
        chunkSize: number;
        chunkLength: number;
      };
    }) =>
      initializeRouteMissionUploadSession(attemptId, fileInfo, {
        headers: getHeaderToken(),
      }),
  });

  const uploadChunkMutation = useMutation({
    mutationFn: ({
      attemptId,
      uploadId,
      index,
      chunk,
    }: {
      attemptId: number;
      uploadId: string;
      index: number;
      chunk: string;
    }) =>
      uploadRouteMissionVideoChunk(
        attemptId,
        uploadId,
        { index, chunk },
        { headers: getHeaderToken() }
      ),
  });

  const finalizeUploadMutation = useMutation({
    mutationFn: ({
      attemptId,
      uploadId,
      thumbnail,
    }: {
      attemptId: number;
      uploadId: string;
      thumbnail: File;
    }) => {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail, "thumbnail.jpg");

      return finalizeRouteMissionUploadSession(
        attemptId,
        uploadId,
        formData as BodyType<FinalizeRouteMissionUploadSessionBody>,
        {
          headers: {
            ...getHeaderToken(),
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  });

  const createThumbnailFromVideo = (videoFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context를 생성할 수 없습니다."));
        return;
      }

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 0.1;
      };

      video.onseeked = () => {
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const thumbnailFile = new File([blob], "thumbnail.jpg", {
                  type: "image/jpeg",
                });
                resolve(thumbnailFile);
              } else {
                reject(new Error("썸네일 생성 실패"));
              }
            },
            "image/jpeg",
            0.8
          );
        } catch (error) {
          reject(new Error(`썸네일 생성 중 오류: ${error}`));
        }
      };

      video.onerror = () => reject(new Error("비디오 로드 실패"));

      video.src = URL.createObjectURL(videoFile);
    });
  };

  const uploadVideo = async (
    attemptId: number,
    file: File,
    callbacks: UploadCallbacks = {}
  ) => {
    try {
      setUploadState((prev) => ({
        ...prev,
        isUploading: true,
        error: undefined,
      }));

      const initializeResponse = await initializeUploadMutation.mutateAsync({
        attemptId,
        fileInfo: {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          chunkSize: CHUNK_SIZE,
          chunkLength: Math.ceil(file.size / CHUNK_SIZE),
        },
      });

      const uploadId = initializeResponse.data?.uploadId;
      if (!uploadId) {
        throw new Error("업로드 ID를 받지 못했습니다.");
      }

      setUploadState((prev) => ({ ...prev, uploadId }));

      const chunks = await splitFileIntoChunks(file, CHUNK_SIZE);
      const totalChunks = chunks.length;

      setUploadState((prev) => ({
        ...prev,
        progress: { currentChunk: 0, totalChunks, percentage: 0 },
      }));

      for (let i = 0; i < totalChunks; i++) {
        const chunk = chunks[i];

        await uploadChunkMutation.mutateAsync({
          attemptId,
          uploadId,
          index: i,
          chunk,
        });

        const progress: UploadProgress = {
          currentChunk: i + 1,
          totalChunks,
          percentage: Math.round(((i + 1) / totalChunks) * 100),
        };

        setUploadState((prev) => ({
          ...prev,
          progress,
        }));

        callbacks.onProgress?.(progress);
      }

      const thumbnail = await createThumbnailFromVideo(file);

      const finalizeResponse = await finalizeUploadMutation.mutateAsync({
        attemptId,
        uploadId,
        thumbnail,
      });
      const fileName = finalizeResponse.data?.fileName;

      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        uploadId: undefined,
      }));

      callbacks.onSuccess?.(fileName || "");
    } catch (error) {
      console.error("영상 업로드 중 오류 발생:", error);
      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        error:
          error instanceof Error
            ? error.message
            : "업로드 중 오류가 발생했습니다.",
      }));
      callbacks.onError?.(error as Error);
      throw error;
    }
  };

  const checkUploadStatus = async (attemptId: number) => {
    try {
      const response = await checkUploadStatusMutation.mutateAsync(attemptId);
      return response.data;
    } catch (error) {
      console.error("업로드 상태 확인 중 오류 발생:", error);
      throw error;
    }
  };

  return {
    uploadVideo,
    checkUploadStatus,
    uploadState,
    isUploading: uploadState.isUploading,
    progress: uploadState.progress,
    error: uploadState.error,
    uploadId: uploadState.uploadId,
  };
}
