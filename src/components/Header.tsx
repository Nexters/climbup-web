import { Container, Flex, Select, Text } from "@radix-ui/themes";
import { useState } from "react";

const gyms = [
  { id: "gangnam", name: "더클라임 강남" },
  { id: "yangjae", name: "더클라임 양재" },
] as const;

export default function Header() {
  const [selectedGym, setSelectedGym] = useState("gangnam");

  return (
    <Flex py="4" px="4" style={{ borderBottom: "1px solid var(--gray-5)" }}>
      <Container>
        <Flex justify="between" align="center">
          <Text size="5" weight="bold">
            Holdy
          </Text>
          <Select.Root value={selectedGym} onValueChange={setSelectedGym}>
            <Select.Trigger placeholder="암장 선택" />
            <Select.Content>
              <Select.Group>
                {gyms.map((gym) => (
                  <Select.Item key={gym.id} value={gym.id}>
                    {gym.name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Container>
    </Flex>
  );
}