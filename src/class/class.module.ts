import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { FavoriteClassRepository } from 'src/favorite-class/favorite-class.repository';

@Module({
  imports: [JwtModule],
  controllers: [ClassController],
  providers: [
    ClassService,
    ClassRepository,
    FavoriteClassRepository,
    PrismaService,
  ],
})
export class ClassModule {}
