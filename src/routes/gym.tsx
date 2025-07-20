import { Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/gym")({
  component: Gym,
});

const gyms = [
  {
    id: "gangnam",
    name: "더클라임 강남",
    address: "서울 강남구 역삼동 826-34",
  },
  {
    id: "yangjae",
    name: "더클라임 양재",
    address: "서울 서초구 양재동 275-1",
  },
] as const;

function Gym() {
  const navigate = useNavigate();
  const [selectedGym, setSelectedGym] = useState<string>("gangnam");

  const onClickStart = () => {
    // TODO: API 호출하여 암장 전송
    navigate({ to: "/mission" });
  };

  return (
    <Flex direction="column" gap="6">
      <div>
        <Text size="6" weight="bold">
          암장 선택
        </Text>
        <Text size="2" color="gray">
          방문할 암장을 선택해주세요. 언제든지 바꿀 수 있어요.
        </Text>
      </div>

      <Grid columns="1" gap="4">
        {gyms.map(({ id, name, address }) => (
          <Card
            key={id}
            size="3"
            style={{
              cursor: "pointer",
              border:
                selectedGym === id ? "2px solid var(--accent-9)" : undefined,
            }}
            onClick={() => setSelectedGym(id)}
          >
            <Flex align="center" justify="between">
              <Flex direction="column" gap="1">
                <Text size="3" weight="bold">
                  {name}
                </Text>
                <Text size="2" color="gray">
                  {address}
                </Text>
              </Flex>
              {selectedGym === id && (
                <Text size="3" color="gray">
                  ✓
                </Text>
              )}
            </Flex>
          </Card>
        ))}
      </Grid>

      <Button size="3" onClick={onClickStart}>
        시작하기
      </Button>
    </Flex>
  );
}
