/*
  Warnings:

  - You are about to drop the column `pending` on the `Commissions` table. All the data in the column will be lost.
  - You are about to drop the column `percent` on the `Commissions` table. All the data in the column will be lost.
  - You are about to drop the column `received` on the `Commissions` table. All the data in the column will be lost.
  - You are about to drop the column `nftId` on the `UserNftRoleAssociation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tokenId]` on the table `UserNftRoleAssociation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentStatus` to the `Commissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCodes` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `UserNftRoleAssociation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderActivity" AS ENUM ('OrderCreated', 'Approved', 'Rejected', 'PaymentFailed', 'PaymentSuccess', 'Processing', 'Shipped', 'Delivered');

-- CreateEnum
CREATE TYPE "ClientActivity" AS ENUM ('Approved', 'Rejected', 'Active', 'InActive');

-- DropForeignKey
ALTER TABLE "UserNftRoleAssociation" DROP CONSTRAINT "UserNftRoleAssociation_nftId_fkey";

-- DropIndex
DROP INDEX "Commissions_orderId_key";

-- DropIndex
DROP INDEX "UserNftRoleAssociation_userId_nftId_key";

-- AlterTable
ALTER TABLE "Commissions" DROP COLUMN "pending",
DROP COLUMN "percent",
DROP COLUMN "received",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "countryCodes" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "UserNftRoleAssociation" DROP COLUMN "nftId",
ADD COLUMN     "tokenId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "OrderLogs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "activity" "OrderActivity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ClientLogs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "activity" "ClientActivity" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderLogs_id_key" ON "OrderLogs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClientLogs_id_key" ON "ClientLogs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserNftRoleAssociation_userId_tokenId_key" ON "UserNftRoleAssociation"("userId", "tokenId");

-- AddForeignKey
ALTER TABLE "UserNftRoleAssociation" ADD CONSTRAINT "UserNftRoleAssociation_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Nft"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLogs" ADD CONSTRAINT "OrderLogs_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLogs" ADD CONSTRAINT "OrderLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientLogs" ADD CONSTRAINT "ClientLogs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientLogs" ADD CONSTRAINT "ClientLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
