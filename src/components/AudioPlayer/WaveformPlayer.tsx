import { useEffect } from 'react';
import { Box, Paper, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconZoomIn, IconZoomOut, IconZoomReset } from '@tabler/icons-react';
import { WaveformSkeleton } from '../UI/WaveformSkeleton';
import { useAudioStore } from '../../stores/audioStore';
import { formatTime } from '../../utils/timeFormatter';

interface WaveformPlayerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
  syncRegionsWithLyrics: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomReset: () => void;
}

export const WaveformPlayer = ({
  containerRef,
  timelineRef,
  isReady,
  syncRegionsWithLyrics,
  zoomIn,
  zoomOut,
  zoomReset,
}: WaveformPlayerProps) => {
  const currentTime = useAudioStore((state) => state.currentTime);
  const duration = useAudioStore((state) => state.duration);
  const audioUrl = useAudioStore((state) => state.audioUrl);
  const lyrics = useAudioStore((state) => state.lyrics);

  // Sync waveform region markers with lyrics
  useEffect(() => {
    if (isReady) {
      syncRegionsWithLyrics();
    }
  }, [lyrics, isReady, syncRegionsWithLyrics]);

  if (!audioUrl) {
    return (
      <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
        <Text c="dimmed">Load an audio file to see the waveform</Text>
      </Paper>
    );
  }

  return (
    <Paper p="xs" withBorder style={{ padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
      <Box mb="xs">
        <Group justify="space-between" wrap="nowrap">
          <Text size="sm" fw={500}>
            Waveform
          </Text>
          <Group gap="xs" wrap="nowrap">
            <Group gap={4}>
              <Tooltip label="Zoom in">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={zoomIn}
                  disabled={!isReady}
                  aria-label="Zoom in"
                  style={{ minWidth: 32, minHeight: 32 }}
                >
                  <IconZoomIn size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Zoom out">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={zoomOut}
                  disabled={!isReady}
                  aria-label="Zoom out"
                  style={{ minWidth: 32, minHeight: 32 }}
                >
                  <IconZoomOut size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Reset zoom">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={zoomReset}
                  disabled={!isReady}
                  aria-label="Reset zoom"
                  style={{ minWidth: 32, minHeight: 32 }}
                >
                  <IconZoomReset size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </Group>
        </Group>
      </Box>

      <Box
        ref={containerRef}
        style={{
          opacity: isReady ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }}
      />

      <Box ref={timelineRef} mt="xs" />

      {!isReady && <WaveformSkeleton />}
    </Paper>
  );
};
