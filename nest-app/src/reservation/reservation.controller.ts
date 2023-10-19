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

  @Post()
  createReservation(@Body() reservationData: CreateReservationDto) {
    return this.reservationService.createReservation(reservationData);
  }
}
