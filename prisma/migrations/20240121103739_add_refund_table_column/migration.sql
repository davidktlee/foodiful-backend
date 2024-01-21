/*
  Warnings:

  - Added the required column `refundAt` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refundReason` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "refundAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refundReason" TEXT NOT NULL;
