export interface AudioMetadata {
  title: string;
  artist: string;
  album: string;
  creator: string;
  duration?: number;
}

export interface AudioState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  playbackRate: number;
}
