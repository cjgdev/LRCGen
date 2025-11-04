import { create } from 'zustand';
import type { LRCLine } from '../types/lrc';
import type { AudioMetadata } from '../types/audio';
import { exportToLRC } from '../utils/lrcExporter';

interface AudioStore {
  // Audio state
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  playbackRate: number;

  // File state
  audioFile: File | null;
  audioUrl: string | null;

  // Lyrics state
  lyrics: LRCLine[];
  activeLyricIndex: number | null;

  // Metadata
  metadata: AudioMetadata;

  // Actions - Audio control
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;

  // Actions - File management
  loadAudioFile: (file: File) => void;
  clearAudioFile: () => void;

  // Actions - Lyrics management
  setLyrics: (lyrics: LRCLine[]) => void;
  updateLyric: (id: string, updates: Partial<LRCLine>) => void;
  addLyricAtCurrentTime: (text?: string) => void;
  deleteLyric: (id: string) => void;
  setActiveLyricIndex: (index: number | null) => void;

  // Actions - Metadata
  updateMetadata: (updates: Partial<AudioMetadata>) => void;

  // Actions - Export
  exportLRC: () => string;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  // Initial state
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  volume: 1,
  playbackRate: 1,
  audioFile: null,
  audioUrl: null,
  lyrics: [],
  activeLyricIndex: null,
  metadata: {
    title: '',
    artist: '',
    album: '',
    creator: '',
  },

  // Audio control actions
  setCurrentTime: (time) => set({ currentTime: time }),

  setDuration: (duration) => set({ duration }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setVolume: (volume) =>
    set({ volume: Math.max(0, Math.min(1, volume)) }),

  setPlaybackRate: (rate) =>
    set({ playbackRate: Math.max(0.25, Math.min(2.0, rate)) }),

  // File management actions
  loadAudioFile: (file) => {
    const url = URL.createObjectURL(file);
    set({ audioFile: file, audioUrl: url });
  },

  clearAudioFile: () => {
    const { audioUrl } = get();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    set({ audioFile: null, audioUrl: null });
  },

  // Lyrics management actions
  setLyrics: (lyrics) => set({ lyrics }),

  updateLyric: (id, updates) =>
    set((state) => ({
      lyrics: state.lyrics.map((lyric) =>
        lyric.id === id ? { ...lyric, ...updates } : lyric
      ),
    })),

  addLyricAtCurrentTime: (text = '') => {
    const { currentTime, lyrics } = get();
    const newLyric: LRCLine = {
      id: crypto.randomUUID(),
      timestamp: currentTime,
      text,
    };
    set({
      lyrics: [...lyrics, newLyric].sort((a, b) => a.timestamp - b.timestamp),
    });
  },

  deleteLyric: (id) =>
    set((state) => ({
      lyrics: state.lyrics.filter((lyric) => lyric.id !== id),
    })),

  setActiveLyricIndex: (index) => set({ activeLyricIndex: index }),

  // Metadata actions
  updateMetadata: (updates) =>
    set((state) => ({
      metadata: { ...state.metadata, ...updates },
    })),

  // Export action
  exportLRC: () => {
    const { lyrics, metadata } = get();
    return exportToLRC(lyrics, metadata);
  },
}));
