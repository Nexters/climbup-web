import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Container, Flex, Heading, Link } from '@radix-ui/themes';

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm px-4'>
        <Container size='2'>
          <Flex py='3' justify='between' align='center'>
            <Heading size='4'>Climb Up</Heading>
            <Flex gap='4'>
              <Link color='gray' href='/difficulty'>
                챌린지
              </Link>
              <Link color='gray' href='/users/me'>
                프로필
              </Link>
            </Flex>
          </Flex>
        </Container>
      </header>
      <Container size='2' py='6' px='4'>
        <Outlet />
      </Container>
    </div>
  )
});
