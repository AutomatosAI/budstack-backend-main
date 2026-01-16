/*
  Warnings:

  - A unique constraint covering the columns `[primaryNftId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "primaryNftId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_primaryNftId_key" ON "User"("primaryNftId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_primaryNftId_fkey" FOREIGN KEY ("primaryNftId") REFERENCES "Nft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
