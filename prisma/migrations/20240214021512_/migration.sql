-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PROCEEDING', 'COMPLETE');

-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "status" "RefundStatus" NOT NULL DEFAULT 'PROCEEDING';
