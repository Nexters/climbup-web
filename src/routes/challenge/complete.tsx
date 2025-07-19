import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/challenge/complete")({
  component: ChallengeComplete,
});

function ChallengeComplete() {
  return (
    <Flex direction="column" gap="4">
      <Card>
        <Flex direction="column" align="center" gap="4">
          <svg viewBox="0 0 24 24">
            <title>완료 체크 아이콘</title>
            <path d="M5 13l4 4L19 7" />
          </svg>

          <Text size="6" weight="bold">
            챌린지 완료!
          </Text>
          <Text>오늘의 클라이밍을 성공적으로 마치셨습니다.</Text>

          <Flex direction="column" gap="3" width="100%">
            <Button size="3">결과 공유하기</Button>
            <Button size="3" variant="soft">
              홈으로 돌아가기
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
