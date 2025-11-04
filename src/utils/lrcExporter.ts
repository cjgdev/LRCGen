import type { AudioMetadata } from '../types/audio';
import type { LRCLine } from '../types/lrc';
import { formatTimestamp } from './timeFormatter';

/**
 * Exports lyrics and metadata to LRC format string
 */
export const exportToLRC = (
  lyrics: LRCLine[],
  metadata: AudioMetadata
): string => {
  const metadataLines = [
    `[ti:${metadata.title}]`,
    `[ar:${metadata.artist}]`,
    `[al:${metadata.album}]`,
    `[by:${metadata.creator}]`,
  ];

  const lyricLines = lyrics
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((line) => `[${formatTimestamp(line.timestamp)}]${line.text}`);

  return [...metadataLines, '', ...lyricLines].join('\n');
};

/**
 * Downloads LRC content as a file
 */
export const downloadLRC = (
  content: string,
  filename: string = 'lyrics.lrc'
): void => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
