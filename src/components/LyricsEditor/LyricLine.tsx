import { memo } from 'react';
import { Group, TextInput, ActionIcon, Paper, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { LRCLine } from '../../types/lrc';
import { useAudioStore } from '../../stores/audioStore';
import { formatTimestamp } from '../../utils/timeFormatter';

interface LyricLineProps {
  line: LRCLine;
  isActive: boolean;
}

export const LyricLineComponent = ({ line, isActive }: LyricLineProps) => {
  const updateLyric = useAudioStore((state) => state.updateLyric);
  const deleteLyric = useAudioStore((state) => state.deleteLyric);

  return (
    <Paper
      p="sm"
      withBorder
      style={{
        backgroundColor: isActive ? 'var(--mantine-color-blue-0)' : undefined,
        borderColor: isActive ? 'var(--mantine-color-blue-4)' : undefined,
        transition: 'all 0.2s',
      }}
    >
      <Group gap="sm" wrap="nowrap">
        <Text
          size="xs"
          c="dimmed"
          style={{
            minWidth: '50px',
            fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
          }}
        >
          {formatTimestamp(line.timestamp)}
        </Text>

        <TextInput
          value={line.text}
          onChange={(e) =>
            updateLyric(line.id, { text: e.currentTarget.value })
          }
          placeholder="Enter lyrics..."
          style={{ flex: 1 }}
          variant="filled"
        />

        <ActionIcon
          color="red"
          variant="subtle"
          onClick={() => deleteLyric(line.id)}
          aria-label="Delete line"
          size="lg"
          style={{ minWidth: 40, minHeight: 40 }}
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    </Paper>
  );
};

// Memoize to prevent unnecessary re-renders
export const LyricLine = memo(
  LyricLineComponent,
  (prev, next) =>
    prev.line.id === next.line.id &&
    prev.line.text === next.line.text &&
    prev.line.timestamp === next.line.timestamp &&
    prev.isActive === next.isActive
);
