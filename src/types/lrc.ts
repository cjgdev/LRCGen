import type { AudioMetadata } from './audio';

export interface LRCLine {
  id: string;
  timestamp: number; // seconds with centisecond precision
  text: string;
}

export interface LRCFile {
  metadata: AudioMetadata;
  lyrics: LRCLine[];
  offset?: number; // Global time offset in milliseconds
}

export interface LRCExportOptions {
  includeEmptyLines: boolean;
  timestampPrecision: 'centiseconds' | 'milliseconds';
  sortByTimestamp: boolean;
}
