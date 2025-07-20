import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Flex direction="column" gap="6">
      <Card
        size="3"
        style={{ maxWidth: "400px", margin: "0 auto", width: "100%" }}
      >
        <Flex direction="column" gap="5">
          <div>
            <Heading size="6" mb="2">
              클뉴비에 오신 것을 환영해요 :)
            </Heading>
            <Text size="2" color="gray">
              내 마음에 필요했던 조언을 받아보세요
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
            카카오로 3초만에 시작하기
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
}
