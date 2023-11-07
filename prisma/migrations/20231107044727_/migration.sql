/*
  Warnings:

  - You are about to alter the column `rating` on the `ProductReview` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- DropIndex
DROP INDEX "ProductReview_productId_key";

-- AlterTable
ALTER TABLE "ProductReview" ALTER COLUMN "rating" SET DATA TYPE INTEGER;
