import { Box } from '@mantine/core';
import { CompactWaveformPlayer } from '../AudioPlayer/CompactWaveformPlayer';

interface BottomBarProps {
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

export const BottomBar = ({
  containerRef,
  timelineRef,
  isReady,
  togglePlayPause,
  skip,
  setPlaybackRate,
  setVolume,
  syncRegionsWithLyrics,
  zoomIn,
  zoomOut,
  zoomReset,
}: BottomBarProps) => {
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
        padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
      }}
    >
      <CompactWaveformPlayer
        containerRef={containerRef}
        timelineRef={timelineRef}
        isReady={isReady}
        togglePlayPause={togglePlayPause}
        skip={skip}
        setPlaybackRate={setPlaybackRate}
        setVolume={setVolume}
        syncRegionsWithLyrics={syncRegionsWithLyrics}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        zoomReset={zoomReset}
      />
    </Box>
  );
};
