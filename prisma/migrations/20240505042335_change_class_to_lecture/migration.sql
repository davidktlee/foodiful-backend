/*
  Warnings:

  - You are about to drop the column `classId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteClass` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lectureId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassReview" DROP CONSTRAINT "ClassReview_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassReview" DROP CONSTRAINT "ClassReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteClass" DROP CONSTRAINT "FavoriteClass_classId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteClass" DROP CONSTRAINT "FavoriteClass_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_classId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "classId",
ADD COLUMN     "lectureId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "ClassReview";

-- DropTable
DROP TABLE "FavoriteClass";

-- CreateTable
CREATE TABLE "Lecture" (
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "LectureDuration" INTEGER NOT NULL,
    "descImg" TEXT[],
    "id" SERIAL NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteLecture" (
    "userId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LectureReview" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "reviewImg" TEXT[],

    CONSTRAINT "LectureReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_name_key" ON "Lecture"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteLecture_userId_key" ON "FavoriteLecture"("userId");

-- AddForeignKey
ALTER TABLE "FavoriteLecture" ADD CONSTRAINT "FavoriteLecture_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteLecture" ADD CONSTRAINT "FavoriteLecture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureReview" ADD CONSTRAINT "LectureReview_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureReview" ADD CONSTRAINT "LectureReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
