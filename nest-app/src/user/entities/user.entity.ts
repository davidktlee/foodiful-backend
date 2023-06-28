import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  accounts: {
    refreshToken: string;
    loginAt: Date | null;
    accessToken: string;
  };
}
