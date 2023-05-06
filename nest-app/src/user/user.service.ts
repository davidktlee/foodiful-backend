import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    { name: 'lee', id: '1', password: '123' },
    { name: 'jeon', id: '2', password: '123' },
  ];

  getUsers(): User[] {
    return this.users;
  }
  getUser(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`찾으시는 유저가 없습니다 유저:${id}`);
    }
    return user;
  }ㅕ
  deleteUser(id: string): boolean {
    this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }
  async createUser(userData: CreateUserDto): Promise<string> {
    await this.transformPassword(userData);
    this.users.push({
      id: String(this.users.length + 1),
      ...userData,
    });
    return '회원 등록이 완료되었습니다.';
  }

  async transformPassword(userData): Promise<void> {
    userData.password = await bcrypt.hash(userData.password, 10);
    return Promise.resolve();
  }

  updateUser(
    id: string,
    userData: UpdateUserDto,
  ): { updatedUserData: UpdateUserDto; message: string } {
    const user = this.getUser(id);
    this.deleteUser(id);
    this.users.push({ ...user, ...userData });
    const updatedUserData = this.getUser(id);
    return { updatedUserData, message: '수정이 완료되었습니다.' };
  }
}
