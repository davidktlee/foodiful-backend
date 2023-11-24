/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `FavoriteProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FavoriteProduct_productId_key" ON "FavoriteProduct"("productId");
