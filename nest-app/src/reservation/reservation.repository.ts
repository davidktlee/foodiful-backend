import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}
  getAllReservations() {
    return this.prisma.reservation.findMany();
  }

  getReservationByClassId(id: number) {
    return this.prisma.reservation.findMany({
      where: { classId: id },
    });
  }
}
