/*
  Warnings:

  - You are about to drop the column `price` on the `MultiCurrencyPrice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MultiCurrencyPrice" DROP COLUMN "price",
ADD COLUMN     "retailPrice" DOUBLE PRECISION,
ADD COLUMN     "wholeSalePrice" DOUBLE PRECISION;
