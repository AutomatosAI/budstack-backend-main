/*
  Warnings:

  - Added the required column `signature` to the `NftSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NftSale" ADD COLUMN     "signature" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notification" BOOLEAN NOT NULL DEFAULT true;
