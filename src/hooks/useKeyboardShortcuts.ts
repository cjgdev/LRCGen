import { useHotkeys } from 'react-hotkeys-hook';
import { useAudioStore } from '../stores/audioStore';

interface UseKeyboardShortcutsProps {
  wavesurfer: any;
  onToggleHelp?: () => void;
}

export const useKeyboardShortcuts = ({
  wavesurfer,
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
      wavesurfer?.playPause();
    },
    { enableOnFormTags: false },
    [wavesurfer]
  );

  // Seeking - j, l for 10s, arrows for 5s
  useHotkeys('j', () => wavesurfer?.skip(-10), [wavesurfer]);
  useHotkeys('l', () => wavesurfer?.skip(10), [wavesurfer]);
  useHotkeys('left', () => wavesurfer?.skip(-5), [wavesurfer]);
  useHotkeys('right', () => wavesurfer?.skip(5), [wavesurfer]);

  // Frame by frame - comma and period
  useHotkeys(',', () => wavesurfer?.skip(-0.0167), [wavesurfer]); // ~1 frame back
  useHotkeys('.', () => wavesurfer?.skip(0.0167), [wavesurfer]); // ~1 frame forward

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
      wavesurfer?.setPlaybackRate(newRate);
      useAudioStore.getState().setPlaybackRate(newRate);
    },
    [wavesurfer, playbackRate]
  );

  useHotkeys(
    'shift+period',
    () => {
      const newRate = Math.min(2.0, playbackRate + 0.25);
      wavesurfer?.setPlaybackRate(newRate);
      useAudioStore.getState().setPlaybackRate(newRate);
    },
    [wavesurfer, playbackRate]
  );

  // Help overlay
  useHotkeys('shift+slash', () => onToggleHelp?.(), [onToggleHelp]);

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
};
