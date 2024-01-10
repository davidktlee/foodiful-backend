import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Injectable()
export class AwsService {
  private readonly bucketName: string;
  private readonly s3: S3;
  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get('AWS_BUCKET_NAME');
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_BUCKET_REGION'),
    });
  }
  async getPresignedUrl(fileTypes: string[], bucket: string) {
    // return Promise.all(
    //   fileTypes.map(async (fileType) => {
    //     const extension = fileType.split('/')[1];
    //     const imageKey = `${randomUUID()}.${extension}`;
    //     const key = `${bucket}/${imageKey}`;
    //     const presigned = await this.createPresigned(key);
    //     return { imageKey, presigned };
    //   }),
    // );

    // 두 번째 방법
    try {
      return Promise.all(
        fileTypes.map(async (fileType) => {
          const extension = fileType.split('/')[1];
          const imageKey = `${randomUUID()}.${extension}`;
          const key = `${bucket}/${imageKey}`;
          const signenUrlPut = await this.s3.getSignedUrlPromise('putObject', {
            Bucket: this.bucketName,
            Key: key,
            Expires: 60 * 60,
          });
          return signenUrlPut;
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    /**
     *  'getObject': 객체를 가져오는 작업을 나타냅니다. 이 작업은 S3 버킷의 객체를 읽어오는 데 사용됩니다.
        'putObject': 객체를 업로드하는 작업을 나타냅니다. 이 작업은 파일을 S3 버킷에 업로드하는 데 사용됩니다.
        'deleteObject': 객체를 삭제하는 작업을 나타냅니다. 이 작업은 S3 버킷에서 객체를 삭제하는 데 사용됩니다.
        'listObjects': 객체 목록을 나열하는 작업을 나타냅니다. 이 작업은 S3 버킷 내의 객체들의 목록을 가져오는 데 사용됩니다.
        'copyObject': 객체를 복사하는 작업을 나타냅니다. 이 작업은 S3 버킷 내에서 객체를 복사하는 데 사용됩니다.
      */
  }
  // async createPresigned(key) {
  //   return this.s3.createPresignedPost({
  //     Bucket: this.bucketName,
  //     Fields: {
  //       key,
  //     },
  //     Expires: 60 * 60,
  //     Conditions: [
  //       ['content-length-range', 0, 20 * 1000 * 1000], // 0 ~ 20MB
  //       ['starts-with', '$Content-Type', 'image/'],
  //     ],
  //   });
  // }
}
