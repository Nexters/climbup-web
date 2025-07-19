import { createFileRoute } from '@tanstack/react-router';
import { Flex, Text, Button } from '@radix-ui/themes';

export const Route = createFileRoute('/')({
  component: Home
});

function Home() {
  return (
    <Flex direction='column' height='100vh'>
      <Flex direction='column' align='center' justify='center' style={{ flex: 1 }} gap='4'>
        <Text size='8' weight='bold' align='center'>
          오늘의 클라이밍
        </Text>
        <Text size='3' color='gray' align='center'>
          새로운 도전을 시작해보세요!
        </Text>
        <Button size='4' style={{ width: '100%' }}>
          클라이밍 시작하기
        </Button>
      </Flex>
    </Flex>
  );
}
