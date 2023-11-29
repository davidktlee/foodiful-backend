import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}
  getAllReservations() {
    return this.prisma.reservation.findMany();
  }

  getReservationByReservationId(id: number) {
    return this.prisma.reservation.findUnique({
      where: { id },
    });
  }

  getReservationByUserId(userId: number) {
    return this.prisma.reservation.findMany({
      where: { userId },
    });
  }

  getReservationByClassId(id: number) {
    return this.prisma.reservation.findMany({
      where: { classId: id },
    });
  }

  createReservation(reservationData) {
    return this.prisma.reservation.create({
      data: { ...reservationData },
    });
  }
}
