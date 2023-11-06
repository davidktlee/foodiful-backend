import { Module } from '@nestjs/common';
import { OrderRepository } from 'src/order/order.repository';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository, OrderRepository],
})
export class UserModule {}
