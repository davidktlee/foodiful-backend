import { User, UserRole } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleted: boolean;
  role: UserRole;
  accounts: {
    refreshToken: string;
    loginAt: Date | null;
    accessToken: string;
  };
}
