import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}
  getAllReservations(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  getReservationByReservationId(id: number): Promise<Reservation> {
    return this.prisma.reservation.findUnique({
      where: { id },
    });
  }

  getReservationByClassId(id: number): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { lectureId: id },
    });
  }

  createReservation(reservationData): Promise<Reservation> {
    return this.prisma.reservation.create({
      data: { ...reservationData },
    });
  }
}
