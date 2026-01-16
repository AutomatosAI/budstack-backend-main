/*
  Warnings:

  - The `price` column on the `NftTransactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "NftTransactions" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER;
