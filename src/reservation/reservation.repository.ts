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

  getReservationByClassId(id: number) {
    return this.prisma.reservation.findMany({
      where: { lectureId: id },
    });
  }

  createReservation(reservationData) {
    return this.prisma.reservation.create({
      data: { ...reservationData },
    });
  }
}
