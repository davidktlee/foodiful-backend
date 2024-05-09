import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';

@Injectable()
export class RecommentRepository {
  constructor(private prisma: PrismaService) {}

  create(createRecommentDto: CreateRecommentDto, userId: number) {
    return this.prisma.recomment.create({
      data: { ...createRecommentDto, userId },
    });
  }

  findOne(id: number) {
    return this.prisma.recomment.findUnique({
      where: { id },
    });
  }
  remove(id: number) {
    return this.prisma.recomment.delete({
      where: { id },
    });
  }
}
