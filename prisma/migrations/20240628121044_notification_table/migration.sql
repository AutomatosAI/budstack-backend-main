-- DropIndex
DROP INDEX "Notification_clientId_key";

-- DropIndex
DROP INDEX "Notification_orderId_key";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "eventId" TEXT;
