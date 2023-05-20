import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, UserService],
})
export class ReservationModule {}
