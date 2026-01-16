-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'FAILED';

-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'CRYPTO';

-- DropIndex
DROP INDEX "Transaction_orderId_key";
