/*
  Warnings:

  - The `metadataId` column on the `Nft` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[metadataId]` on the table `Nft` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "metadataId",
ADD COLUMN     "metadataId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Nft_metadataId_key" ON "Nft"("metadataId");

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "NftMetadata"("metadataId") ON DELETE SET NULL ON UPDATE CASCADE;
