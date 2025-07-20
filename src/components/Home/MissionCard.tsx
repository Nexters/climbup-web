import { Card, Flex, Text } from "@radix-ui/themes";

interface MissionCardProps {
  sectorName: string;
  difficulty: string;
  viewMode?: 'card' | 'list';
}

export default function MissionCard({ sectorName, difficulty, viewMode = 'card' }: MissionCardProps) {
  return (
    <Card 
      size="3" 
      style={{ 
        flex: viewMode === 'card' ? "0 0 90%" : "auto",
        minWidth: 0,
      }}
    >
      <Flex direction="column" gap="3">
        <Text size="2" color="gray">
          Success | Failed | Not Tried
        </Text>
        <Flex justify="between" align="center">
          <Text size="5" weight="bold">{sectorName}</Text>
          <Flex align="center" gap="2">
            <Text size="2" color="gray">난이도:</Text>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: `var(--${difficulty}-9)`,
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}