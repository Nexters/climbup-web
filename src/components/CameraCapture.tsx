import { useRef, useState } from 'react';
import { Button, Flex } from '@radix-ui/themes';

interface CameraCaptureProps {
  onCapture: (media: { type: 'image' | 'video', data: string }) => void;
  mode?: 'photo' | 'video';
}

export function CameraCapture({ onCapture, mode = 'photo' }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string>();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: mode === 'video',
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(undefined);

        if (mode === 'video') {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunksRef.current.push(e.data);
            }
          };
          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);
            onCapture({ type: 'video', data: videoUrl });
            chunksRef.current = [];
          };
        }
      }
    } catch (err) {
      setError('카메라 접근 권한이 필요합니다.');
      console.error('카메라 접근 에러:', err);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !isStreaming) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    onCapture({ type: 'image', data: imageDataUrl });

    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    setIsStreaming(false);
  };

  const startRecording = () => {
    if (!mediaRecorderRef.current || !isStreaming) return;
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsStreaming(false);
  };

  const handleStop = () => {
    if (mode === 'video' && isRecording) {
      stopRecording();
    } else {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  return (
    <Flex direction="column" gap="3" style={{ width: '100%' }}>
      <div style={{ 
        width: '100%', 
        aspectRatio: '3/4',
        backgroundColor: '#000',
        borderRadius: 'var(--radius-3)',
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {error && (
        <div style={{ color: 'var(--red-9)' }}>{error}</div>
      )}

      <Flex gap="3">
        {!isStreaming ? (
          <Button size="3" variant="solid" onClick={startCamera} style={{ flex: 1 }}>
            카메라 시작
          </Button>
        ) : mode === 'video' ? (
          <>
            {!isRecording ? (
              <Button size="3" variant="solid" color="red" onClick={startRecording} style={{ flex: 1 }}>
                녹화 시작
              </Button>
            ) : (
              <Button size="3" variant="solid" onClick={stopRecording} style={{ flex: 1 }}>
                녹화 종료
              </Button>
            )}
            <Button size="3" variant="soft" onClick={handleStop}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button size="3" variant="solid" color="red" onClick={captureImage} style={{ flex: 1 }}>
              사진 촬영
            </Button>
            <Button size="3" variant="soft" onClick={handleStop}>
              취소
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
} 