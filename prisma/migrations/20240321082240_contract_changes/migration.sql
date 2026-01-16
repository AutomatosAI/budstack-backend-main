/*
  Warnings:

  - The `mintedAt` column on the `Nft` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lastTransferTime` column on the `Nft` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[address]` on the table `Contracts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tokenId]` on the table `NftMetadata` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `timestamp` on the `NftTransactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EventHistory" ALTER COLUMN "errorMessage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "mintedAt",
ADD COLUMN     "mintedAt" TIMESTAMP(3),
DROP COLUMN "lastTransferTime",
ADD COLUMN     "lastTransferTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "NftTransactions" DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contracts_address_key" ON "Contracts"("address");

-- CreateIndex
CREATE UNIQUE INDEX "NftMetadata_tokenId_key" ON "NftMetadata"("tokenId");
