export type FileValidationError =
  | 'invalid-type'
  | 'file-too-large'
  | 'invalid-format'
  | 'decode-error';

export interface ValidationResult {
  valid: boolean;
  error?: FileValidationError;
  message?: string;
}
