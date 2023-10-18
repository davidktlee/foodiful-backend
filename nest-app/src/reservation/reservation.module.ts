import { Module } from '@nestjs/common';
import { ClassRepository } from 'src/class/class.repository';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepository,
    PrismaService,
    UserRepository,
    ClassRepository,
  ],
})
export class ReservationModule {}
