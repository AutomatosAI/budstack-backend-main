-- AlterTable
ALTER TABLE "PlanetDetail" ADD COLUMN     "planetMintingLimit" INTEGER NOT NULL DEFAULT 251;

-- CreateTable
CREATE TABLE "WhitelistedUsers" (
    "userId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "merkleProof" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhitelistedUsers_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhitelistedUsers_walletAddress_key" ON "WhitelistedUsers"("walletAddress");
