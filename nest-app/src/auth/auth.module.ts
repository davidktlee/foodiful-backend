import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // secret 키
      secret: '시크릿키임',
      signOptions: {
        expiresIn: '10h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaService],
})
export class AuthModule {}
