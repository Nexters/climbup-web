import { createFileRoute } from '@tanstack/react-router';
import { Card, Flex, Text, Button, Tabs } from '@radix-ui/themes';
import { CameraCapture } from '../../components/CameraCapture';
import { useState } from 'react';

export const Route = createFileRoute('/challenge/$challengeId')({
  component: Challenge,
});

type CapturedMedia = {
  type: 'image' | 'video';
  data: string;
} | null;

function Challenge() {
  const { challengeId } = Route.useParams();
  const [capturedMedia, setCapturedMedia] = useState<CapturedMedia>(null);
  const [captureMode, setCaptureMode] = useState<'photo' | 'video'>('photo');

  const handleCapture = (media: { type: 'image' | 'video'; data: string }) => {
    setCapturedMedia(media);
  };

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Text size="5" weight="bold">챌린지 #{challengeId}</Text>
        <Text size="5" weight="bold">05:00</Text>
      </Flex>

      <Card size="3">
        <Flex direction="column" gap="3">
          <Text size="3" weight="bold">현재 과제</Text>
          <Flex direction="column" gap="2">
            <Flex gap="2" align="center">
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--green-9)' }} />
              <Text>첫 번째 홀드 잡기</Text>
            </Flex>
            <Flex gap="2" align="center">
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--yellow-9)' }} />
              <Text>두 번째 홀드로 이동</Text>
            </Flex>
            <Flex gap="2" align="center">
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--gray-9)' }} />
              <Text>정상에 도달하기</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {capturedMedia ? (
        <Card size="3">
          <Flex direction="column" gap="3">
            <Text size="3" weight="bold">
              {capturedMedia.type === 'image' ? '촬영된 이미지' : '녹화된 영상'}
            </Text>
            {capturedMedia.type === 'image' ? (
              <img 
                src={capturedMedia.data} 
                alt="촬영된 이미지" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-2)'
                }} 
              />
            ) : (
              <video 
                src={capturedMedia.data} 
                controls 
                style={{ 
                  width: '100%', 
                  aspectRatio: '3/4',
                  borderRadius: 'var(--radius-2)'
                }}
              />
            )}
            <Button 
              size="3" 
              variant="soft" 
              onClick={() => setCapturedMedia(null)}
            >
              다시 촬영하기
            </Button>
          </Flex>
        </Card>
      ) : (
        <Card size="3">
          <Flex direction="column" gap="3">
            <Flex justify="between" align="center">
              <Text size="3" weight="bold">인증 미디어 촬영</Text>
              <Tabs.Root defaultValue="photo" onValueChange={(value) => setCaptureMode(value as 'photo' | 'video')}>
                <Tabs.List>
                  <Tabs.Trigger value="photo">사진</Tabs.Trigger>
                  <Tabs.Trigger value="video">동영상</Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </Flex>
            <CameraCapture onCapture={handleCapture} mode={captureMode} />
          </Flex>
        </Card>
      )}

      <Button size="3" variant="solid" color="red">
        챌린지 포기하기
      </Button>
    </Flex>
  );
} 