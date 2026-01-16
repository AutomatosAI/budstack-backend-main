/*
  Warnings:

  - You are about to drop the column `price` on the `Strain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Strain" DROP COLUMN "price",
ADD COLUMN     "retailPrice" DOUBLE PRECISION,
ADD COLUMN     "wholeSalePrice" DOUBLE PRECISION;
