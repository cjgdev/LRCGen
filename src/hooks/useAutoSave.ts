import { useEffect, useRef } from 'react';
import { useAudioStore } from '../stores/audioStore';
import { notifications } from '@mantine/notifications';

const AUTO_SAVE_KEY = 'lrc-editor-autosave';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

interface AutoSaveData {
  lyrics: any[];
  metadata: any;
  timestamp: number;
}

export const useAutoSave = () => {
  const lyrics = useAudioStore((state) => state.lyrics);
  const metadata = useAudioStore((state) => state.metadata);
  const setLyrics = useAudioStore((state) => state.setLyrics);
  const updateMetadata = useAudioStore((state) => state.updateMetadata);
  const timerRef = useRef<number | undefined>(undefined);

  // Save to localStorage
  const save = () => {
    if (lyrics.length === 0) return;

    const data: AutoSaveData = {
      lyrics,
      metadata,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  // Load from localStorage
  const load = (): AutoSaveData | null => {
    try {
      const saved = localStorage.getItem(AUTO_SAVE_KEY);
      if (!saved) return null;

      return JSON.parse(saved);
    } catch (error) {
      console.error('Auto-load failed:', error);
      return null;
    }
  };

  // Clear auto-save
  const clear = () => {
    try {
      localStorage.removeItem(AUTO_SAVE_KEY);
    } catch (error) {
      console.error('Clear auto-save failed:', error);
    }
  };

  // Restore from auto-save
  const restore = () => {
    const saved = load();
    if (!saved) return false;

    setLyrics(saved.lyrics, false);
    updateMetadata(saved.metadata);

    const savedTime = new Date(saved.timestamp).toLocaleTimeString();
    notifications.show({
      title: 'Work restored',
      message: `Restored from auto-save at ${savedTime}`,
      color: 'blue',
    });

    return true;
  };

  // Auto-save on interval
  useEffect(() => {
    const saveInterval = () => {
      if (lyrics.length > 0) {
        save();
      }
    };

    if (lyrics.length > 0) {
      timerRef.current = window.setInterval(saveInterval, AUTO_SAVE_INTERVAL);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [lyrics, metadata]);

  // Save on unmount
  useEffect(() => {
    return () => {
      if (lyrics.length > 0) {
        const data: AutoSaveData = {
          lyrics,
          metadata,
          timestamp: Date.now(),
        };
        try {
          localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
        } catch (error) {
          console.error('Auto-save on unmount failed:', error);
        }
      }
    };
  }, [lyrics, metadata]);

  return {
    save,
    load,
    clear,
    restore,
  };
};
