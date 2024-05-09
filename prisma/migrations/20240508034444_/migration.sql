/*
  Warnings:

  - You are about to drop the `LectureReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LectureReview" DROP CONSTRAINT "LectureReview_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "LectureReview" DROP CONSTRAINT "LectureReview_userId_fkey";

-- DropTable
DROP TABLE "LectureReview";

-- CreateTable
CREATE TABLE "LectureInquiry" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "isSecret" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "id" SERIAL NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LectureInquiry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LectureInquiry" ADD CONSTRAINT "LectureInquiry_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureInquiry" ADD CONSTRAINT "LectureInquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
