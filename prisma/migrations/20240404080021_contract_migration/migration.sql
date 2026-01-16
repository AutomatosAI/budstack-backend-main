/*
  Warnings:

  - You are about to drop the column `availableForMinting` on the `Contracts` table. All the data in the column will be lost.
  - You are about to drop the column `isPublicMintOpen` on the `Contracts` table. All the data in the column will be lost.
  - You are about to drop the column `isWhitelistedMintOpen` on the `Contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contracts" DROP COLUMN "availableForMinting",
DROP COLUMN "isPublicMintOpen",
DROP COLUMN "isWhitelistedMintOpen";
