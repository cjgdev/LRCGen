import { useEffect } from 'react';
import { Box, Group, ActionIcon, Tooltip, Text, Menu, Slider } from '@mantine/core';
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconDots,
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
} from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';
import { formatTime } from '../../utils/timeFormatter';

interface CompactWaveformPlayerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
  togglePlayPause: () => void;
  skip: (seconds: number) => void;
  setPlaybackRate: (rate: number) => void;
  setVolume: (volume: number) => void;
  syncRegionsWithLyrics: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomReset: () => void;
}

export const CompactWaveformPlayer = ({
  containerRef,
  isReady,
  togglePlayPause,
  skip,
  setPlaybackRate,
  setVolume,
  syncRegionsWithLyrics,
  zoomIn,
  zoomOut,
  zoomReset,
}: CompactWaveformPlayerProps) => {
  const currentTime = useAudioStore((state) => state.currentTime);
  const duration = useAudioStore((state) => state.duration);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const audioUrl = useAudioStore((state) => state.audioUrl);
  const lyrics = useAudioStore((state) => state.lyrics);
  const volume = useAudioStore((state) => state.volume);
  const playbackRate = useAudioStore((state) => state.playbackRate);

  // Sync waveform region markers with lyrics
  useEffect(() => {
    if (isReady) {
      syncRegionsWithLyrics();
    }
  }, [lyrics, isReady, syncRegionsWithLyrics]);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    useAudioStore.getState().setVolume(value);
  };

  const handlePlaybackRateChange = (value: number) => {
    setPlaybackRate(value);
    useAudioStore.getState().setPlaybackRate(value);
  };

  if (!audioUrl) {
    return (
      <Box
        style={{
          padding: 'clamp(0.5rem, 1vw, 0.75rem)',
          textAlign: 'center',
          backgroundColor: 'var(--mantine-color-gray-0)',
          borderRadius: '4px',
        }}
      >
        <Text size="xs" c="dimmed">
          Load an audio file to see the waveform
        </Text>
      </Box>
    );
  }

  const disabled = !audioUrl;

  return (
    <Box
      style={{
        backgroundColor: 'var(--mantine-color-body)',
        borderRadius: '4px',
        border: '1px solid var(--mantine-color-gray-3)',
        padding: 'clamp(0.25rem, 0.5vw, 0.5rem)',
      }}
    >
      <Group gap="xs" wrap="nowrap" align="center">
        {/* Play/Pause Button */}
        <Tooltip label={isPlaying ? 'Pause (Space)' : 'Play (Space)'}>
          <ActionIcon
            variant="filled"
            size="lg"
            onClick={togglePlayPause}
            disabled={disabled}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            style={{ minWidth: 36, minHeight: 36 }}
          >
            {isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
          </ActionIcon>
        </Tooltip>

        {/* Skip Back Button */}
        <Tooltip label="Skip back 10s (J)">
          <ActionIcon
            variant="subtle"
            size="md"
            onClick={() => skip(-10)}
            disabled={disabled}
            aria-label="Skip back 10 seconds"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <IconPlayerSkipBack size={18} />
          </ActionIcon>
        </Tooltip>

        {/* Waveform Container with Time Overlay */}
        <Box
          style={{
            flex: 1,
            position: 'relative',
            minWidth: 0,
            height: '50px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Waveform */}
          <Box
            ref={containerRef}
            style={{
              width: '100%',
              height: '40px',
              opacity: isReady ? 1 : 0.3,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Time Display Overlay */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '2px 6px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '4px',
              pointerEvents: 'none',
            }}
          >
            <Text
              size="xs"
              c="white"
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
              }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </Box>

          {/* Loading indicator */}
          {!isReady && (
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              <Text size="xs" c="dimmed">
                Loading...
              </Text>
            </Box>
          )}
        </Box>

        {/* Skip Forward Button */}
        <Tooltip label="Skip forward 10s (L)">
          <ActionIcon
            variant="subtle"
            size="md"
            onClick={() => skip(10)}
            disabled={disabled}
            aria-label="Skip forward 10 seconds"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <IconPlayerSkipForward size={18} />
          </ActionIcon>
        </Tooltip>

        {/* Settings Menu */}
        <Menu shadow="md" width={220} position="top-end">
          <Menu.Target>
            <Tooltip label="Audio settings">
              <ActionIcon
                variant="subtle"
                size="md"
                disabled={disabled}
                aria-label="Audio settings"
                style={{ minWidth: 36, minHeight: 36 }}
              >
                <IconDots size={18} />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Volume</Menu.Label>
            <Box px="sm" pb="xs">
              <Group gap="xs" mb={4}>
                <Text size="xs" c="dimmed" style={{ flex: 1 }}>
                  Volume
                </Text>
                <Text size="xs" fw={500}>
                  {Math.round(volume * 100)}%
                </Text>
              </Group>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={1}
                step={0.01}
                size="sm"
              />
            </Box>

            <Menu.Divider />

            <Menu.Label>Playback Speed</Menu.Label>
            <Box px="sm" pb="xs">
              <Group gap="xs" mb={4}>
                <Text size="xs" c="dimmed" style={{ flex: 1 }}>
                  Speed
                </Text>
                <Text size="xs" fw={500}>
                  {playbackRate.toFixed(2)}x
                </Text>
              </Group>
              <Slider
                value={playbackRate}
                onChange={handlePlaybackRateChange}
                min={0.25}
                max={2}
                step={0.25}
                size="sm"
                marks={[
                  { value: 0.5, label: '0.5x' },
                  { value: 1, label: '1x' },
                  { value: 1.5, label: '1.5x' },
                ]}
              />
            </Box>

            <Menu.Divider />

            <Menu.Label>Zoom</Menu.Label>
            <Group gap="xs" px="sm" pb="xs">
              <ActionIcon
                variant="light"
                size="sm"
                onClick={zoomOut}
                disabled={!isReady}
                style={{ flex: 1 }}
              >
                <IconZoomOut size={16} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="sm"
                onClick={zoomReset}
                disabled={!isReady}
                style={{ flex: 1 }}
              >
                <IconZoomReset size={16} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="sm"
                onClick={zoomIn}
                disabled={!isReady}
                style={{ flex: 1 }}
              >
                <IconZoomIn size={16} />
              </ActionIcon>
            </Group>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
};
