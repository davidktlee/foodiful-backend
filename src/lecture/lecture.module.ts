import { CacheModule, Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { FavoriteLectureRepository } from 'src/favorite-lecture/favorite-lecture.repository';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';
import { AccountRepository } from 'src/auth/account.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MulterOptionsFactory } from 'src/common/multer.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureRepository } from './lecture.repository';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        MulterOptionsFactory(configService, 'product'),
      inject: [ConfigService],
    }),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // secret 키
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      signOptions: {
        expiresIn: 60,
      },
    }),
    CacheModule.register({ ttl: 60000 }),
  ],
  controllers: [LectureController],
  providers: [
    LectureService,
    LectureRepository,
    FavoriteLectureRepository,
    PrismaService,
    AuthService,
    UserRepository,
    AccountRepository,
  ],
})
export class LectureModule {}
