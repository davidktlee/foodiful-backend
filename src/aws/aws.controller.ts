import { Body, Controller, Post } from '@nestjs/common';
import { AwsService } from './aws.service';

@Controller('aws')
export class AwsController {
  constructor(private awsService: AwsService) {}

  @Post('/presignedurl')
  getPresignedUrl(
    @Body() { types, bucket }: { types: string[]; bucket: string },
  ) {
    return this.awsService.getPresignedUrl(types, bucket);
  }
}
