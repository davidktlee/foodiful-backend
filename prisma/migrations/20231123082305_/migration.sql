-- DropIndex
DROP INDEX "FavoriteProduct_productId_key";

-- DropIndex
DROP INDEX "FavoriteProduct_userId_key";

-- AlterTable
ALTER TABLE "FavoriteProduct" ADD CONSTRAINT "FavoriteProduct_pkey" PRIMARY KEY ("userId", "productId");
