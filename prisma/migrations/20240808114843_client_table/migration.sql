-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedAt" TIMESTAMP(3);
