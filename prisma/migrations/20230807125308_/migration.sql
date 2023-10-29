/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `ProductReview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `ProductReview` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_productId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "orderId",
DROP COLUMN "productId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductReview" DROP COLUMN "rating",
ALTER COLUMN "productId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_orderId_key" ON "Product"("orderId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
