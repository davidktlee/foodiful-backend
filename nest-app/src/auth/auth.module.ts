import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // secret 키
      secret: '시크릿키임',
      signOptions: {
        expiresIn: 60,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
