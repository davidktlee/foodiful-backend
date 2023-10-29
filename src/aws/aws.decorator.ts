import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CheckFileInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('context', context);
    const req = context.switchToHttp().getRequest();
    // const formData = new formidable.IncomingForm();
    console.log(req);

    // formData.parse()를 사용하여 form-data 파싱
    // formData.parse(req, (err, fields, files) => {
    //   if (err) {
    //     throw new BadRequestException('Error parsing form data');
    //   }

    //   req.body = fields; // 파싱된 필드를 req.body로 설정
    //   req.files = files; // 업로드된 파일을 req.files로 설정
    // });

    return next.handle();
  }
}
