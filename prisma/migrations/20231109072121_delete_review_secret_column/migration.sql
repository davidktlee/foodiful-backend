/*
  Warnings:

  - You are about to drop the column `isSecret` on the `ClassReview` table. All the data in the column will be lost.
  - You are about to drop the column `isSecret` on the `ProductReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClassReview" DROP COLUMN "isSecret";

-- AlterTable
ALTER TABLE "ProductReview" DROP COLUMN "isSecret";
