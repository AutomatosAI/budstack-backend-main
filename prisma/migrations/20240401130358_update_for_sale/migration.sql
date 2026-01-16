/*
  Warnings:

  - You are about to drop the column `nftId` on the `NftSale` table. All the data in the column will be lost.
  - You are about to alter the column `salePrice` on the `NftSale` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `tokenId` to the `NftSale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NftSale" DROP CONSTRAINT "NftSale_nftId_fkey";

-- AlterTable
ALTER TABLE "NftSale" DROP COLUMN "nftId",
ADD COLUMN     "buyerId" TEXT,
ADD COLUMN     "tokenId" INTEGER NOT NULL,
ALTER COLUMN "salePrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "NftTransactions" ALTER COLUMN "to" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "NftTransactions" ADD CONSTRAINT "NftTransactions_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Nft"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftSale" ADD CONSTRAINT "NftSale_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Nft"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftSale" ADD CONSTRAINT "NftSale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
