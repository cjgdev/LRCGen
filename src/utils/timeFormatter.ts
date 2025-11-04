/**
 * Formats seconds into MM:SS.xx format for LRC timestamps
 * @param seconds Time in seconds with decimal precision
 * @returns Formatted time string (MM:SS.xx)
 */
export const formatTimestamp = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toFixed(2).padStart(5, '0');
  return `${minutes}:${secs}`;
};

/**
 * Formats seconds into human-readable time (MM:SS)
 * @param seconds Time in seconds
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Parses LRC timestamp format (MM:SS.xx) to seconds
 * @param timestamp LRC timestamp string
 * @returns Time in seconds
 */
export const parseTimestamp = (timestamp: string): number => {
  const match = timestamp.match(/(\d+):(\d+)\.(\d+)/);
  if (!match) return 0;

  const [, minutes, seconds, centiseconds] = match;
  return (
    parseInt(minutes) * 60 +
    parseInt(seconds) +
    parseInt(centiseconds.padEnd(2, '0')) / 100
  );
};
