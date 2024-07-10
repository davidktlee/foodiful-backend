import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reservation, User } from '@prisma/client';
import { LectureRepository } from 'src/lecture/lecture.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

@Injectable()
export class ReservationService {
  constructor(
    private lectureRepository: LectureRepository,
    private reservationRepository: ReservationRepository,
    private userRepository: UserRepository,
  ) {}

  async getAllReservations(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.getAllReservations();
    if (!reservations.length) return [];
    return reservations;
  }

  async getReservationByReservationId(id: number): Promise<Reservation> {
    const reservations =
      await this.reservationRepository.getReservationByReservationId(id);
    if (!reservations) throw new NotFoundException('예약 없음');
    return reservations;
  }

  async createReservation(
    reservation: CreateReservationDto,
    user: User,
  ): Promise<Reservation> {
    const { id, name } = await this.userRepository.getUserById(user.id);
    const reservations = await this.getAllReservations();

    const isAvailableTime = this.isAvailableReservationTime(
      reservation.reserveDate,
      reservations.map((reserve) => reserve),
    );
    if (!isAvailableTime)
      throw new ConflictException('이미 존재하는 예약 시간입니다.');

    const { lectureDuration } = await this.lectureRepository.getLectureById(
      reservation.lectureId,
    );
    const reserveDate = this.getReservedTimeAddedLectureDuration(
      reservation.reserveDate,
      lectureDuration,
    );

    const reservationData = {
      userId: id,
      lectureId: reservation.lectureId,
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
  getReservedTimeAddedLectureDuration(date: string, lectureDuration: number) {
    const dates = [];

    for (let i = 0; i < lectureDuration; i += 30) {
      const time = dayjs(date).add(i, 'minutes').format('YYYY-MM-DD HH:mm');
      dates.push(time);
    }

    return dates;
  }

  isAvailableReservationTime(reserveTime: string, reserved: Reservation[]) {
    const timeToCheck = dayjs(reserveTime);
    let isAvailable = true;
    reserved.map((reserve) => {
      const startTime = dayjs(reserve.reserveDate[0]);
      const endTime = dayjs(
        reserve.reserveDate[reserve.reserveDate.length - 1],
      );
      if (timeToCheck.isBetween(startTime, endTime)) {
        isAvailable = false;
        return;
      } else if (timeToCheck.isSame(startTime)) {
        isAvailable = false;
        return;
      }
    });
    return isAvailable;
  }
}
