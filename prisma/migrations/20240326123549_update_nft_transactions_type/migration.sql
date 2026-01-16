/*
  Warnings:

  - The values [Transfer] on the enum `NftTransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NftTransactionType_new" AS ENUM ('MINT', 'TRANSFER', 'LIST', 'LIST_CANCEL', 'SALE');
ALTER TABLE "NftTransactions" ALTER COLUMN "type" TYPE "NftTransactionType_new" USING ("type"::text::"NftTransactionType_new");
ALTER TYPE "NftTransactionType" RENAME TO "NftTransactionType_old";
ALTER TYPE "NftTransactionType_new" RENAME TO "NftTransactionType";
DROP TYPE "NftTransactionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "NftTransactions" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "txHash" DROP NOT NULL;
