import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CheckFileInterceptor } from './aws.decorator';
import { FileTypeMiddleware } from './aws.middleware';
import { AwsService } from './aws.service';
import { UploadFilesDto, VALID_IMAGE_FILE_TYPES } from './dto/uploadFile-dto';

@Controller('aws')
export class AwsController {
  constructor(private awsService: AwsService) {}

  @Post('/presignedurl')
  async getPresignedUrl(
    @Body() { types, bucket }: { types: string[]; bucket: string },
  ) {
    const res = await this.awsService.getPresignedUrl(types, bucket);
    if (!res) throw new InternalServerErrorException('서버에 문제가 있습니다.');
    return res;
  }
}
