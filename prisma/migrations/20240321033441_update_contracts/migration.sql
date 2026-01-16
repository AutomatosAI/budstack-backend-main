/*
  Warnings:

  - Added the required column `availableForMinting` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSupply` to the `Contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contracts" ADD COLUMN     "availableForMinting" INTEGER NOT NULL,
ADD COLUMN     "maxSupply" INTEGER NOT NULL;
