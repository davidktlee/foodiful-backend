/*
  Warnings:

  - Added the required column `totalPrice` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "totalPrice" INTEGER NOT NULL;
