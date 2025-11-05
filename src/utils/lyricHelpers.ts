import type { LRCLine } from '../types/lrc';

/**
 * Finds the index of the active lyric line at a given time using binary search
 * Returns the index of the last lyric whose timestamp is <= currentTime
 * Returns -1 if no lyric should be active
 */
export const findActiveLyric = (
  lyrics: LRCLine[],
  currentTime: number
): number => {
  if (lyrics.length === 0 || currentTime < lyrics[0].timestamp) {
    return -1;
  }

  let left = 0;
  let right = lyrics.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (lyrics[mid].timestamp <= currentTime) {
      result = mid;
      left = mid + 1; // Look for a later timestamp
    } else {
      right = mid - 1;
    }
  }

  return result;
};

/**
 * Adjusts all lyric timestamps by a given offset (in seconds)
 */
export const offsetAllTimestamps = (
  lyrics: LRCLine[],
  offsetSeconds: number
): LRCLine[] => {
  return lyrics.map((lyric) => ({
    ...lyric,
    timestamp: Math.max(0, lyric.timestamp + offsetSeconds),
  }));
};

/**
 * Adjusts timestamps for a specific range of lyrics
 */
export const offsetRangeTimestamps = (
  lyrics: LRCLine[],
  startIndex: number,
  endIndex: number,
  offsetSeconds: number
): LRCLine[] => {
  return lyrics.map((lyric, index) => {
    if (index >= startIndex && index <= endIndex) {
      return {
        ...lyric,
        timestamp: Math.max(0, lyric.timestamp + offsetSeconds),
      };
    }
    return lyric;
  });
};
