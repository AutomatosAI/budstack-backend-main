/*
  Warnings:

  - You are about to drop the column `merkleProof` on the `WhitelistedUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WhitelistedUsers" DROP COLUMN "merkleProof",
ADD COLUMN     "goldLimit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "goldMinted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "goldSignature" TEXT,
ADD COLUMN     "platinumLimit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "platinumMinted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "platinumSignature" TEXT,
ADD COLUMN     "standardLimit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "standardMinted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "standardSignature" TEXT;
