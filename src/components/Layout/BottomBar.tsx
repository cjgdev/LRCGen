import { Box, Paper, Stack } from '@mantine/core';
import { WaveformPlayer } from '../AudioPlayer/WaveformPlayer';
import { PlaybackControls } from '../AudioPlayer/PlaybackControls';

export const BottomBar = () => {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderTop: '1px solid var(--mantine-color-gray-3)',
        backgroundColor: 'var(--mantine-color-body)',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Paper p="md" radius={0}>
        <Stack gap="md">
          <WaveformPlayer />
          <PlaybackControls />
        </Stack>
      </Paper>
    </Box>
  );
};
