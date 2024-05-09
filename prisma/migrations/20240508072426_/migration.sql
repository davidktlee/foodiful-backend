/*
  Warnings:

  - You are about to drop the column `parentId` on the `LectureInquiry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LectureInquiry" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "Recomment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "isSecret" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recomment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recomment" ADD CONSTRAINT "Recomment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recomment" ADD CONSTRAINT "Recomment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "LectureInquiry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
