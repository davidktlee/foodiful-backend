import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClassRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getAllClasses() {
    return this.prisma.class.findMany();
  }
  async getClassById(id: number) {
    return this.prisma.class.findUnique({
      where: { id },
      include: { reservation: true },
    });
  }
}
