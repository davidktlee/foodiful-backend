import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

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
  }
  deleteUser(id: string): boolean {
    this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }
  createUser(userData: CreateUserDto): string {
    this.users.push({
      id: String(this.users.length + 1),
      ...userData,
    });
    return '회원 등록이 완료되었습니다.';
  }

  updateUser(
    id: string,
    userData: User,
  ): { updatedUserData: User; message: string } {
    const user = this.getUser(id);
    this.deleteUser(id);
    this.users.push({ ...user, ...userData });
    const updatedUserData = this.getUser(id);
    return { updatedUserData, message: '수정이 완료되었습니다.' };
  }
}
