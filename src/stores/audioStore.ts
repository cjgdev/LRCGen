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

  // History state for undo/redo
  history: LRCLine[][];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;

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
  setLyrics: (lyrics: LRCLine[], addToHistory?: boolean) => void;
  updateLyric: (id: string, updates: Partial<LRCLine>) => void;
  addLyricAtCurrentTime: (text?: string) => void;
  deleteLyric: (id: string) => void;
  setActiveLyricIndex: (index: number | null) => void;

  // Actions - History
  undo: () => void;
  redo: () => void;
  pushToHistory: () => void;

  // Actions - Metadata
  updateMetadata: (updates: Partial<AudioMetadata>) => void;

  // Actions - Export
  exportLRC: () => string;
}

const MAX_HISTORY = 50; // Maximum history entries

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
  history: [[]],
  historyIndex: 0,
  canUndo: false,
  canRedo: false,
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
  setLyrics: (lyrics, addToHistory = true) => {
    if (addToHistory) {
      const state = get();
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(lyrics)));

      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }

      set({
        lyrics,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: newHistory.length > 1,
        canRedo: false,
      });
    } else {
      set({ lyrics });
    }
  },

  updateLyric: (id, updates) => {
    const state = get();
    const newLyrics = state.lyrics.map((lyric) =>
      lyric.id === id ? { ...lyric, ...updates } : lyric
    );

    // Add to history
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLyrics)));

    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }

    set({
      lyrics: newLyrics,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: newHistory.length > 1,
      canRedo: false,
    });
  },

  addLyricAtCurrentTime: (text = '') => {
    const { currentTime, lyrics } = get();
    const newLyric: LRCLine = {
      id: crypto.randomUUID(),
      timestamp: currentTime,
      text,
    };
    const newLyrics = [...lyrics, newLyric].sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Add to history
    const state = get();
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLyrics)));

    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }

    set({
      lyrics: newLyrics,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: newHistory.length > 1,
      canRedo: false,
    });
  },

  deleteLyric: (id) => {
    const state = get();
    const newLyrics = state.lyrics.filter((lyric) => lyric.id !== id);

    // Add to history
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLyrics)));

    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }

    set({
      lyrics: newLyrics,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: newHistory.length > 1,
      canRedo: false,
    });
  },

  setActiveLyricIndex: (index) => set({ activeLyricIndex: index }),

  // History actions
  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      set({
        lyrics: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      set({
        lyrics: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < state.history.length - 1,
      });
    }
  },

  pushToHistory: () => {
    const state = get();
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(state.lyrics)));

    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: newHistory.length > 1,
      canRedo: false,
    });
  },

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
