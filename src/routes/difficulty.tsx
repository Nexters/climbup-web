import { Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/difficulty")({
  component: Difficulty,
});

const colors = [
  { id: "orange", label: "주황", value: "orange" },
  { id: "red", label: "빨강", value: "red" },
  { id: "green", label: "초록", value: "green" },
  { id: "blue", label: "파랑", value: "blue" },
  { id: "purple", label: "보라", value: "purple" },
] as const;

function Difficulty() {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const onClickNext = () => {
    // TODO: API 호출하여 난이도 전송
    navigate({ to: "/gym" });
  };

  return (
    <Flex direction="column" gap="6">
      <div>
        <Text size="6" weight="bold">
          색상 선택
        </Text>
        <Text size="2" color="gray">
          오늘의 클라이밍을 시작할 색상을 선택해주세요
        </Text>
      </div>

      <Grid columns="1" gap="4">
        {colors.map(({ id, label, value }) => (
          <Card 
            key={id} 
            size="3"
            style={{ 
              cursor: 'pointer',
              border: selectedColor === id ? '2px solid var(--accent-9)' : undefined 
            }}
            onClick={() => setSelectedColor(id)}
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
              {selectedColor === id && (
                <Text size="3" color="gray">✓</Text>
              )}
            </Flex>
          </Card>
        ))}
      </Grid>

      <Button onClick={onClickNext}>다음으로</Button>
    </Flex>
  );
}
