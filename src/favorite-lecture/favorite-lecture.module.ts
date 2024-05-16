import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { FavoriteLectureController } from './favorite-lecture.controller';
import { FavoriteLectureService } from './favorite-lecture.service';
import { FavoriteLectureRepository } from './favorite-lecture.repository';
import { LectureRepository } from 'src/lecture/lecture.repository';

@Module({
  controllers: [FavoriteLectureController],
  providers: [
    FavoriteLectureService,
    FavoriteLectureRepository,
    PrismaService,
    LectureRepository,
  ],
})
export class FavoriteLectureModule {}
