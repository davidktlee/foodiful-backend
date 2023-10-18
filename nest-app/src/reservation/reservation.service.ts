import { Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';

import { ClassRepository } from 'src/class/class.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';

import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private classRepository: ClassRepository,
    private reservationRepository: ReservationRepository,
    private userRepository: UserRepository,
  ) {}

  getAllReservations() {
    return this.reservationRepository.getAllReservations();
  }

  // async getReservation(id: number, date: string) {
  async getReservation(id: number) {
    const { name, classDuration, reservation } =
      await this.classRepository.getClassById(id);
    if (!name)
      throw new NotFoundException({
        success: false,
        message: '클래스를 찾을 수 없습니다',
      });

    // const reservations =
    //   await this.reservationRepository.getReservationByClassId(id);

    const reservedData = reservation.flatMap(({ reserveDate }) =>
      this.getReservedTimeAddedClassDuration(reserveDate, classDuration),
    );
    return { name, classDuration, reservedData };
    // 백엔드에서 예약 시간에 대한 처리 한다면 아래 로직 사용
    // return reservations.flatMap((reservation) =>
    //   this.getReservedTime(date, reservation.reserveDate),
    // );
  }

  async getReservationByUserId(userId: number) {
    return this.userRepository.getReservationByUserId(userId);
  }
  createReservation(reservation: CreateReservationDto) {
    // 현재 user가 같은 시간에 예약이 되어 있지 않은 지 확인.
    // userId 와 username userService에서 불러와야함
    // classId와 className, classTime classService에서 불러와야 함
  }

  getReservedTime(date, reservation: string[]) {
    const reservedTimes = reservation.filter((item) =>
      dayjs(item).isSame(dayjs(date), 'date'),
    );
    return reservedTimes;
  }

  // 예약 시간에서 클래스 진행 시간을 더한 배열 리턴 -> 프론트에서 처리
  getReservedTimeAddedClassDuration(date: string[], classDuration: number) {
    const dates = [];
    date.forEach((day) => {
      for (let i = 0; i < classDuration; i += 30) {
        const time = dayjs(day).add(i, 'minutes').format('YYYY-MM-DD HH:mm');
        dates.push(time);
      }
    });
    return dates;
  }
}
