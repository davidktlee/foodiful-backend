import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

/**
 * @Todo decode 반환 타입 정의 => jwtService 오버라이딩 할 지, 어떻게 사용해야 할 지 고민해보기
 */

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      throw new NotFoundException(
        'Role이 존재하지 않습니다 재 로그인 해주세요',
      );
    }

    const request = context.switchToHttp().getRequest();

    const user = request.headers.authorization.replace('Bearer ', '');
    const decoded: any = this.jwtService.decode(user);

    // token 에서 role 뽑아와서 meta data의 롤과 비교 후 같다면 matchRoles에서 true 리턴
    return this.matchRoles(roles, decoded.role);
  }
  private matchRoles(roles: string[], userRole): boolean {
    if (roles.includes(userRole)) return true;
    else return false;
  }
}
