/*
  Warnings:

  - Added the required column `blockchainType` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenStandard` to the `Contracts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlockchainType" AS ENUM ('Ethereum');

-- AlterTable
ALTER TABLE "Contracts" ADD COLUMN     "blockchainType" "BlockchainType" NOT NULL,
ADD COLUMN     "tokenStandard" TEXT NOT NULL;
