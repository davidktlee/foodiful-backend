/*
  Warnings:

  - You are about to drop the `ProductOnCart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `additionalCount` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductOnCart" DROP CONSTRAINT "ProductOnCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnCart" DROP CONSTRAINT "ProductOnCart_productId_fkey";

-- DropIndex
DROP INDEX "Cart_userId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "additionalCount" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductOnCart";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
