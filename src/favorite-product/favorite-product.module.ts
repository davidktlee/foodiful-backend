import { Module } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { FavoriteProductController } from './favorite-product.controller';
import { PrismaService } from 'src/prisma.service';
import { FavoriteProductRepository } from './favorite-product.repository';

@Module({
  controllers: [FavoriteProductController],
  providers: [FavoriteProductService, FavoriteProductRepository, PrismaService],
})
export class FavoriteProductModule {}
