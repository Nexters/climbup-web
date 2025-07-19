import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  component: UserProfile,
});

function UserProfile() {
  const { userId } = Route.useParams();

  return (
    <Flex direction="column" gap="4">
      <Flex gap="4" align="center">
        <Card style={{ width: 64, height: 64, borderRadius: "100%" }} />
        <Flex direction="column" gap="1">
          <Text size="5" weight="bold">
            사용자 #{userId}
          </Text>
          <Text size="2" color="gray">
            클라이밍 마스터
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap="4">
        <Card>
          <Text size="4" weight="bold" mb="3">
            통계
          </Text>
          <Grid columns="3" gap="4">
            <Flex direction="column" align="center">
              <Text size="6" weight="bold" color="blue">
                32
              </Text>
              <Text size="2" color="gray">
                완료
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text size="6" weight="bold" color="green">
                89%
              </Text>
              <Text size="2" color="gray">
                성공률
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text size="6" weight="bold" color="purple">
                12
              </Text>
              <Text size="2" color="gray">
                연속
              </Text>
            </Flex>
          </Grid>
        </Card>

        <Card>
          <Text size="4" weight="bold" mb="3">
            최근 기록
          </Text>
          <Flex direction="column" gap="2">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="surface">
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="1">
                    <Text weight="medium">챌린지 #{i}</Text>
                    <Text size="2" color="gray">
                      2024.03.{10 + i}
                    </Text>
                  </Flex>
                  <Text color="green" weight="medium">
                    성공
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
