/*
  Warnings:

  - You are about to drop the column `regular` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "regular",
ALTER COLUMN "reserveDate" SET NOT NULL,
ALTER COLUMN "reserveDate" SET DATA TYPE TEXT;
