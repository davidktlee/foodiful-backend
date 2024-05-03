import { CacheModule, Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { FavoriteClassRepository } from 'src/favorite-class/favorite-class.repository';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';
import { AccountRepository } from 'src/auth/account.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MulterOptionsFactory } from 'src/common/multer.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

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
  controllers: [ClassController],
  providers: [
    ClassService,
    ClassRepository,
    FavoriteClassRepository,
    PrismaService,
    AuthService,
    UserRepository,
    AccountRepository,
  ],
})
export class ClassModule {}
