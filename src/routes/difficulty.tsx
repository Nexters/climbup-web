import { Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/difficulty")({
  component: Difficulty,
});

const tier = [
  { id: "orange", label: "주황", value: "orange" },
  { id: "red", label: "빨강", value: "red" },
  { id: "green", label: "초록", value: "green" },
  { id: "blue", label: "파랑", value: "blue" },
  { id: "purple", label: "보라", value: "purple" },
] as const;

function Difficulty() {
  const navigate = useNavigate();

  const [selectedTier, setSelectedTier] = useState<string>("orange");

  const onClickNext = () => {
    // TODO: API 호출하여 난이도 전송
    navigate({ to: "/gym" });
  };

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Text size="6" weight="bold">
          반가워요
        </Text>
        <Text size="2" color="gray">
          클라이밍 티어를 선택해주세요.
        </Text>
      </Flex>

      <Grid columns="1" gap="4">
        {tier.map(({ id, label, value }) => (
          <Card 
            key={id} 
            size="3"
            style={{ 
              cursor: 'pointer',
              border: selectedTier === id ? '2px solid var(--accent-9)' : undefined 
            }}
            onClick={() => setSelectedTier(id)}
          >
            <Flex align="center" justify="between">
              <Flex gap="2" align="center">
                <div 
                  style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%',
                    backgroundColor: `var(--${value}-9)`
                  }} 
                />
                <Text size="3">{label}</Text>
              </Flex>
              {selectedTier === id && (
                <Text size="3" color="gray">✓</Text>
              )}
            </Flex>
          </Card>
        ))}
      </Grid>

      <Card size="2">
        <Flex direction="column" gap="2">
          <Text weight="bold">난이도 안내</Text>
          <Text size="2">
            • 주황, 초록: V0-V2 수준의 초급 코스
          </Text>
          <Text size="2">
            • 파랑, 보라: V3-V4 수준의 중급 코스
          </Text>
          <Text size="2">
            • 빨강: V5 이상의 고급 코스
          </Text>
        </Flex>
      </Card>

      <Button onClick={onClickNext}>다음으로</Button>
    </Flex>
  );
}
