import { Group, Title, Text, Button, Box, ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconHelp, IconArrowBackUp, IconArrowForwardUp, IconSun, IconMoon } from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';

interface HeaderProps {
  onShowHelp: () => void;
}

export const Header = ({ onShowHelp }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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
      <Group justify="space-between" wrap="nowrap">
        <div style={{ minWidth: 0 }}>
          <Title order={2} style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
            LRC Editor
          </Title>
          <Text
            size="sm"
            c="dimmed"
            visibleFrom="sm"
          >
            Create synchronized lyrics for your music
          </Text>
        </div>

        <Group gap="xs" wrap="nowrap">
          <Tooltip label={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}>
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={toggleColorScheme}
              aria-label="Toggle color scheme"
              style={{ transition: 'all 0.2s' }}
            >
              {colorScheme === 'dark' ? (
                <IconSun size={20} />
              ) : (
                <IconMoon size={20} />
              )}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Undo (Cmd/Ctrl+Z)">
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={undo}
              disabled={!canUndo}
              aria-label="Undo"
              style={{ transition: 'all 0.2s' }}
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
              style={{ transition: 'all 0.2s' }}
            >
              <IconArrowForwardUp size={20} />
            </ActionIcon>
          </Tooltip>

          <Button
            variant="light"
            leftSection={<IconHelp size={16} />}
            onClick={onShowHelp}
            visibleFrom="sm"
          >
            Shortcuts (?)
          </Button>

          <ActionIcon
            variant="light"
            size="lg"
            onClick={onShowHelp}
            hiddenFrom="sm"
            aria-label="Show shortcuts"
          >
            <IconHelp size={20} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
};
