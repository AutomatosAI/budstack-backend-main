/*
  Warnings:

  - You are about to drop the `FCMToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFCMToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFCMToken" DROP CONSTRAINT "UserFCMToken_fcmTokenId_fkey";

-- DropForeignKey
ALTER TABLE "UserFCMToken" DROP CONSTRAINT "UserFCMToken_userId_fkey";

-- DropTable
DROP TABLE "FCMToken";

-- DropTable
DROP TABLE "UserFCMToken";

-- CreateTable
CREATE TABLE "FcmTokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FcmTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FcmTokens_token_key" ON "FcmTokens"("token");

-- AddForeignKey
ALTER TABLE "FcmTokens" ADD CONSTRAINT "FcmTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
