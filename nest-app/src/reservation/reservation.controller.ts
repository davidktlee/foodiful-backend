import { Body, Controller, Get, Post } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Get()
  getReservation(): Reservation[] {
    return this.reservationService.getReservation();
  }
  @Post()
  createReservation(@Body() reservationData) {
    return this.reservationService.createReservation(reservationData);
  }
}
