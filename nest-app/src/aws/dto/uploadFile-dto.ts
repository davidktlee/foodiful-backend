import { IsIn } from 'class-validator';

export const VALID_IMAGE_FILE_TYPES = [
  'image/apng',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
];

type ValidImageFileTypes = typeof VALID_IMAGE_FILE_TYPES;

export class UploadFilesDto {
  @IsIn(VALID_IMAGE_FILE_TYPES, { each: true })
  fileTypes: ValidImageFileTypes;
}
