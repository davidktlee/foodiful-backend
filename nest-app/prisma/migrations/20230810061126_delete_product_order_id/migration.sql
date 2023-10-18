/*
  Warnings:

  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_orderId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "orderId";
