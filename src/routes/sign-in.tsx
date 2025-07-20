import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  return (
    <Flex
      direction="column"
      gap="6"
      justify="center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <Card
        size="3"
        style={{ maxWidth: "400px", margin: "0 auto", width: "100%" }}
      >
        <Flex direction="column" gap="5">
          <div>
            <Heading size="6" mb="2">
              클라이밍 시작하기
            </Heading>
            <Text size="2" color="gray">
              카카오 계정으로 간편하게 시작하세요.
            </Text>
          </div>

          <Link 
            style={{ 
              backgroundColor: "#FEE500",
              color: "#000000",
              fontWeight: "bold"
            }}
            to="/difficulty"
          >
            카카오로 시작하기
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
}
