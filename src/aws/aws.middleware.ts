import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UploadedFiles } from '@nestjs/common';

@Injectable()
export class FileTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedMimeTypes = ['image/png', 'image/jpeg']; // 허용할 MIME 타입들

    // @UploadedFiles() 데코레이터로 업로드된 파일 객체들에 접근
    const uploadedFiles: any = req['files']; // req.body.files에 업로드된 파일 객체들이 있어야 함

    for (const uploadedFile of uploadedFiles) {
      if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
        throw new BadRequestException(
          `Invalid file mime type for file: ${uploadedFile.originalname}`,
        );
      }
    }

    next();
  }
}
