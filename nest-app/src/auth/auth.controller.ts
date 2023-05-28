import { Body, Controller, Post } from '@nestjs/common';

import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/login')
  // async login() {}
  @Post('/signup')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiConflictResponse({})
  async signUp(
    @Body()
    userData,
  ): Promise<{ createdUser: User; message: string }> {
    return this.authService.signUp(userData);
  }
}
