import type { AudioMetadata } from '../types/audio';
import type { LRCLine, LRCFile } from '../types/lrc';
import { parseTimestamp } from './timeFormatter';

/**
 * Parses LRC file content into structured data
 */
export const parseLRC = (content: string): LRCFile => {
  const lines = content.split('\n');
  const metadata: AudioMetadata = {
    title: '',
    artist: '',
    album: '',
    creator: '',
  };
  const lyrics: LRCLine[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Parse metadata tags
    const metadataMatch = trimmedLine.match(/\[(\w+):(.+)\]/);
    if (metadataMatch) {
      const [, tag, value] = metadataMatch;
      switch (tag) {
        case 'ti':
          metadata.title = value.trim();
          break;
        case 'ar':
          metadata.artist = value.trim();
          break;
        case 'al':
          metadata.album = value.trim();
          break;
        case 'by':
          metadata.creator = value.trim();
          break;
      }
      continue;
    }

    // Parse lyric lines with timestamps
    const lyricMatch = trimmedLine.match(/\[(\d+:\d+\.\d+)\](.+)/);
    if (lyricMatch) {
      const [, timestamp, text] = lyricMatch;
      lyrics.push({
        id: crypto.randomUUID(),
        timestamp: parseTimestamp(timestamp),
        text: text.trim(),
      });
    }
  }

  return { metadata, lyrics };
};
