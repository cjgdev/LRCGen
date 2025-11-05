import type { LRCLine } from '../types/lrc';

/**
 * Finds the index of the active lyric line at a given time using binary search
 * Returns the index of the last lyric whose timestamp is <= currentTime
 * Special handling: If all lyrics are unassigned (timestamp 0), returns 0 (first lyric)
 * Skips lyrics with timestamp 0 or timestamps that come before the previous line
 */
export const findActiveLyric = (
  lyrics: LRCLine[],
  currentTime: number
): number => {
  if (lyrics.length === 0) {
    return -1;
  }

  // Check if all lyrics have unassigned timestamps (0)
  const allUnassigned = lyrics.every(lyric => lyric.timestamp === 0);
  if (allUnassigned) {
    return 0; // Default to first lyric
  }

  // Find lyrics with valid assigned timestamps
  const validLyrics = lyrics
    .map((lyric, index) => ({ ...lyric, originalIndex: index }))
    .filter((lyric, index, arr) => {
      // Keep lyrics with timestamp > 0
      if (lyric.timestamp === 0) return false;
      // Keep if first lyric or timestamp is after previous
      if (index === 0) return lyric.timestamp > 0;
      return lyric.timestamp >= arr[index - 1].timestamp;
    });

  if (validLyrics.length === 0) {
    return 0; // No valid timestamps, default to first
  }

  // If current time is before first valid timestamp, return 0
  if (currentTime < validLyrics[0].timestamp) {
    return 0;
  }

  // Binary search through valid lyrics
  let left = 0;
  let right = validLyrics.length - 1;
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (validLyrics[mid].timestamp <= currentTime) {
      result = validLyrics[mid].originalIndex;
      left = mid + 1;
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
