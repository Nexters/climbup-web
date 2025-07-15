import { createFileRoute } from '@tanstack/react-router';
import { Card, Flex, Text, Button, Grid } from '@radix-ui/themes';

export const Route = createFileRoute('/difficulty')({
  component: Difficulty,
});

const difficulties = [
  { level: 'V0-V2', label: '초급', color: 'green' },
  { level: 'V3-V4', label: '중급', color: 'yellow' },
  { level: 'V5+', label: '고급', color: 'red' },
] as const;

function Difficulty() {
  return (
    <Flex direction="column" gap="6">
      <div>
        <Text size="6" weight="bold">난이도 선택</Text>
        <Text size="2" color="gray">오늘의 클라이밍 난이도를 선택해주세요.</Text>
      </div>

      <Grid columns="1" gap="4">
        {difficulties.map(({ level, label, color }) => (
          <Card key={level} size="3">
            <Flex direction="column" gap="3">
              <div>
                <Text size="5" weight="bold">{level}</Text>
                <Text size="2" color="gray">{label} 난이도</Text>
              </div>
              <Button variant="soft" color={color as any}>
                이 난이도로 시작하기
              </Button>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
} 