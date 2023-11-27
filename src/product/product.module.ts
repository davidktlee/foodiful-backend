import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { AccountRepository } from 'src/auth/account.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AwsService } from 'src/aws/aws.service';
import { MulterOptionsFactory } from 'src/common/multer.options';
import { FavoriteProductRepository } from 'src/favorite-product/favorite-product.repository';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from 'src/user/user.repository';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

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
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaService,
    ProductRepository,
    AuthService,
    AwsService,
    FavoriteProductRepository,
    UserRepository,
    AccountRepository,
    ConfigService,
  ],
  exports: [PassportModule],
})
export class ProductModule {}
