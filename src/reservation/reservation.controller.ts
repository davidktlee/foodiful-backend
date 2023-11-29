import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CloudFormation } from 'aws-sdk';
import { Request } from 'express';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiProperty({})
  @ApiResponse({})
  @Get('/all')
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationService.getAllReservations();
  }

  @Post()
  @UseGuards(JwtGuard)
  createReservation(
    @GetUser() user: User,
    @Body() reservationData: CreateReservationDto,
  ) {
    return this.reservationService.createReservation(reservationData, user);
  }
  @Get('/me')
  @UseGuards(JwtGuard)
  getReservationByUserId(@GetUser() user: User) {
    return this.reservationService.getReservationByUserId(user.id);
  }

  @Get(':id')
  getReservationByReservationId(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.getReservationByReservationId(id);
  }
}
