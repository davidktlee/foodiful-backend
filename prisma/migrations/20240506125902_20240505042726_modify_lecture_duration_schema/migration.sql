/*
  Warnings:

  - Added the required column `subTitle` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "subTitle" TEXT NOT NULL;