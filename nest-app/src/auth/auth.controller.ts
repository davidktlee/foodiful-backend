import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('/login')
  @UseGuards(AuthGuard())
  login(@Req() req) {
    console.log(req);
  }

  @Post('/signup')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiConflictResponse({})
  async signUp(@Body() userData) {
    return this.authService.signUp(userData);
  }
  //   userData,)
  // async signUp(
  //   @Body()
  //   userData,
  // ): Promise<{ createdUser: User; message: string }> {
  //   return this.authService.signUp(userData);
  // }
}
