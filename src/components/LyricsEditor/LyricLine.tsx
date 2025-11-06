import { memo } from 'react';
import { Group, TextInput, ActionIcon, Paper, Text, Tooltip } from '@mantine/core';
import { IconTrash, IconPlus, IconClock, IconClockOff } from '@tabler/icons-react';
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
  const insertLyricAfter = useAudioStore((state) => state.insertLyricAfter);
  const setLyricTimestampToCurrent = useAudioStore((state) => state.setLyricTimestampToCurrent);
  const clearLyricTimestamp = useAudioStore((state) => state.clearLyricTimestamp);

  return (
    <Paper
      p="xs"
      withBorder
      style={{
        padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
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

        <Group gap={2} wrap="nowrap">
          <Tooltip label="Insert line after">
            <ActionIcon
              variant="subtle"
              onClick={() => insertLyricAfter(line.id)}
              aria-label="Insert line after"
              size="md"
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Set timestamp to current">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => setLyricTimestampToCurrent(line.id)}
              aria-label="Set timestamp to current"
              size="md"
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <IconClock size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Clear timestamp">
            <ActionIcon
              variant="subtle"
              color="orange"
              onClick={() => clearLyricTimestamp(line.id)}
              aria-label="Clear timestamp"
              size="md"
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <IconClockOff size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete line">
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() => deleteLyric(line.id)}
              aria-label="Delete line"
              size="md"
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
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
