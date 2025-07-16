import { createFileRoute } from '@tanstack/react-router';
import { Card, Flex, Text, Button } from '@radix-ui/themes';
import { useState, useRef } from 'react';

export const Route = createFileRoute('/challenge/$challengeId')({
  component: Challenge
});

type CapturedMedia = {
  file: File;
  preview: string;
} | null;

function Challenge() {
  const { challengeId } = Route.useParams();
  const [capturedMedia, setCapturedMedia] = useState<CapturedMedia>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setCapturedMedia({
      file,
      preview: previewUrl
    });
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = () => {
    if (!capturedMedia) return;

    // 다운로드 링크 생성
    const a = document.createElement('a');
    a.href = capturedMedia.preview;
    a.download = `클라이밍-챌린지-${challengeId}-${new Date().toISOString().split('T')[0]}${
      capturedMedia.file.type.startsWith('image/') ? '.jpg' : '.mp4'
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async () => {
    if (!capturedMedia) return;

    try {
      const formData = new FormData();
      formData.append('media', capturedMedia.file);
      formData.append('challengeId', challengeId);

      // TODO: API 엔드포인트로 파일 전송
      const response = await fetch('/api/challenge/submit', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('업로드 실패');
      }

      alert('성공적으로 제출되었습니다!');
      setCapturedMedia(null);
    } catch (error) {
      console.error('업로드 에러:', error);
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <Flex direction='column' gap='4'>
      <Flex justify='between' align='center'>
        <Text size='5' weight='bold'>
          챌린지 #{challengeId}
        </Text>
        <Text size='5' weight='bold'>
          05:00
        </Text>
      </Flex>

      <Card size='3'>
        <Flex direction='column' gap='3'>
          <Text size='3' weight='bold'>
            현재 과제
          </Text>
          <Flex direction='column' gap='2'>
            <Flex gap='2' align='center'>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--green-9)' }} />
              <Text>첫 번째 홀드 잡기</Text>
            </Flex>
            <Flex gap='2' align='center'>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--yellow-9)' }} />
              <Text>두 번째 홀드로 이동</Text>
            </Flex>
            <Flex gap='2' align='center'>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--gray-9)' }} />
              <Text>정상에 도달하기</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {capturedMedia ? (
        <Card size='3'>
          <Flex direction='column' gap='3'>
            <Text size='3' weight='bold'>
              촬영된 미디어
            </Text>
            {capturedMedia.file.type.startsWith('image/') ? (
              <img
                src={capturedMedia.preview}
                alt='촬영된 이미지'
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-2)'
                }}
              />
            ) : (
              <video
                src={capturedMedia.preview}
                controls
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  borderRadius: 'var(--radius-2)'
                }}
              />
            )}
            <Flex gap='3' wrap='wrap'>
              <Button
                size='3'
                variant='soft'
                onClick={() => {
                  URL.revokeObjectURL(capturedMedia.preview);
                  setCapturedMedia(null);
                }}>
                다시 촬영하기
              </Button>
              <Button size='3' variant='soft' onClick={handleDownload}>
                💾 다운로드
              </Button>
              <Button size='3' variant='solid' onClick={handleSubmit}>
                제출하기
              </Button>
            </Flex>
          </Flex>
        </Card>
      ) : (
        <Card size='3'>
          <Flex direction='column' gap='3' align='center'>
            <Text size='3' weight='bold'>
              인증 미디어 촬영
            </Text>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*,video/*'
              capture='environment'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Button
              size='3'
              variant='solid'
              onClick={handleCameraClick}
              style={{
                width: '100%',
                maxWidth: '300px'
              }}>
              📸 카메라로 촬영하기
            </Button>
          </Flex>
        </Card>
      )}

      <Button size='3' variant='solid' color='red'>
        챌린지 포기하기
      </Button>
    </Flex>
  );
}
