import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // secret 키
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      signOptions: {
        expiresIn: 60,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaService, LocalStrategy],
  exports: [LocalStrategy, PassportModule],
})
export class AuthModule {}
