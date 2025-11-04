import { Group, Title, Text, Button, Box } from '@mantine/core';
import { IconHelp } from '@tabler/icons-react';

interface HeaderProps {
  onShowHelp: () => void;
}

export const Header = ({ onShowHelp }: HeaderProps) => {
  return (
    <Box
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-3)',
        padding: '1rem',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <Group justify="space-between">
        <div>
          <Title order={2}>LRC Editor</Title>
          <Text size="sm" c="dimmed">
            Create synchronized lyrics for your music
          </Text>
        </div>

        <Button
          variant="light"
          leftSection={<IconHelp size={16} />}
          onClick={onShowHelp}
        >
          Shortcuts (?)
        </Button>
      </Group>
    </Box>
  );
};
