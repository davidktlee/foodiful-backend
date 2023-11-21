-- CreateTable
CREATE TABLE "FavoriteClass" (
    "userId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteProduct" (
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteClass_userId_key" ON "FavoriteClass"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteProduct_userId_key" ON "FavoriteProduct"("userId");

-- AddForeignKey
ALTER TABLE "FavoriteClass" ADD CONSTRAINT "FavoriteClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteClass" ADD CONSTRAINT "FavoriteClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteProduct" ADD CONSTRAINT "FavoriteProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteProduct" ADD CONSTRAINT "FavoriteProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
