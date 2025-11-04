import type { ValidationResult } from '../types/global';

const SUPPORTED_AUDIO_FORMATS = [
  'audio/wav',
  'audio/wave',
  'audio/x-wav',
  'audio/mpeg',
  'audio/mp3',
  'audio/aac',
  'audio/flac',
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

/**
 * Validates audio file type and size
 */
export const validateAudioFile = (file: File): ValidationResult => {
  // Check file type
  if (!SUPPORTED_AUDIO_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: 'invalid-type',
      message: `Unsupported file type: ${file.type}. Please use WAV, MP3, AAC, or FLAC.`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'file-too-large',
      message: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit.`,
    };
  }

  return { valid: true };
};

/**
 * Validates text file for lyrics import
 */
export const validateTextFile = (file: File): ValidationResult => {
  if (file.type !== 'text/plain' && !file.name.endsWith('.lrc')) {
    return {
      valid: false,
      error: 'invalid-type',
      message: 'Please upload a .txt or .lrc file.',
    };
  }

  if (file.size > 1024 * 1024) {
    // 1MB
    return {
      valid: false,
      error: 'file-too-large',
      message: 'Text file is too large.',
    };
  }

  return { valid: true };
};
