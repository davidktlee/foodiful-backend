import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [
    {
      name: 'lee',
      userId: '1',
      created_at: '2022',
      reserveId: 1,
      reserveMsg: '',
    },
  ];
  getReservation(): Reservation[] {
    return this.reservations;
  }
  createReservation(reservation: Reservation): string {
    this.reservations.push({
      reserveId: String(this.reservations.length + 1),
      ...reservation,
    });
    return '예약이 추가되었습니다.';
  }
}
