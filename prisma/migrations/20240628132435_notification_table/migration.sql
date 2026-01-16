/*
  Warnings:

  - You are about to drop the column `deviceId` on the `FcmTokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "FcmTokens_deviceId_key";

-- AlterTable
ALTER TABLE "FcmTokens" DROP COLUMN "deviceId";
