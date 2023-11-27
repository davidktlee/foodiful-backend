import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';

export const GetUserToken = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    if (req.headers.authorization) {
      return req.headers.authorization.replace('Bearer ', '');
    }
  },
);
