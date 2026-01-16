-- CreateTable
CREATE TABLE "WalletProof" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "proof" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletProof_pkey" PRIMARY KEY ("id")
);
