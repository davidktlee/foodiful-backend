/*
  Warnings:

  - You are about to drop the column `LectureDuration` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `lectureDuration` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "LectureDuration",
ADD COLUMN     "lectureDuration" INTEGER NOT NULL;
