import { Module } from '@nestjs/common';
import { FavoriteClassService } from './favorite-class.service';
import { FavoriteClassController } from './favorite-class.controller';
import { FavoriteClassRepository } from './favorite-class.repository';
import { PrismaService } from 'src/prisma.service';
import { ClassRepository } from 'src/class/class.repository';

@Module({
  controllers: [FavoriteClassController],
  providers: [
    FavoriteClassService,
    FavoriteClassRepository,
    PrismaService,
    ClassRepository,
  ],
})
export class FavoriteClassModule {}
