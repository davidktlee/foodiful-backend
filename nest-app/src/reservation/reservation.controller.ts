import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/all')
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationService.getAllReservations();
  }

  @Get()
  async getReservation(
    @Query('class_id', ParseIntPipe) id: number,
    // @Query('date') date: string,
  ) {
    const data = await this.reservationService.getReservation(id);
    // date도 받아서 예약 시간을 백에서 처리할 시 아래 로직 사용
    // return this.reservationService.getReservation(id, date);

    if (data) return { success: true, data };
  }
  @Post()
  createReservation(@Body() reservationData: CreateReservationDto) {
    return this.reservationService.createReservation(reservationData);
  }
}
