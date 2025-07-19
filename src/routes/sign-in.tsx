import { createFileRoute } from '@tanstack/react-router';
import { Card, Heading, Text, Button, Flex, Link } from '@radix-ui/themes';

export const Route = createFileRoute('/sign-in')({
  component: SignIn
});

function SignIn() {
  return (
    <Flex direction='column' gap='6' justify='center' style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Card size='3' style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <Flex direction='column' gap='5'>
          <div>
            <Heading size='6' mb='2'>
              클라이밍 시작하기
            </Heading>
            <Text size='2' color='gray'>
              계정에 로그인하고 오늘의 클라이밍 챌린지를 시작하세요.
            </Text>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <Flex direction='column' gap='4'>
              <input
                type='email'
                placeholder='이메일'
                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />

              <input
                type='password'
                placeholder='비밀번호'
                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />

              <Button size='3' variant='solid'>
                로그인
              </Button>
            </Flex>
          </form>

          <Flex gap='3' justify='center'>
            <Text size='2'>아직 계정이 없으신가요?</Text>
            <Link size='2' color='blue' style={{ textDecoration: 'none' }}>
              회원가입
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
