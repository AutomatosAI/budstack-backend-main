-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "rejectionNote" TEXT;

-- AlterTable
ALTER TABLE "ClientLogs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
