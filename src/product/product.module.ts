import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { AwsService } from 'src/aws/aws.service';
import { MulterOptionsFactory } from 'src/common/multer.options';
import { PrismaService } from 'src/prisma.service';
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
    JwtModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductRepository, AwsService],
})
export class ProductModule {}
