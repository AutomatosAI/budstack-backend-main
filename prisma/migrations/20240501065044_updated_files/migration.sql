/*
  Warnings:

  - You are about to drop the column `amount` on the `Commissions` table. All the data in the column will be lost.
  - You are about to drop the column `countryCodes` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Commissions" DROP COLUMN "amount",
ADD COLUMN     "amountInDollar" DOUBLE PRECISION,
ADD COLUMN     "amountInEth" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "countryCodes";
