-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'PUBLIC';
