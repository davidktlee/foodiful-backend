import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

import { Request, Response } from 'express';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';
import { LoginUserDto } from './dto/login-user-.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { User } from '@prisma/client';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: UserEntity, description: '로그인이 완료되었습니다.' })
  @ApiBadRequestResponse({})
  @Post('/login')
  async login(
    @Body() userData: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      accessToken,
      cookieWithRefreshToken: { refreshToken, ...refreshOption },
      user,
    } = await this.authService.loginUser(userData);
    res.cookie('refresh', refreshToken, refreshOption);
    return {
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        token: accessToken,
        role: user.role,
      },
    };
  }

  @Post('/signup')
  @ApiCreatedResponse({
    type: UserEntity,
    description: '회원 가입이 완료되었습니다',
  })
  @ApiConflictResponse({})
  // @Redirect('/')
  async signUp(
    @Body() userData: CreateUserDto,
  ): Promise<Pick<UserEntity, 'email' | 'phone' | 'name'>> {
    const { email, name, phone } = await this.authService.signUp(userData);
    return { email, name, phone };
  }

  @Get('/authenticate')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Token 인증이 완료되었습니다.',
    type: UserEntity,
  })
  @UseGuards(JwtGuard)
  isAuthenticated(@GetUser() user: User): User {
    return user;
  }

  @Post('/refresh')
  @ApiOkResponse({ description: 'refresh token 검증이 완료되었습니다.' })
  @UseGuards(JwtRefreshGuard)
  async updateRefreshToken(@Res() res: Response, @GetUser() user) {
    const { refreshUser, refreshToken, refreshOption } = user;
    res.cookie('refresh', refreshToken, refreshOption);
    return res
      .json({ message: '통신 완료', success: true, refreshUser })
      .status(200);
  }

  @ApiOkResponse({ description: '로그아웃이 완료되었습니다.' })
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const { refreshOption } = this.authService.removeCookieWithRefreshToken();
    res.cookie('refresh', '', refreshOption);
    return;
  }

  @ApiOkResponse({ description: '번호 조회가 완료되었습니다.' })
  @Get('/checkphone/exists')
  async isExistPhoneNumber(@Query() data) {
    await this.authService.isPhoneNumberExist(data.phone);
  }

  @ApiOkResponse({ description: '문자 전송이 완료되었습니다.' })
  @ApiInternalServerErrorResponse({ description: '에러가 발생했습니다.' })
  @Post('/checkphone')
  async checkPhone(@Body() data) {
    await this.authService.sendSMS(data.phoneNumber);
  }

  @ApiOkResponse({ description: '번호 확인이 완료되었습니다.' })
  @Post('/checkphone/verify')
  async verifyPhone(@Body() data): Promise<{ success: boolean }> {
    const res = await this.authService.checkSMS(data.data);
    if (res) return { success: true };
  }
}
