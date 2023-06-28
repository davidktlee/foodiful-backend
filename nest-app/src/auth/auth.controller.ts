import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Request, Response } from 'express';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userData, @Res({ passthrough: true }) res: Response) {
    const {
      accessToken,
      cookieWithRefreshToken: { refreshToken, ...refreshOption },
      user,
    } = await this.authService.loginUser(userData);
    res.cookie('refresh', refreshToken, refreshOption);
    return {
      success: true,
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        token: accessToken,
      },
    };
  }

  @Post('/signup')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiConflictResponse({})
  // @Redirect('/')
  async signUp(
    @Body() userData: CreateUserDto,
  ): Promise<Pick<UserEntity, 'email' | 'phone' | 'name'>> {
    const { email, name, phone } = await this.authService.signUp(userData);
    return { email, name, phone };
  }
  @Get('/authenticate')
  @ApiCreatedResponse({ description: 'Token 인증이 완료되었습니다.' })
  @UseGuards(JwtGuard)
  isAuthenticated(@Req() req: Request) {
    return {
      success: true,
      user: req.user,
    };
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  async updateRefreshToken(@Res() res: Response, @Req() req: any) {
    const { refreshUser, refreshToken, refreshOption } = req.user;
    res.cookie('refresh', refreshToken, refreshOption);
    return res
      .json({ message: '통신 완료', success: true, refreshUser })
      .status(200);
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const { refreshOption } = this.authService.removeCookieWithRefreshToken();
    res.cookie('refresh', '', refreshOption);
    return { success: true };
  }

  @Get('/checkphone/exists')
  async isExistPhoneNumber(@Query() data) {
    await this.authService.isPhoneNumberExist(data.phone);
  }

  @Post('/checkphone')
  async checkPhone(@Body() data) {
    await this.authService.sendSMS(data.phoneNumber);
  }

  @Post('/checkphone/verify')
  async verifyPhone(@Body() data): Promise<boolean> {
    const res = await this.authService.checkSMS(data.data);
    if (res) return true;
  }
}
