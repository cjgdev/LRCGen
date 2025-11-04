import { useRef, useEffect, useCallback } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { useAudioStore } from '../stores/audioStore';

export const useWaveformPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);

  const audioUrl = useAudioStore((state) => state.audioUrl);
  const setDuration = useAudioStore((state) => state.setDuration);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying);

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl || '',
    height: 128,
    waveColor: '#ddd',
    progressColor: '#4353ff',
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    plugins: [
      RegionsPlugin.create(),
      TimelinePlugin.create(),
    ],
  });

  // Sync playback state to store
  useEffect(() => {
    if (!wavesurfer) return;

    const unsubscribe = [
      wavesurfer.on('ready', () => {
        setDuration(wavesurfer.getDuration());
      }),
      wavesurfer.on('timeupdate', (time) => {
        setCurrentTime(time);
      }),
      wavesurfer.on('play', () => {
        setIsPlaying(true);
      }),
      wavesurfer.on('pause', () => {
        setIsPlaying(false);
      }),
      wavesurfer.on('finish', () => {
        setIsPlaying(false);
      }),
    ];

    return () => {
      unsubscribe.forEach((fn) => fn());
    };
  }, [wavesurfer, setDuration, setCurrentTime, setIsPlaying]);

  // Store regions plugin reference
  useEffect(() => {
    if (!wavesurfer) return;
    const regions = wavesurfer.getActivePlugins()[0];
    if (regions instanceof RegionsPlugin) {
      regionsRef.current = regions;
    }
  }, [wavesurfer]);

  const togglePlayPause = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  const seekTo = useCallback(
    (time: number) => {
      if (wavesurfer) {
        wavesurfer.setTime(time);
      }
    },
    [wavesurfer]
  );

  const skip = useCallback(
    (seconds: number) => {
      if (wavesurfer) {
        const newTime = Math.max(
          0,
          Math.min(wavesurfer.getDuration(), currentTime + seconds)
        );
        wavesurfer.setTime(newTime);
      }
    },
    [wavesurfer, currentTime]
  );

  const setPlaybackRate = useCallback(
    (rate: number) => {
      if (wavesurfer) {
        wavesurfer.setPlaybackRate(rate);
      }
    },
    [wavesurfer]
  );

  const setVolume = useCallback(
    (volume: number) => {
      if (wavesurfer) {
        wavesurfer.setVolume(volume);
      }
    },
    [wavesurfer]
  );

  const addRegionMarker = useCallback(
    (start: number, color: string = 'rgba(67, 83, 255, 0.3)') => {
      if (regionsRef.current) {
        regionsRef.current.addRegion({
          start,
          color,
          drag: false,
          resize: false,
        });
      }
    },
    []
  );

  return {
    containerRef,
    timelineRef,
    wavesurfer,
    isReady,
    isPlaying,
    currentTime,
    togglePlayPause,
    seekTo,
    skip,
    setPlaybackRate,
    setVolume,
    addRegionMarker,
  };
};
