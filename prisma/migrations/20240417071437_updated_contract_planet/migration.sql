-- AlterTable
ALTER TABLE "Contracts" ADD COLUMN     "royaltyFee" DOUBLE PRECISION NOT NULL DEFAULT 9;

-- AlterTable
ALTER TABLE "PlanetDetail" ADD COLUMN     "videoUrl" TEXT;
