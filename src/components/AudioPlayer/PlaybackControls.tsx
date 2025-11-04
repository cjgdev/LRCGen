import { Group, Button, Slider, Text, Box, Stack } from '@mantine/core';
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';
import { useWaveformPlayer } from '../../hooks/useWaveformPlayer';

export const PlaybackControls = () => {
  const { wavesurfer, togglePlayPause, skip } = useWaveformPlayer();
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const volume = useAudioStore((state) => state.volume);
  const playbackRate = useAudioStore((state) => state.playbackRate);
  const audioUrl = useAudioStore((state) => state.audioUrl);

  const handleVolumeChange = (value: number) => {
    wavesurfer?.setVolume(value);
    useAudioStore.getState().setVolume(value);
  };

  const handlePlaybackRateChange = (value: number) => {
    wavesurfer?.setPlaybackRate(value);
    useAudioStore.getState().setPlaybackRate(value);
  };

  const disabled = !audioUrl;

  return (
    <Stack gap="md">
      <Group justify="center" gap="md">
        <Button
          variant="subtle"
          onClick={() => skip(-10)}
          disabled={disabled}
          leftSection={<IconPlayerSkipBack size={20} />}
        >
          -10s
        </Button>

        <Button
          variant="filled"
          size="lg"
          onClick={togglePlayPause}
          disabled={disabled}
          leftSection={
            isPlaying ? (
              <IconPlayerPause size={24} />
            ) : (
              <IconPlayerPlay size={24} />
            )
          }
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        <Button
          variant="subtle"
          onClick={() => skip(10)}
          disabled={disabled}
          rightSection={<IconPlayerSkipForward size={20} />}
        >
          +10s
        </Button>
      </Group>

      <Group grow gap="xl">
        <Box>
          <Group justify="space-between" mb={4}>
            <Text size="sm" fw={500}>
              Volume
            </Text>
            <Text size="sm" c="dimmed">
              {Math.round(volume * 100)}%
            </Text>
          </Group>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
            disabled={disabled}
            marks={[
              { value: 0, label: '0%' },
              { value: 0.5, label: '50%' },
              { value: 1, label: '100%' },
            ]}
          />
        </Box>

        <Box>
          <Group justify="space-between" mb={4}>
            <Text size="sm" fw={500}>
              Speed
            </Text>
            <Text size="sm" c="dimmed">
              {playbackRate.toFixed(2)}x
            </Text>
          </Group>
          <Slider
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            min={0.25}
            max={2}
            step={0.25}
            disabled={disabled}
            marks={[
              { value: 0.25, label: '0.25x' },
              { value: 1, label: '1x' },
              { value: 2, label: '2x' },
            ]}
          />
        </Box>
      </Group>
    </Stack>
  );
};
