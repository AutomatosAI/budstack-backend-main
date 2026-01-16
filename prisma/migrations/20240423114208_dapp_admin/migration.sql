/*
  Warnings:

  - You are about to drop the column `pricePerUnit` on the `OrderLine` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `OrderLine` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('AdminDashboard', 'ClientVerification', 'UserManagement', 'EventManagement', 'SubAdminManagement', 'ManagerManagement', 'SalesAndOrderTracking', 'InventoryManagement', 'ReportAndAnalytics', 'DApp');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Virtual', 'Physical');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'SUPERADMIN';
ALTER TYPE "Role" ADD VALUE 'MANAGER';

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "eventType" "EventType",
ADD COLUMN     "startTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "OrderLine" DROP COLUMN "pricePerUnit",
DROP COLUMN "totalPrice";

-- AlterTable
ALTER TABLE "Strain" ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "invoice" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "commissionPercent" DOUBLE PRECISION,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "signature" TEXT;

-- CreateTable
CREATE TABLE "MultiCurrencyPrice" (
    "id" TEXT NOT NULL,
    "strainId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MultiCurrencyPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNftRoleAssociation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNftRoleAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "write" BOOLEAN NOT NULL DEFAULT false,
    "permission" "PermissionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "received" DOUBLE PRECISION,
    "pending" DOUBLE PRECISION,
    "percent" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientCart" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "strainId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientCart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MultiCurrencyPrice_strainId_currency_key" ON "MultiCurrencyPrice"("strainId", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "UserNftRoleAssociation_userId_nftId_key" ON "UserNftRoleAssociation"("userId", "nftId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermissions_userId_key" ON "UserPermissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Commissions_orderId_key" ON "Commissions"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientCart_clientId_key" ON "ClientCart"("clientId");

-- AddForeignKey
ALTER TABLE "MultiCurrencyPrice" ADD CONSTRAINT "MultiCurrencyPrice_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNftRoleAssociation" ADD CONSTRAINT "UserNftRoleAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNftRoleAssociation" ADD CONSTRAINT "UserNftRoleAssociation_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissions" ADD CONSTRAINT "UserPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commissions" ADD CONSTRAINT "Commissions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commissions" ADD CONSTRAINT "Commissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCart" ADD CONSTRAINT "ClientCart_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCart" ADD CONSTRAINT "ClientCart_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
