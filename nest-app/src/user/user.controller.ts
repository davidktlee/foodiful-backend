import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') userId: string): User {
    return this.userService.getUser(userId);
  }

  @Post()
  postUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: User['id']) {
    return this.userService.deleteUser(userId);
  }

  @Patch(':id')
  patchUser(@Param('id') userId: string, @Body() updatedUser) {
    return this.userService.updateUser(userId, updatedUser);
  }
}
