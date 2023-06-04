import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  userId: string;
  phone: string;
  password: string;
  accounts: {
    refreshToken: string;
    accessToken: string;
  };
}
