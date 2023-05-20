import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { UserService } from 'src/user/user.service';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [
    {
      name: 'lee',
      userId: '1',
      created_at: String(dayjs().format('YYYY-MM-DD-HH-MM')),
      reserveId: 1,
      reserveMsg: '',
    },
  ];
  getReservation(): Reservation[] {
    return this.reservations;
  }
  createReservation(reservation: Reservation): string {
    // userId 와 username userService에서 불러와야함
    // classId와 className, classTime classService에서 불러와야 함
    this.reservations.push({
      reserveId: String(this.reservations.length + 1),
      created_at: String(dayjs().format('YYYY-MM-DD-HH:mm')),
      ...reservation,
    });
    return '예약이 추가되었습니다.';
  }
}
