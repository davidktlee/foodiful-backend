import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { ClassRepository } from 'src/class/class.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private classRepository: ClassRepository,
    private reservationRepository: ReservationRepository,
    private userRepository: UserRepository,
  ) {}

  async getAllReservations() {
    const reservations = await this.reservationRepository.getAllReservations();
    // if (!reservations.length)
    //   throw new NotFoundException({
    //     success: false,
    //     message: '찾으시는 예약이 없습니다',
    //   });
    return reservations;
  }

  async getReservationByUserId(userId: number) {
    return this.userRepository.getReservationByUserId(userId);
  }

  async createReservation(reservation: CreateReservationDto) {
    console.log(reservation);
    const { id } = await this.userRepository.getUserByUserEmail(
      reservation.userEmail,
    );

    const { classDuration } = await this.classRepository.getClassById(
      reservation.classId,
    );
    const reserveDate = this.getReservedTimeAddedClassDuration(
      reservation.reserveDate,
      classDuration,
    );

    const reservationData = {
      userId: id,
      classId: reservation.classId,
      reserveDate,
    };
    return this.reservationRepository.createReservation(reservationData);
  }

  getReservedTime(date, reservation: string[]) {
    const reservedTimes = reservation.filter((item) =>
      dayjs(item).isSame(dayjs(date), 'date'),
    );
    return reservedTimes;
  }

  // 예약 시간에서 클래스 진행 시간을 더한 배열 리턴 -> 프론트에서 처리
  getReservedTimeAddedClassDuration(date: string, classDuration: number) {
    const dates = [];

    for (let i = 0; i < classDuration; i += 30) {
      const time = dayjs(date).add(i, 'minutes').format('YYYY-MM-DD HH:mm');
      dates.push(time);
    }

    return dates;
  }
}
