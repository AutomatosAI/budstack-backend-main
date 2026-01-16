/*
  Warnings:

  - You are about to drop the `FcmTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FcmTokens" DROP CONSTRAINT "FcmTokens_userId_fkey";

-- DropTable
DROP TABLE "FcmTokens";

-- CreateTable
CREATE TABLE "FCMToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FCMToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFCMToken" (
    "userId" TEXT NOT NULL,
    "fcmTokenId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFCMToken_pkey" PRIMARY KEY ("userId","fcmTokenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FCMToken_token_key" ON "FCMToken"("token");

-- AddForeignKey
ALTER TABLE "UserFCMToken" ADD CONSTRAINT "UserFCMToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFCMToken" ADD CONSTRAINT "UserFCMToken_fcmTokenId_fkey" FOREIGN KEY ("fcmTokenId") REFERENCES "FCMToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
