import { useEffect, useRef } from 'react';
import { Stack, Text, Paper, Button, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';
import { LyricLine } from './LyricLine';
import { findActiveLyric } from '../../utils/lyricHelpers';

export const LyricsListView = () => {
  const lyrics = useAudioStore((state) => state.lyrics);
  const activeLyricIndex = useAudioStore((state) => state.activeLyricIndex);
  const addLyricAtCurrentTime = useAudioStore(
    (state) => state.addLyricAtCurrentTime
  );
  const currentTime = useAudioStore((state) => state.currentTime);

  const listRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // Find active lyric based on current time using binary search
  useEffect(() => {
    if (lyrics.length === 0) return;

    const activeIndex = findActiveLyric(lyrics, currentTime);
    useAudioStore.getState().setActiveLyricIndex(activeIndex);
  }, [currentTime, lyrics]);

  // Auto-scroll to active line
  useEffect(() => {
    if (activeLineRef.current && activeLyricIndex !== null) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeLyricIndex]);

  if (lyrics.length === 0) {
    return (
      <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
        <Text c="dimmed" mb="md">
          No lyrics yet. Press Enter to add a timestamp at the current playback
          position.
        </Text>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => addLyricAtCurrentTime()}
        >
          Add First Line
        </Button>
      </Paper>
    );
  }

  return (
    <Paper p="md" withBorder style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', minHeight: '500px' }}>
      <Group justify="space-between" mb="md">
        <Text fw={500}>Lyrics ({lyrics.length})</Text>
        <Button
          size="xs"
          variant="light"
          leftSection={<IconPlus size={14} />}
          onClick={() => addLyricAtCurrentTime()}
        >
          Add Line (Enter)
        </Button>
      </Group>

      <Stack
        gap="xs"
        ref={listRef}
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {lyrics.map((line, index) => (
          <div
            key={line.id}
            ref={index === activeLyricIndex ? activeLineRef : null}
          >
            <LyricLine line={line} isActive={index === activeLyricIndex} />
          </div>
        ))}
      </Stack>
    </Paper>
  );
};
