import { useHotkeys } from 'react-hotkeys-hook';
import { useAudioStore } from '../stores/audioStore';

interface UseKeyboardShortcutsProps {
  wavesurfer?: any;
  togglePlayPause?: () => void;
  skip?: (seconds: number) => void;
  setPlaybackRate?: (rate: number) => void;
  seekTo?: (time: number) => void;
  onToggleHelp?: () => void;
}

export const useKeyboardShortcuts = ({
  togglePlayPause,
  skip,
  setPlaybackRate: setPlaybackRateFn,
  seekTo,
  onToggleHelp,
}: UseKeyboardShortcutsProps) => {
  const addLyricAtCurrentTime = useAudioStore(
    (state) => state.addLyricAtCurrentTime
  );
  const playbackRate = useAudioStore((state) => state.playbackRate);

  // Playback control - space and k
  useHotkeys(
    'space, k',
    (e) => {
      e.preventDefault();
      togglePlayPause?.();
    },
    { enableOnFormTags: false },
    [togglePlayPause]
  );

  // Seeking - j, l for 10s, arrows for 5s
  useHotkeys('j', () => skip?.(-10), [skip]);
  useHotkeys('l', () => skip?.(10), [skip]);
  useHotkeys('left', () => skip?.(-5), [skip]);
  useHotkeys('right', () => skip?.(5), [skip]);

  // Frame by frame - comma and period
  useHotkeys(',', () => skip?.(-0.0167), [skip]); // ~1 frame back
  useHotkeys('.', () => skip?.(0.0167), [skip]); // ~1 frame forward

  // Timestamp marking - Enter key
  useHotkeys(
    'enter',
    (e) => {
      e.preventDefault();
      addLyricAtCurrentTime();
    },
    { enableOnFormTags: ['TEXTAREA'] },
    [addLyricAtCurrentTime]
  );

  // Playback speed adjustment
  useHotkeys(
    'shift+comma',
    () => {
      const newRate = Math.max(0.25, playbackRate - 0.25);
      setPlaybackRateFn?.(newRate);
      useAudioStore.getState().setPlaybackRate(newRate);
    },
    [setPlaybackRateFn, playbackRate]
  );

  useHotkeys(
    'shift+period',
    () => {
      const newRate = Math.min(2.0, playbackRate + 0.25);
      setPlaybackRateFn?.(newRate);
      useAudioStore.getState().setPlaybackRate(newRate);
    },
    [setPlaybackRateFn, playbackRate]
  );

  // Help overlay
  useHotkeys('shift+slash', () => onToggleHelp?.(), [onToggleHelp]);

  // Seek to active lyric - G key
  useHotkeys(
    'g',
    () => {
      const timestamp = useAudioStore.getState().seekToActiveLyric();
      if (timestamp !== null) {
        seekTo?.(timestamp);
      }
    },
    [seekTo]
  );

  // Export - Cmd/Ctrl+S
  useHotkeys(
    'mod+s',
    (e) => {
      e.preventDefault();
      const lrcContent = useAudioStore.getState().exportLRC();
      const title =
        useAudioStore.getState().metadata.title || 'untitled';
      const blob = new Blob([lrcContent], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.lrc`;
      link.click();
      URL.revokeObjectURL(url);
    },
    []
  );

  // Undo - Cmd/Ctrl+Z
  useHotkeys(
    'mod+z',
    (e) => {
      e.preventDefault();
      useAudioStore.getState().undo();
    },
    { enableOnFormTags: false }
  );

  // Redo - Cmd/Ctrl+Shift+Z
  useHotkeys(
    'mod+shift+z',
    (e) => {
      e.preventDefault();
      useAudioStore.getState().redo();
    },
    { enableOnFormTags: false }
  );
};
