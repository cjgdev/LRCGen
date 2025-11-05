import { Group, Title, Text, Button, Box, ActionIcon, Tooltip } from '@mantine/core';
import { IconHelp, IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';

interface HeaderProps {
  onShowHelp: () => void;
}

export const Header = ({ onShowHelp }: HeaderProps) => {
  const canUndo = useAudioStore((state) => state.canUndo);
  const canRedo = useAudioStore((state) => state.canRedo);
  const undo = useAudioStore((state) => state.undo);
  const redo = useAudioStore((state) => state.redo);

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

        <Group gap="xs">
          <Tooltip label="Undo (Cmd/Ctrl+Z)">
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={undo}
              disabled={!canUndo}
              aria-label="Undo"
            >
              <IconArrowBackUp size={20} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Redo (Cmd/Ctrl+Shift+Z)">
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={redo}
              disabled={!canRedo}
              aria-label="Redo"
            >
              <IconArrowForwardUp size={20} />
            </ActionIcon>
          </Tooltip>

          <Button
            variant="light"
            leftSection={<IconHelp size={16} />}
            onClick={onShowHelp}
          >
            Shortcuts (?)
          </Button>
        </Group>
      </Group>
    </Box>
  );
};
