import { Box, Paper, Text, Group } from '@mantine/core';
import { useWaveformPlayer } from '../../hooks/useWaveformPlayer';
import { useAudioStore } from '../../stores/audioStore';
import { formatTime } from '../../utils/timeFormatter';

export const WaveformPlayer = () => {
  const { containerRef, timelineRef, isReady } = useWaveformPlayer();
  const currentTime = useAudioStore((state) => state.currentTime);
  const duration = useAudioStore((state) => state.duration);
  const audioUrl = useAudioStore((state) => state.audioUrl);

  if (!audioUrl) {
    return (
      <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
        <Text c="dimmed">Load an audio file to see the waveform</Text>
      </Paper>
    );
  }

  return (
    <Paper p="md" withBorder>
      <Box mb="xs">
        <Group justify="space-between">
          <Text size="sm" fw={500}>
            Waveform
          </Text>
          <Text size="sm" c="dimmed">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
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

      {!isReady && (
        <Text size="sm" c="dimmed" ta="center" mt="md">
          Loading waveform...
        </Text>
      )}
    </Paper>
  );
};
