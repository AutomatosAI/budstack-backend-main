/*
  Warnings:

  - You are about to drop the column `quantity` on the `ClientCart` table. All the data in the column will be lost.
  - You are about to drop the column `strainId` on the `ClientCart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientCart" DROP CONSTRAINT "ClientCart_strainId_fkey";

-- AlterTable
ALTER TABLE "ClientCart" DROP COLUMN "quantity",
DROP COLUMN "strainId";

-- CreateTable
CREATE TABLE "CartItems" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "strainId" TEXT NOT NULL,
    "clientCartId" TEXT NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_strainId_clientCartId_key" ON "CartItems"("strainId", "clientCartId");

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_clientCartId_fkey" FOREIGN KEY ("clientCartId") REFERENCES "ClientCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
